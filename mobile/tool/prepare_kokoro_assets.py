#!/usr/bin/env python3
"""Download the compact Kokoro model and extract only the selected voice asset."""

import io
import json
import pathlib
import urllib.request

import numpy as np

MODEL_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx"
VOICES_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin"
ROOT = pathlib.Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "kokoro"


def download(url: str, destination: pathlib.Path) -> None:
    if destination.exists() and destination.stat().st_size > 0:
        return
    with urllib.request.urlopen(url) as response:
        destination.write_bytes(response.read())


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    model_path = ASSETS / "kokoro-v1.0.int8.onnx"
    voices_path = ASSETS / "voices-v1.0.bin"
    download(MODEL_URL, model_path)
    download(VOICES_URL, voices_path)
    voices = np.load(io.BytesIO(voices_path.read_bytes()), allow_pickle=True)
    if "af_heart" not in voices:
        raise RuntimeError("The selected Kokoro voice af_heart is not present in the downloaded voice archive.")
    voice_path = ASSETS / "voices_af_heart.json"
    voice_path.write_text(json.dumps({"af_heart": voices["af_heart"].tolist()}))
    voices_path.unlink(missing_ok=True)
    print(f"Prepared {model_path.name} and {voice_path.name}.")


if __name__ == "__main__":
    main()
