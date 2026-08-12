# Mobile architecture

The mobile app is a clean Flutter implementation located beside the static web experience, not a replacement for it. It uses one rounded, animated shell with four product surfaces: home, Gemma guide, capability atlas, and installation center. Its configuration is purpose-built for NasTech App, with only the services required for its source-backed agent experience.

The chat service calls the NasTech hosted mobile gateway. That gateway keeps the Ollama key on the server, accepts only bounded `user` and `assistant` messages, applies a small per-client request limit, and calls only `gemma4:31b`. Kokoro runs locally only after the Android build provisions the compact int8 model and one `af_heart` voice asset. Long-pressing an assistant message starts voice playback; the voice layer never generates text or selects an AI model.

The Android workflow runs a clean `flutter create` for `com.nastech.agent`, prepares the compact voice assets, builds a release APK, and fails before artifact upload if the file exceeds 309 MiB. A signed release and public publishing remain maintainer-reviewed steps.
