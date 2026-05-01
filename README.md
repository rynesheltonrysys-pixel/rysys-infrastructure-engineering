# Cloudflare Workers React Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rynesheltonrysys-pixel/rysys-infrastructure-engineering)

A production-ready full-stack starter template for building modern web applications with Cloudflare Workers, React, Vite, and shadcn/ui. Includes a powerful backend with Hono routing, Durable Objects for stateful data, and a beautiful, responsive frontend with dark mode support.

## Features

- **Full-Stack Ready**: React frontend with TypeScript, Vite bundling, and Cloudflare Workers backend.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom design system, dark/light theme toggle.
- **State Management**: TanStack Query for data fetching, Zustand/Immer for client state.
- **Backend Power**: Hono for API routing, Durable Objects for persistent storage (SQLite-backed), CORS, logging.
- **Developer Experience**: Hot reload, error boundaries, client error reporting, TypeScript end-to-end.
- **Responsive Design**: Mobile-first, sidebar layout option, animations, glassmorphism effects.
- **Production Optimized**: Tree-shaking, code-splitting, Cloudflare assets handling for SPA.
- **Extensible**: Pre-configured routes in `worker/userRoutes.ts`, shared types, mock data.

## Tech Stack

- **Frontend**: React 18, Vite 6, TypeScript 5, Tailwind CSS 3, shadcn/ui, Lucide icons, Framer Motion, Sonner toasts.
- **State/Data**: TanStack React Query 5, React Router 6, Zod validation.
- **Backend**: Cloudflare Workers, Hono 4, Durable Objects (SQLite).
- **Utilities**: clsx, tailwind-merge, date-fns, Recharts, React Hook Form.
- **Dev Tools**: Node/npm, ESLint, Wrangler, Cloudflare Vite plugin.

## Quick Start

1. **Prerequisites**:
   - Node.js and npm installed.
   - [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed (`npm i -g wrangler` or `npm exec -- wrangler`).
   - Cloudflare account and Wrangler login (`wrangler login`).

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Generate Worker Types**:
   ```bash
   npm run cf-typegen
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

## Development

- **Frontend**: Edit `src/` files. Vite handles HMR.
- **Backend Routes**: Add endpoints in `worker/userRoutes.ts`. Uses Durable Object for state (counter, demo items).
- **API Testing**: `/api/health`, `/api/counter`, `/api/demo` endpoints available.
- **Type Safety**: Shared types in `shared/`. Update `tsconfig` paths as needed.
- **Theme**: Toggle dark/light mode via `ThemeToggle`.
- **Linting**: `npm run lint`.
- **Build**: `npm run build` (generates `dist/` for deployment).

Example API calls (from browser dev tools):
```bash
curl http://localhost:8787/api/health
curl http://localhost:8787/api/counter
curl -X POST http://localhost:8787/api/counter/increment
```

Customize the homepage in `src/pages/HomePage.tsx` and replace demo sidebar in `src/components/app-sidebar.tsx`.

## Deployment

1. **Build the App**:
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare**:
   ```bash
   npm run deploy
   ```
   Deploys Worker + static assets. Configured via `wrangler.jsonc`.

3. **One-Click Deploy**:
   [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rynesheltonrysys-pixel/rysys-infrastructure-engineering)

**Notes**:
- Assets served via Cloudflare (SPA routing).
- Durable Objects auto-migrate (`v1` tag in `wrangler.jsonc`).
- Update `wrangler.jsonc` for custom domains, env vars, or bindings.
- Preview: `wrangler deploy --dry-run`.
- Observability enabled by default.

## Project Structure

```
├── src/                 # React frontend
├── worker/              # Cloudflare Workers backend
├── shared/              # Shared types
├── tailwind.config.js   # Design system
└── wrangler.jsonc      # Deployment config
```

## Contributing

1. Fork and clone.
2. `npm install`.
3. Make changes, test with `npm run dev`.
4. Submit PR.

## License

MIT. See [LICENSE](LICENSE) for details.