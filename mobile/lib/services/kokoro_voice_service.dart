import 'dart:io';
import 'dart:typed_data';
import 'package:just_audio/just_audio.dart';
import 'package:kokoro_tts_flutter/kokoro_tts_flutter.dart';
import 'package:path_provider/path_provider.dart';
import '../core/voice_policy.dart';

class KokoroVoiceService {
  KokoroVoiceService({AudioPlayer? player}) : _player = player ?? AudioPlayer();
  final AudioPlayer _player;
  Kokoro? _engine;

  Future<void> speak(String text, {String voice = 'af_heart', double speed = 1}) async {
    final engine = await _getEngine();
    final result = await engine.createTTS(text: text.trim(), voice: voice, speed: speed.clamp(0.5, 2.0).toDouble(), lang: 'en-us');
    final directory = await getTemporaryDirectory();
    final audioFile = File('${directory.path}/nastech-kokoro.wav');
    await audioFile.writeAsBytes(_waveFile(result.toInt16PCM(), result.sampleRate), flush: true);
    await _player.setFilePath(audioFile.path);
    await _player.play();
  }

  Future<void> stop() => _player.stop();

  Future<void> dispose() => _player.dispose();

  Future<Kokoro> _getEngine() async {
    if (_engine != null) return _engine!;
    const config = KokoroConfig(
      modelPath: KokoroVoicePolicy.modelAssetPath,
      voicesPath: KokoroVoicePolicy.voiceAssetPath,
      isInt8: true,
    );
    final engine = Kokoro(config);
    await engine.initialize();
    _engine = engine;
    return engine;
  }

  Uint8List _waveFile(Int16List samples, int sampleRate) {
    final bytes = ByteData(44 + samples.lengthInBytes);
    void ascii(int offset, String value) { for (var index = 0; index < value.length; index++) { bytes.setUint8(offset + index, value.codeUnitAt(index)); } }
    ascii(0, 'RIFF');
    bytes.setUint32(4, 36 + samples.lengthInBytes, Endian.little);
    ascii(8, 'WAVE');
    ascii(12, 'fmt ');
    bytes.setUint32(16, 16, Endian.little);
    bytes.setUint16(20, 1, Endian.little);
    bytes.setUint16(22, 1, Endian.little);
    bytes.setUint32(24, sampleRate, Endian.little);
    bytes.setUint32(28, sampleRate * 2, Endian.little);
    bytes.setUint16(32, 2, Endian.little);
    bytes.setUint16(34, 16, Endian.little);
    ascii(36, 'data');
    bytes.setUint32(40, samples.lengthInBytes, Endian.little);
    for (var index = 0; index < samples.length; index++) { bytes.setInt16(44 + (index * 2), samples[index], Endian.little); }
    return bytes.buffer.asUint8List();
  }
}
