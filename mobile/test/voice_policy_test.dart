import 'package:flutter_test/flutter_test.dart';
import 'package:nastech_agent/core/voice_policy.dart';

void main() {
  test('uses the compact int8 Kokoro model and one explicit voice', () {
    expect(KokoroVoicePolicy.modelAssetPath, contains('.int8.onnx'));
    expect(KokoroVoicePolicy.voiceAssetPath, contains('af_heart'));
    expect(KokoroVoicePolicy.modelDownloadUrl, contains('model-files-v1.0'));
  });
}
