# NasTech Agent Web

NasTech Agent Web is the public software workspace for exploring the NasTech product surface, installation paths, live public repository signals, and source-backed capabilities.

## Run locally

```bash
corepack enable
pnpm install
pnpm dev
```

## Verify and build

```bash
pnpm check
pnpm test
pnpm build
```

## Public deployment

The GitHub Pages workflow builds the site on every update to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once.

The public build fetches repository activity directly from GitHub. The AI console is intentionally connection-ready: add an Ollama Cloud-compatible backend when you are ready to provide live model responses.
