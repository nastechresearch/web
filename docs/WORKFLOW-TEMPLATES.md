# Workflow templates

The repository includes three reusable automation patterns.

| Workflow | Trigger | Purpose |
|---|---|---|
| `quality.yml` | Pull request, main update, or reusable call | Type-checks, tests, and builds the public application. |
| `pages.yml` | Main update, manual run, or reusable call | Builds and publishes the static public application. |
| `upstream-scan.yml` | Every six hours or manual run | Compares the upstream revision and runs the complete quality and publish path only after a real change. |

Use the same structure for future repositories: isolate change detection, keep quality validation deterministic, and publish only artifacts that pass validation.
