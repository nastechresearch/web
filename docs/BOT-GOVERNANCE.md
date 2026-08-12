# Governed automation

The NasTech repository uses **governed automation**. Its bot profiles can inspect, classify, organize, prepare drafts, and open draft pull requests. They cannot silently merge changes, publish releases, delete content, close issues, change repository settings, or turn a recommendation into a product decision.

Every profile in `.github/bots/` is required to declare a narrow responsibility, an expected output, a human-review gate, and `may_publish: false`. The catalog validator checks those constraints and verifies that the repository contains the expected 46 profiles.

| Area | Bot output | Human decision required |
|---|---|---|
| Releases | Checklists, changelog drafts, and draft releases | Review notes, select the release target, and publish the draft release. |
| Documentation | README and Markdown drafts | Verify source accuracy and merge the draft pull request. |
| Issues | Labels, intake acknowledgment, and triage suggestions | Confirm priority, roadmap fit, and any close/duplicate action. |
| Decisions | ADR and trade-off drafts | Approve the actual decision after team review. |
| Discussions | Question sets, summaries, dissent records, and action registers | Validate consensus, owners, and due dates. |
| Ollama drafting | Gemma 4 documentation draft pull requests | Validate claims, source citations, and wording before merge. |

> A bot is an assistant to the maintainer, not the maintainer. Automation may explain options, but it must not conceal uncertainty or take final action on behalf of the project.

## Safe operating rules

The repository automation responds only to intentional triggers or narrowly scoped repository events. Untrusted issue text, comments, and external URLs are treated as reference material rather than executable instructions. Every workflow creates visible GitHub records or a reviewable draft, so maintainers can audit what happened and why.

## Maintainer controls

Maintainers may disable any workflow from the Actions screen, remove a bot profile, or close a draft pull request without changing the rest of the site. A release draft remains unpublished until a maintainer explicitly publishes it. The optional Ollama workflow runs only when the repository has its own `OLLAMA_API_KEY` Actions secret; it uses Ollama Cloud `gemma4:31b` and never substitutes another model.
