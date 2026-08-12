import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'core/nastech_catalog.dart';
import 'core/nastech_theme.dart';
import 'services/gemma_service.dart';
import 'services/kokoro_voice_service.dart';

class NasTechApp extends StatelessWidget {
  const NasTechApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'NasTech Agent',
    debugShowCheckedModeBanner: false,
    theme: nasTechTheme(),
    home: const NasTechShell(),
  );
}

class NasTechShell extends StatefulWidget {
  const NasTechShell({super.key});
  @override
  State<NasTechShell> createState() => _NasTechShellState();
}

class _NasTechShellState extends State<NasTechShell> {
  var _index = 0;
  late final KokoroVoiceService _voice = KokoroVoiceService();
  final GemmaService _gemma = const GemmaService();

  @override
  void dispose() { _voice.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final pages = [const _HomePage(), _ConsolePage(gemma: _gemma, voice: _voice), const _AtlasPage(), const _InstallPage()];
    return Scaffold(
      body: Stack(children: [const _AmbientBackdrop(), SafeArea(child: AnimatedSwitcher(duration: 220.ms, child: KeyedSubtree(key: ValueKey(_index), child: pages[_index])))]),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Container(
          margin: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          decoration: BoxDecoration(color: NasTechColors.panel.withOpacity(.95), borderRadius: BorderRadius.circular(26), border: Border.all(color: NasTechColors.cyan.withOpacity(.16))),
          child: NavigationBar(
            height: 68,
            selectedIndex: _index,
            backgroundColor: Colors.transparent,
            indicatorColor: NasTechColors.cyan.withOpacity(.16),
            onDestinationSelected: (value) => setState(() => _index = value),
            destinations: const [
              NavigationDestination(icon: Icon(Icons.grid_view_rounded), label: 'Home'),
              NavigationDestination(icon: Icon(Icons.forum_outlined), label: 'Gemma'),
              NavigationDestination(icon: Icon(Icons.layers_outlined), label: 'Atlas'),
              NavigationDestination(icon: Icon(Icons.download_rounded), label: 'Install'),
            ],
          ),
        ),
      ),
    );
  }
}

class _AmbientBackdrop extends StatelessWidget {
  const _AmbientBackdrop();
  @override
  Widget build(BuildContext context) => IgnorePointer(child: Stack(children: [
    Positioned(top: -120, right: -70, child: Container(width: 290, height: 290, decoration: BoxDecoration(shape: BoxShape.circle, gradient: RadialGradient(colors: [NasTechColors.cyan.withOpacity(.13), Colors.transparent])))),
    Positioned(bottom: 100, left: -120, child: Container(width: 270, height: 270, decoration: BoxDecoration(shape: BoxShape.circle, gradient: RadialGradient(colors: [NasTechColors.green.withOpacity(.08), Colors.transparent])))),
  ]));
}

class _HomePage extends StatelessWidget {
  const _HomePage();
  @override
  Widget build(BuildContext context) => CustomScrollView(slivers: [
    SliverPadding(
      padding: const EdgeInsets.fromLTRB(20, 18, 20, 32),
      sliver: SliverList(delegate: SliverChildListDelegate([
        Row(children: [
          ClipRRect(borderRadius: BorderRadius.circular(18), child: Image.asset('assets/images/nastech-circle.jpg', width: 48, height: 48, fit: BoxFit.cover)),
          const SizedBox(width: 12),
          const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('NASTECH AGENT', style: TextStyle(color: NasTechColors.cyan, fontWeight: FontWeight.w800, letterSpacing: 1.5)), Text('Sovereign intelligence', style: TextStyle(color: NasTechColors.muted, fontSize: 12))])),
          const Icon(Icons.notifications_none_rounded, color: NasTechColors.white),
        ]).animate().fadeIn(duration: 280.ms).slideY(begin: -.08),
        const SizedBox(height: 28),
        const Text('Build a living\nintelligence layer.', style: TextStyle(fontSize: 38, fontWeight: FontWeight.w800, height: .96, letterSpacing: -1.6)).animate().fadeIn(delay: 80.ms).slideY(begin: .08),
        const SizedBox(height: 14),
        const Text('NasTech brings memory, real tools, model choice, and observable agent workflows into a mobile-first operating surface.', style: TextStyle(color: NasTechColors.muted, height: 1.45)),
        const SizedBox(height: 22),
        const _LiveStatusCard().animate().fadeIn(delay: 150.ms).scale(begin: const Offset(.96, .96)),
        const SizedBox(height: 30),
        const _SectionLabel(kicker: 'SYSTEM INTELLIGENCE', title: 'A connected agent, close at hand.'),
        const SizedBox(height: 14),
        GridView.builder(
          shrinkWrap: true, physics: const NeverScrollableScrollPhysics(), itemCount: nasTechCapabilities.length, gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 12, mainAxisSpacing: 12, childAspectRatio: .88),
          itemBuilder: (context, index) => _CapabilityCard(capability: nasTechCapabilities[index]).animate().fadeIn(delay: (180 + index * 55).ms).slideY(begin: .08),
        ),
        const SizedBox(height: 32),
        const _SectionLabel(kicker: 'AFRICA-FORWARD', title: 'Infrastructure should grow close to people.'),
        const SizedBox(height: 14),
        const _AfricaCard(),
      ])),
    ),
  ]);
}

