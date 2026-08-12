# Governed Ollama drafting

The **Draft governed Gemma documentation update** workflow prepares a Markdown draft from a manually supplied topic. It calls Ollama Cloud with the fixed model identifier `gemma4:31b`, writes the result to the requested repository path, and opens a **draft pull request**. It never merges the pull request, publishes a release, or changes the live GitHub Pages site by itself.

## Setup

Add `OLLAMA_API_KEY` as an Actions secret in the repository settings. The workflow will deliberately stop if that repository-scoped secret is not present. The hosted NasTech web application retains its own protected server-side credential and does not expose it to the public backup repository.

## Review standard

Treat model output as a draft. Before merging, confirm that every claim is source-backed, remove inaccurate material, add primary source links where appropriate, and make sure the content does not state a roadmap idea as a released capability.
