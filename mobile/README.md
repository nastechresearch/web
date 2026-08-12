# NasTech Agent mobile

This Flutter project is a clean NasTech Agent mobile implementation. It takes visual inspiration from the supplied MIT-licensed reference only at the interaction-system level: rounded cards, layered motion, touch-first navigation, and restrained animated state changes. It does **not** retain the source application’s branding, daily-trivia flows, advertising, authentication, analytics, subscriptions, Firebase configuration, or product content.

## Product boundary

The application exposes NasTech agent surfaces: agent core, memory, tools, gateway reach, source-backed capability cards, install guidance, an Ollama Cloud Gemma 4 31B chat console, and a Kokoro voice controller. The chat endpoint is configured with `--dart-define=NSTECH_GEMMA_ENDPOINT=<https-url>` and must call a server-side NasTech endpoint; no model key is bundled in the APK. Kokoro only turns a received response into device audio and cannot select or substitute the Gemma model.

## Android package-size policy

The Android artifact must not exceed **309 MiB**. The build workflow downloads the official `kokoro-v1.0.int8.onnx` model, which is approximately 92 MB, plus a single generated `af_heart` voice asset. The full 325 MB model is deliberately excluded. The release workflow checks the generated APK byte size before uploading its artifact.

## Local build

Install Flutter, then run `flutter pub get`, `dart run tool/prepare_kokoro_assets.py`, `flutter test`, and `flutter build apk --release --dart-define=NSTECH_GEMMA_ENDPOINT=https://your-server/api/mobile/gemma`. The Android platform is generated in CI with the application identity `com.nastech.agent` so the source remains lean and free of third-party analytics or advertising configuration.

## Provenance

The implementation derives only general visual and structural inspiration from the supplied MIT-licensed reference. NasTech-specific code, source content, brand imagery, and AI/voice configuration are new and are governed by the NasTech repository workflow.
