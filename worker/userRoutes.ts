import { Hono } from "hono";
import { Env } from './core-utils';
import type { DemoItem, ApiResponse, UserPublic } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Auth Middleware for Protected Routes
    const protectedMiddleware = async (c: any, next: any) => {
        const authHeader = c.req.header('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return c.json({ success: false, error: 'Unauthorized' }, 401);
        }
        const token = authHeader.split(' ')[1];
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const payload = await stub.verifyToken(token);
        if (!payload) {
            return c.json({ success: false, error: 'Invalid or expired token' }, 401);
        }
        c.set('user', payload);
        await next();
    };
    // Public Auth Routes
    app.post('/api/auth/register', async (c) => {
        const { email, password } = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const result = await stub.registerUser(email, password);
        if (!result) return c.json({ success: false, error: 'User already exists' }, 400);
        return c.json({ success: true, data: result });
    });
    app.post('/api/auth/login', async (c) => {
        const { email, password } = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const result = await stub.loginUser(email, password);
        if (!result) return c.json({ success: false, error: 'Invalid credentials' }, 401);
        return c.json({ success: true, data: result });
    });
    // Protected Forust Routes
    app.get('/api/forust/docs', protectedMiddleware, async (c) => {
        const user = c.get('user');
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const docs = await stub.listDocs(user.uid);
        return c.json({ success: true, data: docs });
    });
    app.post('/api/forust/docs', protectedMiddleware, async (c) => {
        const user = c.get('user');
        const { title, content, shareWith } = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const doc = await stub.createDoc(user.uid, title, content, shareWith);
        return c.json({ success: true, data: doc });
    });
    app.post('/api/forust/docs/:id/versions', protectedMiddleware, async (c) => {
        const user = c.get('user');
        const docId = c.req.param('id');
        const { content } = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const updated = await stub.addDocVersion(user.uid, docId, content);
        return c.json({ success: true, data: updated });
    });
    app.get('/api/forust/docs/:id/comments', protectedMiddleware, async (c) => {
        const docId = c.req.param('id');
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const comments = await stub.getComments(docId);
        return c.json({ success: true, data: comments });
    });
    app.post('/api/forust/docs/:id/comments', protectedMiddleware, async (c) => {
        const user = c.get('user');
        const docId = c.req.param('id');
        const { version, text } = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const comment = await stub.addComment(user.uid, user.email, docId, version, text);
        return c.json({ success: true, data: comment });
    });
    app.get('/api/forust/messages', protectedMiddleware, async (c) => {
        const user = c.get('user');
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const msgs = await stub.listMessages(user.uid);
        return c.json({ success: true, data: msgs });
    });
    app.post('/api/forust/messages', protectedMiddleware, async (c) => {
        const user = c.get('user');
        const { toEmail, text } = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const msg = await stub.postMessage(user.uid, user.email, toEmail, text);
        return c.json({ success: true, data: msg });
    });
    // Existing Demo Routes
    app.get('/api/demo', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getDemoItems();
        return c.json({ success: true, data } satisfies ApiResponse<DemoItem[]>);
    });
    app.get('/api/counter', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getCounterValue();
        return c.json({ success: true, data } satisfies ApiResponse<number>);
    });
    app.post('/api/counter/increment', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.increment();
        return c.json({ success: true, data } satisfies ApiResponse<number>);
    });
}