class _LiveStatusCard extends StatelessWidget {
  const _LiveStatusCard();
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(gradient: LinearGradient(colors: [NasTechColors.cyan.withOpacity(.20), NasTechColors.panel]), borderRadius: BorderRadius.circular(30), border: Border.all(color: NasTechColors.cyan.withOpacity(.34))),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [Container(width: 8, height: 8, decoration: const BoxDecoration(color: NasTechColors.green, shape: BoxShape.circle)), const SizedBox(width: 8), const Text('AGENT SESSION', style: TextStyle(fontSize: 11, letterSpacing: 1.3, fontWeight: FontWeight.w800)), const Spacer(), const Text('LIVE', style: TextStyle(color: NasTechColors.cyan, fontWeight: FontWeight.w800, fontSize: 11))]),
      const SizedBox(height: 22), const Text('Ollama Cloud\nGemma 4 31B', style: TextStyle(fontSize: 27, height: 1.02, fontWeight: FontWeight.w800)), const SizedBox(height: 8), const Text('The mobile guide remains explicit about its model and connection state.', style: TextStyle(color: NasTechColors.muted)),
    ]),
  );
}

class _CapabilityCard extends StatelessWidget {
  const _CapabilityCard({required this.capability});
  final NasTechCapability capability;
  @override
  Widget build(BuildContext context) => Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: NasTechColors.panel.withOpacity(.96), borderRadius: BorderRadius.circular(26), border: Border.all(color: Colors.white.withOpacity(.08))), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Icon(capability.icon, color: NasTechColors.green), const Spacer(), Text(capability.title, style: const TextStyle(fontWeight: FontWeight.w800)), const SizedBox(height: 7), Text(capability.detail, maxLines: 3, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 11, color: NasTechColors.muted, height: 1.25))]));
}

class _AfricaCard extends StatelessWidget {
  const _AfricaCard();
  @override
  Widget build(BuildContext context) => Container(height: 188, clipBehavior: Clip.antiAlias, decoration: BoxDecoration(borderRadius: BorderRadius.circular(30), border: Border.all(color: NasTechColors.green.withOpacity(.25))), child: Stack(fit: StackFit.expand, children: [Image.asset('assets/images/nastech-africa.jpg', fit: BoxFit.cover, color: Colors.black.withOpacity(.32), colorBlendMode: BlendMode.darken), const Positioned(left: 18, right: 18, bottom: 18, child: Text('Local learning, responsible access, and regional capability.', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 17, shadows: [Shadow(color: Colors.black, blurRadius: 12)])))]));
}

class _ConsolePage extends StatefulWidget {
  const _ConsolePage({required this.gemma, required this.voice});
  final GemmaService gemma;
  final KokoroVoiceService voice;
  @override
  State<_ConsolePage> createState() => _ConsolePageState();
}

class _ConsolePageState extends State<_ConsolePage> {
  final _input = TextEditingController();
  final _messages = <GemmaMessage>[const GemmaMessage(role: 'assistant', content: 'I am NasTech Agent’s mobile guide. Ask about installation, memory, tools, gateways, or the architecture.')];
  var _pending = false;
  var _voiceStatus = 'Kokoro voice is ready when its compact model is provisioned.';

  @override
  void dispose() { _input.dispose(); super.dispose(); }

  Future<void> _send([String? seed]) async {
    final text = (seed ?? _input.text).trim();
    if (text.isEmpty || _pending) return;
    setState(() { _messages.add(GemmaMessage(role: 'user', content: text)); _input.clear(); _pending = true; });
    try {
      final answer = await widget.gemma.ask(_messages);
      if (mounted) setState(() => _messages.add(GemmaMessage(role: 'assistant', content: answer)));
    } catch (error) {
      if (mounted) setState(() => _messages.add(GemmaMessage(role: 'assistant', content: 'Gemma 4 connection status: $error')));
    } finally { if (mounted) setState(() => _pending = false); }
  }

