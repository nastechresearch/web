import 'package:flutter/material.dart';

class NasTechCapability {
  const NasTechCapability({required this.title, required this.detail, required this.icon, required this.source});
  final String title;
  final String detail;
  final IconData icon;
  final String source;
}

const nasTechCapabilities = <NasTechCapability>[
  NasTechCapability(title: 'Agent core', detail: 'Prompt assembly, provider resolution, tools, retries, and persistence.', icon: Icons.hub_outlined, source: 'Architecture'),
  NasTechCapability(title: 'Durable memory', detail: 'Profiles, skills, recall, and learning journeys stay visible.', icon: Icons.memory_outlined, source: 'Memory docs'),
  NasTechCapability(title: 'Tool execution', detail: 'Use browser, terminal, MCP, and isolated execution pathways.', icon: Icons.terminal_rounded, source: 'Tools docs'),
  NasTechCapability(title: 'Gateway reach', detail: 'Design for CLI, TUI, browser, and connected messaging surfaces.', icon: Icons.language_rounded, source: 'Gateway docs'),
  NasTechCapability(title: 'Model choice', detail: 'The mobile guide connects only through Ollama Cloud Gemma 4 31B.', icon: Icons.auto_awesome_outlined, source: 'Provider docs'),
  NasTechCapability(title: 'Install center', detail: 'Find Linux, macOS, and Windows pathways from the source repository.', icon: Icons.download_for_offline_outlined, source: 'Install docs'),
];

const quickPrompts = <String>[
  'How do I install NasTech Agent?',
  'Explain the memory system.',
  'How does Ollama Cloud fit into NasTech?',
];
