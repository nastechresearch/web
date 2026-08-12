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

The public build fetches repository activity directly from GitHub. The hosted NasTech console uses Ollama Cloud **Gemma 4 31B** through a protected backend; the optional repository drafting workflow uses the same fixed model only when a repository-scoped `OLLAMA_API_KEY` Actions secret is configured.

## Governed bot suite

The repository has 46 narrowly scoped, review-gated bot profiles for release preparation, documentation, issues, decision records, discussions, upstream intelligence, Ollama-assisted drafting, and Android readiness. They can prepare drafts and open draft pull requests, but they do not merge, publish, close issues, or make final decisions. Read [the governance rules](docs/BOT-GOVERNANCE.md), [the Ollama drafting boundary](docs/OLLAMA-DRAFTING.md), and [the Android conversion handoff](docs/ANDROID-HANDOFF.md) before enabling a workflow.
