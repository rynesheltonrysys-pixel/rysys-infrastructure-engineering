import { DurableObject } from "cloudflare:workers";
import type { DemoItem, UserPublic, Doc, DocVersion, Comment, Message, AuthTokenPayload } from '@shared/types';
import { MOCK_ITEMS } from '@shared/mock-data';
export class GlobalDurableObject extends DurableObject {
    private USERS_KEY = "forust_users";
    private DOCS_KEY = "forust_docs";
    private COMMENTS_KEY = "forust_comments";
    private MSGS_KEY = "forust_messages";
    private SECRET_KEY = "auth_jwt_secret";
    async getSecret(): Promise<string> {
        let secret = await this.ctx.storage.get<string>(this.SECRET_KEY);
        if (!secret) {
            secret = crypto.randomUUID();
            await this.ctx.storage.put(this.SECRET_KEY, secret);
        }
        return secret;
    }
    async registerUser(email: string, pass: string) {
        const users = (await this.ctx.storage.get<Record<string, any>>(this.USERS_KEY)) || {};
        if (Object.values(users).some(u => u.email === email)) return null;
        const id = crypto.randomUUID();
        const newUser = { id, email, pass, createdAt: new Date().toISOString() };
        users[id] = newUser;
        await this.ctx.storage.put(this.USERS_KEY, users);
        const token = await this.issueToken(id, email);
        return { token, user: { id, email, createdAt: newUser.createdAt } };
    }
    async loginUser(email: string, pass: string) {
        const users = (await this.ctx.storage.get<Record<string, any>>(this.USERS_KEY)) || {};
        const user = Object.values(users).find(u => u.email === email && u.pass === pass);
        if (!user) return null;
        const token = await this.issueToken(user.id, email);
        return { token, user: { id: user.id, email: user.email, createdAt: user.createdAt } };
    }
    async issueToken(uid: string, email: string): Promise<string> {
        const payload: AuthTokenPayload = {
            uid, email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        };
        return btoa(JSON.stringify(payload));
    }
    async verifyToken(token: string): Promise<AuthTokenPayload | null> {
        try {
            const payload = JSON.parse(atob(token)) as AuthTokenPayload;
            if (payload.exp < Math.floor(Date.now() / 1000)) return null;
            return payload;
        } catch {
            return null;
        }
    }
    async listUsersPublic(): Promise<UserPublic[]> {
        const users = (await this.ctx.storage.get<Record<string, any>>(this.USERS_KEY)) || {};
        return Object.values(users)
            .map(u => ({ id: u.id, email: u.email, createdAt: u.createdAt } as UserPublic))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    async listDocs(uid: string): Promise<Doc[]> {
        const docs = (await this.ctx.storage.get<Doc[]>(this.DOCS_KEY)) || [];
        const users = (await this.ctx.storage.get<Record<string, any>>(this.USERS_KEY)) || {};
        const userEmail = users[uid]?.email;
        if (!userEmail) return docs.filter(d => d.ownerId === uid);
        return docs.filter(d => d.ownerId === uid || d.sharedWith.includes(userEmail));
    }
    async createDoc(uid: string, title: string, content: string, shareWith: string[] = []): Promise<Doc> {
        const docs = (await this.ctx.storage.get<Doc[]>(this.DOCS_KEY)) || [];
        const newDoc: Doc = {
            id: crypto.randomUUID(),
            ownerId: uid,
            title,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sharedWith: shareWith,
            versions: [{ version: 1, content, createdAt: new Date().toISOString() }]
        };
        docs.push(newDoc);
        await this.ctx.storage.put(this.DOCS_KEY, docs);
        return newDoc;
    }
    async addDocVersion(uid: string, docId: string, content: string): Promise<Doc | null> {
        const docs = (await this.ctx.storage.get<Doc[]>(this.DOCS_KEY)) || [];
        const idx = docs.findIndex(d => d.id === docId);
        if (idx === -1) return null;
        const doc = docs[idx];
        const nextVer = doc.versions.length + 1;
        doc.versions.push({ version: nextVer, content, createdAt: new Date().toISOString() });
        doc.updatedAt = new Date().toISOString();
        await this.ctx.storage.put(this.DOCS_KEY, docs);
        return doc;
    }
    async getComments(docId: string): Promise<Comment[]> {
        const all = (await this.ctx.storage.get<Comment[]>(this.COMMENTS_KEY)) || [];
        return all.filter(c => c.docId === docId);
    }
    async addComment(uid: string, email: string, docId: string, version: number, text: string) {
        const all = (await this.ctx.storage.get<Comment[]>(this.COMMENTS_KEY)) || [];
        const comment: Comment = {
            id: crypto.randomUUID(), docId, version, authorId: uid, authorEmail: email, text, createdAt: new Date().toISOString()
        };
        all.push(comment);
        await this.ctx.storage.put(this.COMMENTS_KEY, all);
        return comment;
    }
    async listMessages(uid: string, peerId?: string, peerEmail?: string): Promise<Message[]> {
        const all = (await this.ctx.storage.get<Message[]>(this.MSGS_KEY)) || [];
        const users = (await this.ctx.storage.get<Record<string, any>>(this.USERS_KEY)) || {};
        const email = users[uid]?.email;
        let filtered: Message[];
        if (peerId || peerEmail) {
            // Private DM thread between current user and specified peer
            filtered = all.filter(m => {
                const isFromMe = m.fromId === uid;
                const isFromPeer = (peerId && m.fromId === peerId) || (peerEmail && m.fromEmail === peerEmail);
                const isToMe = (email && m.toEmail === email) || m.toId === uid;
                const isToPeer = (peerId && m.toId === peerId) || (peerEmail && m.toEmail === peerEmail);
                return (isFromMe && isToPeer) || (isFromPeer && isToMe);
            });
        } else {
            // Legacy / Shared feed logic
            filtered = all.filter(m => m.fromId === uid || (email && m.toEmail === email) || m.toEmail === 'support');
        }
        return filtered.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    async postMessage(fromId: string, fromEmail: string, toEmail: string | undefined, text: string, toUserId?: string) {
        const all = (await this.ctx.storage.get<Message[]>(this.MSGS_KEY)) || [];
        const users = (await this.ctx.storage.get<Record<string, any>>(this.USERS_KEY)) || {};
        let resolvedToId = toUserId;
        let resolvedToEmail = toEmail;
        if (toUserId && !resolvedToEmail) {
            resolvedToEmail = users[toUserId]?.email;
        } else if (toEmail && !resolvedToId) {
            resolvedToId = Object.values(users).find(u => u.email === toEmail)?.id;
        }
        const msg: Message = {
            id: crypto.randomUUID(),
            fromId,
            fromEmail,
            toId: resolvedToId,
            toEmail: resolvedToEmail || 'support',
            text,
            createdAt: new Date().toISOString()
        };
        all.push(msg);
        await this.ctx.storage.put(this.MSGS_KEY, all);
        return msg;
    }
    async getCounterValue(): Promise<number> {
      return (await this.ctx.storage.get("counter_value")) || 0;
    }
    async increment(amount = 1): Promise<number> {
      let value: number = (await this.ctx.storage.get("counter_value")) || 0;
      value += amount;
      await this.ctx.storage.put("counter_value", value);
      return value;
    }
    async getDemoItems(): Promise<DemoItem[]> {
      const items = await this.ctx.storage.get("demo_items");
      if (items) return items as DemoItem[];
      await this.ctx.storage.put("demo_items", MOCK_ITEMS);
      return MOCK_ITEMS;
    }
}