  Future<void> _speak(String text) async {
    setState(() => _voiceStatus = 'Kokoro is preparing voice playback…');
    try { await widget.voice.speak(text); if (mounted) setState(() => _voiceStatus = 'Kokoro is speaking through the device.'); } catch (_) { if (mounted) setState(() => _voiceStatus = 'Voice model is not installed yet. The Android build workflow provisions the compact Kokoro model.'); }
  }

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.fromLTRB(20, 18, 20, 14),
    child: Column(children: [
      const _SectionLabel(kicker: 'LIVE IN-BROWSER AI', title: 'Gemma 4, with a voice.'),
      const SizedBox(height: 6),
      Row(children: [
        const Icon(Icons.volume_up_rounded, color: NasTechColors.green, size: 17),
        const SizedBox(width: 8),
        Expanded(child: Text(_voiceStatus, style: const TextStyle(color: NasTechColors.muted, fontSize: 11))),
      ]),
      const SizedBox(height: 14),
      Wrap(spacing: 8, runSpacing: 8, children: quickPrompts.map((prompt) => ActionChip(label: Text(prompt, style: const TextStyle(fontSize: 11)), onPressed: _pending ? null : () => _send(prompt))).toList()),
      const SizedBox(height: 14),
      Expanded(
        child: ListView.separated(
          itemCount: _messages.length,
          separatorBuilder: (_, __) => const SizedBox(height: 10),
          itemBuilder: (_, index) {
            final message = _messages[index];
            final assistant = message.role == 'assistant';
            return Align(
              alignment: assistant ? Alignment.centerLeft : Alignment.centerRight,
              child: GestureDetector(
                onLongPress: assistant ? () => _speak(message.content) : null,
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 340),
                  padding: const EdgeInsets.all(15),
                  decoration: BoxDecoration(color: assistant ? NasTechColors.panel : NasTechColors.cyan, borderRadius: BorderRadius.circular(22), border: Border.all(color: assistant ? Colors.white.withOpacity(.08) : Colors.transparent)),
                  child: Text(message.content, style: TextStyle(color: assistant ? NasTechColors.white : NasTechColors.black, height: 1.35)),
                ),
              ),
            );
          },
        ),
      ),
      Row(children: [
        Expanded(child: TextField(controller: _input, enabled: !_pending, minLines: 1, maxLines: 4, textInputAction: TextInputAction.send, onSubmitted: (_) => _send(), decoration: const InputDecoration(hintText: 'Ask NasTech…'))),
        const SizedBox(width: 9),
        IconButton.filled(onPressed: _pending ? null : _send, icon: _pending ? const SizedBox(width: 17, height: 17, child: CircularProgressIndicator(strokeWidth: 2)) : const Icon(Icons.arrow_upward_rounded)),
      ]),
    ]),
  );
}

class _AtlasPage extends StatelessWidget {
  const _AtlasPage();
  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(20, 18, 20, 24),
    children: [
      const _SectionLabel(kicker: 'CAPABILITY ATLAS', title: 'Visible claims, traceable sources.'),
      const SizedBox(height: 20),
      ...nasTechCapabilities.map((capability) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(color: NasTechColors.panel, borderRadius: BorderRadius.circular(24), border: Border.all(color: Colors.white.withOpacity(.08))),
        child: Row(children: [
          Icon(capability.icon, color: NasTechColors.cyan),
          const SizedBox(width: 14),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(capability.title, style: const TextStyle(fontWeight: FontWeight.w800)),
            const SizedBox(height: 4),
            Text(capability.detail, style: const TextStyle(color: NasTechColors.muted, fontSize: 12)),
            const SizedBox(height: 8),
            Text(capability.source.toUpperCase(), style: const TextStyle(color: NasTechColors.green, fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1)),
          ])),
        ]),
      )),
    ],
  );
}

class _InstallPage extends StatelessWidget {
  const _InstallPage();
  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(20, 18, 20, 24),
    children: [
      const _SectionLabel(kicker: 'INSTALL CENTER', title: 'Begin from the source.'),
      const SizedBox(height: 18),
      ...const [('Linux', 'curl -fsSL … | bash'), ('macOS', 'brew install nastech-agent'), ('Windows', 'Download the verified installer'), ('Mobile', 'NasTech Android release — package under 309 MB')].map((item) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(19),
        decoration: BoxDecoration(color: NasTechColors.panel, borderRadius: BorderRadius.circular(24), border: Border.all(color: NasTechColors.cyan.withOpacity(.12))),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(item.$1, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 17)),
          const SizedBox(height: 8),
          Text(item.$2, style: const TextStyle(color: NasTechColors.muted, fontFamily: 'monospace', fontSize: 12)),
        ]),
      )),
    ],
  );
}

class _SectionLabel extends StatelessWidget {
  const _SectionLabel({required this.kicker, required this.title});
  final String kicker; final String title;
  @override
  Widget build(BuildContext context) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(kicker, style: const TextStyle(color: NasTechColors.cyan, fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.4)), const SizedBox(height: 7), Text(title, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 25, height: 1.05, letterSpacing: -.6))]);
}
