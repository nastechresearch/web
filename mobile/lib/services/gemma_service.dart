import 'dart:convert';
import 'package:http/http.dart' as http;

class GemmaMessage {
  const GemmaMessage({required this.role, required this.content});
  final String role;
  final String content;

  Map<String, String> toJson() => {'role': role, 'content': content};
}

class GemmaService {
  const GemmaService({http.Client? client}) : _client = client;
  final http.Client? _client;

  static const endpoint = String.fromEnvironment(
    'NSTECH_GEMMA_ENDPOINT',
    defaultValue: 'https://nastechweb-nezy9zqt.manus.space/api/mobile/gemma',
  );

  Future<String> ask(List<GemmaMessage> messages) async {
    final client = _client ?? http.Client();
    try {
      final response = await client.post(
        Uri.parse(endpoint),
        headers: const {'content-type': 'application/json'},
        body: jsonEncode({'messages': messages.map((message) => message.toJson()).toList()}),
      );
      final payload = jsonDecode(response.body) as Map<String, dynamic>;
      if (response.statusCode >= 400) {
        throw StateError(payload['error']?.toString() ?? 'Gemma 4 is unavailable.');
      }
      final answer = payload['message']?.toString().trim() ?? '';
      if (answer.isEmpty) throw StateError('Gemma 4 returned an empty response.');
      return answer;
    } finally {
      if (_client == null) client.close();
    }
  }
}
