# Android conversion handoff

The present repository is a static React web experience published through GitHub Pages. A signed Android APK needs a native application project and an Android package identity; it cannot be safely produced from the static site alone without deciding the mobile runtime, application ID, signing ownership, and release channel.

## Recommended conversion boundary

Create or provide the NasTech mobile repository as an Expo / React Native application. Reuse the public content model, GitHub data contracts, API endpoints, brand assets, and Gemini-free Ollama Gemma 4 31B backend contract. Rebuild the navigation and interaction components for touch, offline constraints, safe areas, and native accessibility rather than embedding the full website inside a WebView.

| Deliverable | Native implementation | Review gate |
|---|---|---|
| AMOLED home, capability, install, and source views | React Native screens with reusable content data | Product and accessibility review |
| Gemma console and speaking avatar | Server-backed Gemma chat plus device-appropriate speech playback | Security and voice UX review |
| Android debug APK | CI build artifact for internal testing | Manual test on supported Android devices |
| Android release APK / AAB | Signed release from the mobile repository | Maintainer approval and signing-key control |
| Release notes | Governed draft generated from approved changes | Maintainer publication |

## Information required before generating an APK

Provide the mobile repository URL or confirm that a new Expo repository should be created. The release owner must also choose an Android package name, signing-key custody, supported Android version range, and whether internal test builds should be distributed privately or through a store channel.
