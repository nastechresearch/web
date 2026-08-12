export type SourceReference = { href: string; label: string };

export type Capability = {
  number: number;
  title: string;
  detail: string;
  domain: "Interface" | "Learning" | "Tools" | "Deploy" | "Provider" | "Orchestration";
  source: SourceReference;
};

const capabilitySeed: [string, string, Capability["domain"]][] = [
  ["Classic CLI", "Interactive terminal conversations through the `nastech` command.", "Interface"],
  ["Modern TUI", "A dedicated terminal UI with modal overlays, mouse selection, and non-blocking input.", "Interface"],
  ["Multiline input", "Compose longer requests with documented multiline keyboard paths.", "Interface"],
  ["Slash command autocomplete", "Browse and invoke commands directly from the terminal interface.", "Interface"],
  ["Conversation history", "Navigate prior messages in an interactive session.", "Interface"],
  ["Interrupt and redirect", "Send a new instruction or stop a running turn during work.", "Interface"],
  ["Streaming tool output", "Observe tool activity and progress while the agent works.", "Interface"],
  ["Telegram gateway", "Connect a configured Telegram surface through the unified gateway.", "Orchestration"],
  ["Discord gateway", "Connect a configured Discord surface through the unified gateway.", "Orchestration"],
  ["Slack gateway", "Connect a configured Slack surface through the unified gateway.", "Orchestration"],
  ["WhatsApp gateway", "Connect configured WhatsApp and WhatsApp Cloud pathways.", "Orchestration"],
  ["Signal gateway", "Connect a configured Signal surface through the unified gateway.", "Orchestration"],
  ["Email delivery", "Use supported messaging and scheduled-task delivery via email configuration.", "Orchestration"],
  ["Voice messages", "Handle documented voice-message transcription and spoken response workflows.", "Interface"],
  ["Cross-platform continuity", "Maintain conversations through a unified gateway session model.", "Orchestration"],
  ["Curated memory", "Persist focused environmental and workflow knowledge across sessions.", "Learning"],
  ["User profile memory", "Maintain a bounded preference profile distinct from agent notes.", "Learning"],
  ["MEMORY.md store", "Keep concise, agent-oriented environment and project notes.", "Learning"],
  ["FTS5 session search", "Search durable session history using SQLite full-text search.", "Learning"],
  ["Memory approval", "Stage memory changes for review when approval controls are enabled.", "Learning"],
  ["Learning journey", "Inspect a timeline of skills and memory updates across the agent’s learning history.", "Learning"],
  ["On-demand skills", "Load task-specific instruction documents only when they are relevant.", "Learning"],
  ["Slash skill invocation", "Invoke installed skills directly as slash commands.", "Learning"],
  ["Skills Hub", "Browse, scan, install, and manage reusable skill packages.", "Learning"],
  ["External skill directories", "Scan additional skill locations alongside the primary local store.", "Learning"],
  ["Skill bundles", "Group several repeatable skills behind one concise command.", "Learning"],
  ["Skill write approval", "Require review before a proposed skill change is applied.", "Learning"],
  ["Recurring tasks", "Schedule recurring or one-shot agent work with natural language or cron expressions.", "Orchestration"],
  ["Cron lifecycle", "Create, pause, resume, edit, trigger, and remove scheduled jobs.", "Orchestration"],
  ["Cron delivery", "Deliver scheduled results to local output or configured platform targets.", "Orchestration"],
  ["No-agent jobs", "Run deterministic scheduled scripts with output delivery and no model call.", "Orchestration"],
  ["Skill-backed jobs", "Attach one or more skills to an isolated scheduled task session.", "Orchestration"],
  ["Delegated subagents", "Spawn isolated workstreams for parallel agent tasks.", "Orchestration"],
  ["Tool-driven scripts", "Use Python scripts that call tools through RPC for multi-step pipelines.", "Orchestration"],
  ["Web research", "Search the web and extract page content through built-in tools.", "Tools"],
  ["Browser automation", "Use interactive browser controls with text and vision support.", "Tools"],
  ["Terminal execution", "Run commands through a configured execution backend.", "Tools"],
  ["File operations", "Read, write, patch, and search workspace files with tool approval paths.", "Tools"],
  ["Media tools", "Use documented vision, image-generation, and text-to-speech tool capabilities.", "Tools"],
  ["Code execution", "Run code inside a supported sandbox workflow.", "Tools"],
  ["MCP connectivity", "Connect compatible MCP servers to extend the tool surface.", "Tools"],
  ["Home Assistant", "Use available Home Assistant integration tools when configured.", "Tools"],
  ["Tool registry", "Discover and dispatch a documented registry of 70+ tools and 28 toolsets.", "Tools"],
  ["Local terminal backend", "Run configured terminal work on the local machine.", "Deploy"],
  ["Docker terminal backend", "Use an isolated, persistent Docker workspace per agent process.", "Deploy"],
  ["SSH terminal backend", "Route terminal work to a configured remote server.", "Deploy"],
  ["Singularity backend", "Use rootless HPC-style container execution when configured.", "Deploy"],
  ["Modal backend", "Use the documented serverless cloud execution backend.", "Deploy"],
  ["Daytona backend", "Use a persistent remote development workspace backend.", "Deploy"],
  ["Vercel Sandbox", "Use snapshot-backed cloud microVM execution where configured.", "Deploy"],
  ["Provider choice", "Switch among documented model providers without code changes.", "Provider"],
  ["Nastech Portal", "Connect a unified model and tool gateway subscription with OAuth.", "Provider"],
  ["OpenRouter", "Configure OpenRouter as a supported provider path.", "Provider"],
  ["OpenAI-compatible endpoints", "Point the agent to a compatible custom inference endpoint.", "Provider"],
  ["Ollama Cloud", "Use the documented Ollama Cloud provider and dynamic model discovery.", "Provider"],
  ["Local Ollama", "Configure local Ollama through the custom-endpoint path.", "Provider"],
  ["Chat Completions", "Use the documented chat-completions API transport where appropriate.", "Provider"],
  ["Responses API", "Use the documented codex-responses API transport where appropriate.", "Provider"],
  ["Anthropic Messages", "Use the documented Anthropic Messages transport where appropriate.", "Provider"],
  ["Context compression", "Summarize middle turns when a conversation reaches configured context thresholds.", "Learning"],
  ["Prompt caching", "Use provider-aware prefix caching for documented supported paths.", "Learning"],
  ["Session persistence", "Store sessions with lineage and profile-aware isolation.", "Learning"],
  ["Profile isolation", "Give each named profile its own config, home, memory, sessions, and gateway state.", "Learning"],
  ["Delivery ledger", "Recover gateway replies safely using a durable delivery record.", "Orchestration"],
  ["ACP protocol", "Expose Nastech as an editor-native agent over stdio and JSON-RPC.", "Interface"],
  ["VS Code support", "Use documented ACP integration with compatible VS Code workflows.", "Interface"],
  ["Zed support", "Use documented ACP integration with compatible Zed workflows.", "Interface"],
  ["JetBrains support", "Use documented ACP integration with compatible JetBrains workflows.", "Interface"],
  ["Batch trajectories", "Generate ShareGPT-format trajectories from agent sessions.", "Orchestration"],
  ["Trajectory compression", "Prepare compact research trajectories for training workflows.", "Orchestration"],
  ["API server entry point", "Use the documented API server as one of the product’s entry points.", "Interface"],
  ["MIT licensing", "Review and build with the repository’s public MIT license.", "Deploy"],
];

const sourceReferences = {
  cli: { href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/cli", label: "CLI & TUI documentation" },
  gateway: { href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/messaging", label: "Messaging gateway documentation" },
  memory: { href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/memory", label: "Memory documentation" },
  skills: { href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/skills", label: "Skills documentation" },
  cron: { href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/cron", label: "Cron documentation" },
  tools: { href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools", label: "Tools & toolsets documentation" },
  providers: { href: "https://nastechresearch.github.io/nastech-agent/docs/integrations/providers", label: "Provider documentation" },
  architecture: { href: "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture", label: "Architecture documentation" },
  research: { href: "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture", label: "Research trajectory architecture" },
  source: { href: "https://github.com/nastechresearch/NasTech-Agent", label: "Repository source" },
};

function sourceForCapability(title: string, domain: Capability["domain"]): SourceReference {
  if (/Telegram|Discord|Slack|WhatsApp|Signal|Email delivery|Cross-platform continuity/.test(title)) return sourceReferences.gateway;
  if (/Voice messages|Classic CLI|Modern TUI|Multiline input|Slash command autocomplete|Conversation history|Interrupt and redirect|Streaming tool output/.test(title)) return sourceReferences.cli;
  if (/memory|Memory|FTS5|Session persistence|Profile isolation|Context compression|Prompt caching|Learning journey/.test(title)) return sourceReferences.memory;
  if (/skill|Skill/.test(title)) return sourceReferences.skills;
  if (/Cron|Recurring tasks|No-agent jobs/.test(title)) return sourceReferences.cron;
  if (/Provider|Portal|OpenRouter|Ollama|Chat Completions|Responses API|Anthropic Messages/.test(title)) return sourceReferences.providers;
  if (/Research|Trajectory/.test(title)) return sourceReferences.research;
  if (/MIT licensing/.test(title)) return sourceReferences.source;
  if (domain === "Tools") return sourceReferences.tools;
  if (domain === "Deploy" || title.includes("ACP") || title.includes("VS Code") || title.includes("Zed") || title.includes("JetBrains")) return sourceReferences.architecture;
  return sourceReferences.architecture;
}

export const capabilities: Capability[] = capabilitySeed.map(([title, detail, domain], index) => ({
  number: index + 1,
  title,
  detail,
  domain,
  source: sourceForCapability(title, domain),
}));

export const capabilitySourceMap: Record<number, SourceReference> = Object.fromEntries(
  capabilities.map((capability) => [capability.number, capability.source]),
);

export const installOptions = [
  {
    platform: "Linux · WSL2 · Termux",
    command: "curl -fsSL https://nastechresearch.github.io/nastech-agent/install.sh | bash",
    link: "https://nastechresearch.github.io/nastech-agent/install.sh",
    source: "https://github.com/nastechresearch/NasTech-Agent/blob/main/setup-nastech.sh",
    note: "Official shell installer for Linux, WSL2, and the documented Termux pathway. Reload your shell when it completes, then run `nastech`.",
  },
  {
    platform: "macOS · shell install",
    command: "curl -fsSL https://nastechresearch.github.io/nastech-agent/install.sh | bash",
    link: "https://nastechresearch.github.io/nastech-agent/install.sh",
    source: "https://github.com/nastechresearch/NasTech-Agent/blob/main/setup-nastech.sh",
    note: "Official macOS shell installation pathway. The Quickstart also links to the Nastech Desktop installer for macOS.",
  },
  {
    platform: "Windows · native PowerShell",
    command: "iex (irm https://nastechresearch.github.io/nastech-agent/install.ps1)",
    link: "https://nastechresearch.github.io/nastech-agent/install.ps1",
    source: "https://github.com/nastechresearch/NasTech-Agent",
    note: "Official native Windows installer. The documentation describes a self-contained install under `%LOCALAPPDATA%\\nastech`.",
  },
];

export const featuredDocs = [
  { title: "Quickstart", description: "Install, select a provider, verify a real chat, then expand with intent.", href: "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart" },
  { title: "Architecture", description: "Entry points, AIAgent, prompt construction, providers, tools, storage, gateway, plugins, cron and ACP.", href: "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture" },
  { title: "Tools & Toolsets", description: "The built-in registry, platform toolsets, execution backends, and safety-minded configuration.", href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools" },
  { title: "Skills System", description: "Progressive disclosure, reusable procedures, hub installs and governance controls.", href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/skills" },
  { title: "Persistent Memory", description: "Bounded memory stores, session search, approval modes, and external memory providers.", href: "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/memory" },
  { title: "AI Providers", description: "Portal, self-hosted options, Ollama Cloud, custom endpoints, routing and provider setup.", href: "https://nastechresearch.github.io/nastech-agent/docs/integrations/providers" },
];

type ExperiencePage = { slug: string; title: string; summary: string; href?: string; section: string; source: SourceReference };

const routeSeed: [string, string, string, string?][] = [
  ["platform", "Platform overview", "The high-level NasTech Agent product story.", "/"], ["agent-loop", "Agent loop", "Core conversation orchestration and execution flow.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"],
  ["terminal-ui", "Terminal interface", "CLI and TUI interaction surfaces.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/cli"], ["messaging", "Messaging gateway", "The unified multi-platform gateway.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/messaging"],
  ["memory", "Persistent memory", "Bounded curated memory and session recall.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/memory"], ["skills", "Skills system", "On-demand reusable procedures.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/skills"],
  ["tools", "Tools & toolsets", "Registered tools, toolsets and configuration.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools"], ["providers", "Provider catalog", "Model routing and provider setup.", "https://nastechresearch.github.io/nastech-agent/docs/integrations/providers"],
  ["ollama", "Ollama choices", "Ollama Cloud and local custom-endpoint paths.", "https://nastechresearch.github.io/nastech-agent/docs/integrations/providers"], ["portal", "Nastech Portal", "Unified subscription and tool gateway entry point.", "https://portal.nastechresearch.com"],
  ["cron", "Scheduled tasks", "First-class agent and script automation.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/cron"], ["mcp", "MCP integration", "Extended tool connectivity through MCP.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/mcp"],
  ["acp", "Editor integration", "ACP connectivity for editor-native agent workflows.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"], ["research", "Research trajectories", "Batch generation and trajectory compression.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"],
  ["security", "Security", "Approval, pairing and containment controls.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/security"], ["configuration", "Configuration", "Config, profiles and environment references.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/configuration"],
  ["quickstart", "Quickstart", "A practical first-run path.", "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart"], ["install", "Installation", "Official installers and platform notes.", "/install"],
  ["termux", "Termux", "Android-oriented installation guidance.", "https://nastechresearch.github.io/nastech-agent/docs/getting-started/termux"], ["windows", "Windows", "Native PowerShell installation pathway.", "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart"],
  ["linux", "Linux", "Official shell installation pathway.", "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart"], ["macos", "macOS", "Official shell and desktop paths.", "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart"],
  ["desktop", "Desktop", "Nastech Desktop and product entry points.", "https://nastechresearch.github.io/nastech-agent/"], ["cli-reference", "CLI reference", "Documented commands, flags, and workflow controls.", "https://nastechresearch.github.io/nastech-agent/docs/reference/cli-commands"],
  ["gateway-commands", "Gateway commands", "Setup, service and status commands.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/messaging"], ["tool-gateway", "Tool Gateway", "Tool routing through a supported Portal subscription.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tool-gateway"],
  ["web", "Web research", "Search and extraction as agent tools.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools"], ["browser", "Browser automation", "Interactive browser tooling.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools"],
  ["terminal", "Terminal backends", "Local, Docker, remote and cloud execution backends.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools"], ["containers", "Container isolation", "Docker execution and execution-hardening guidance.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools"],
  ["delegation", "Delegation", "Parallel workstreams through isolated subagents.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"], ["session-search", "Session search", "Search and navigate historical conversations.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/memory"],
  ["learning-journey", "Learning journey", "Timeline-oriented view of learned skills and memory.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/memory"], ["plugins", "Plugins", "Discovery sources and specialized providers.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"],
  ["profiles", "Profiles", "Separate agent homes and work contexts.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"], ["voice", "Voice mode", "Voice inputs and documented tool pathways.", "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart"],
  ["media", "Media tools", "Vision, image, and text-to-speech tools.", "https://nastechresearch.github.io/nastech-agent/docs/user-guide/features/tools"], ["api", "API server", "Server entry point in the documented architecture.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture"],
  ["contributing", "Contributing", "Development setup, tests and contribution process.", "https://nastechresearch.github.io/nastech-agent/docs/developer-guide/contributing"], ["community", "Community", "Discord, GitHub issues and related community projects.", "https://github.com/nastechresearch/NasTech-Agent#community"],
  ["changelog", "Release watch", "Live release and commit visibility from GitHub.", "/activity"], ["github", "GitHub activity", "Live public repository counters and source links.", "/activity"],
  ["africa", "Africa expansion", "Future-facing region and community growth direction.", "/future-africa"], ["articles", "Articles hub", "Publication-ready content space for verified updates.", "/articles"],
  ["ecosystem", "Ecosystem", "Tools, providers and product direction.", "/ecosystem"], ["capabilities", "Capability atlas", "All 72 source-backed product capability cards.", "/capabilities"],
  ["architecture", "Architecture map", "A visual guide to product subsystems.", "/architecture"], ["docs", "Documentation hub", "Official resources curated by purpose.", "/docs"],
  ["install-center", "Install center", "Copyable installers and first-run steps.", "/install"], ["demo", "Agent console", "A transparent integration-ready in-browser product guide.", "/#console"],
  ["in-browser-ai", "In-browser AI", "Ollama Cloud Gemma 4 31B product guidance in the public console.", "/#console"],
  ["updates", "Launch updates", "Subscription-ready product updates pathway.", "/#updates"], ["roadmap", "Roadmap lens", "Future milestones, clearly separated from current capability.", "/ecosystem"],
  ["site-map", "Experience directory", "Browse the expanded NasTech site map.", "/explore/site-map"], ["open-source", "Open source", "Repository, issues, contributions and MIT license.", "https://github.com/nastechresearch/NasTech-Agent"],
  ["privacy", "Privacy & consent", "Visitor consent and future integration governance.", "/explore/privacy"], ["accessibility", "Accessible interaction", "Responsive keyboard and reduced-motion principles.", "/explore/accessibility"],
  ["contact", "Contact surface", "Public community and documentation paths.", "https://discord.gg/NastechResearch"], ["launch", "Launch readiness", "A clear view of current sources, future expansion and next steps.", "/"],
];

function sourceForRoute(slug: string, href?: string): SourceReference {
  if (href?.startsWith("https://")) return { href, label: "Claim source" };
  if (/install|windows|linux|macos|termux/.test(slug)) return { href: "https://nastechresearch.github.io/nastech-agent/docs/getting-started/quickstart", label: "Quickstart source" };
  if (/memory|session|learning|profiles/.test(slug)) return sourceReferences.memory;
  if (/skills/.test(slug)) return sourceReferences.skills;
  if (/tools|web|browser|terminal|containers/.test(slug)) return sourceReferences.tools;
  if (/provider|ollama|portal/.test(slug)) return sourceReferences.providers;
  if (/gateway|messaging|community/.test(slug)) return sourceReferences.gateway;
  return sourceReferences.architecture;
}

const baseExperiencePages: ExperiencePage[] = routeSeed.map(([slug, title, summary, href], index) => ({
  slug,
  title,
  summary,
  href,
  source: sourceForRoute(slug, href),
  section: index < 16 ? "Core system" : index < 34 ? "Operating model" : index < 48 ? "Community & knowledge" : "Experience layers",
}));

export const subpageNames = [
  "provider-routing", "provider-fallbacks", "provider-auth", "ollama-cloud", "custom-endpoints", "toolsets", "browser-controls", "terminal-safety", "container-persistence", "session-lineage", "memory-approval", "skills-hub", "skill-bundles", "skill-security", "gateway-pairing", "gateway-delivery", "gateway-permissions", "cron-preflight", "cron-delivery", "cron-script-mode", "acp-workflows", "trajectory-format", "contributor-setup", "release-monitoring", "github-metrics", "install-linux", "install-windows", "install-macos", "install-termux", "africa-regions", "africa-use-cases", "africa-community", "article-categories", "article-sources", "accessibility-settings", "motion-settings", "subscriber-consent", "integration-status",
];

const capabilityPages: ExperiencePage[] = capabilities.map((capability) => ({
  slug: `capability-${capability.number}-${capability.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  title: capability.title,
  summary: capability.detail,
  section: `${capability.domain} capability`,
  source: capability.source,
}));

const nestedPages: ExperiencePage[] = subpageNames.map((slug) => ({
  slug: `detail-${slug}`,
  title: slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" "),
  summary: "A focused NasTech product detail view with direct documentation context.",
  section: "Product detail",
  source: sourceForRoute(slug),
}));

const workspaceFamilies = [
  ["Developer workspace", ["Python workspace", "Java workspace", "C++ workspace", "CSS studio", "TypeScript workspace", "Shell workspace"]],
  ["Build lab", ["Project scaffold", "Dependency map", "Build pipeline", "Test runner", "Release checklist", "Artifact browser"]],
  ["Agent studio", ["Avatar console", "Voice controls", "Prompt workspace", "Tool orchestration", "Memory review", "Session replay"]],
  ["Research desk", ["Web inquiry", "Source library", "Browser task plan", "Data notebook", "Trajectory viewer", "Citation board"]],
  ["Automation hub", ["Job composer", "Cron monitor", "Delivery ledger", "Agent delegation", "Trigger rules", "Run history"]],
  ["Gateway center", ["Telegram surface", "Discord surface", "Slack surface", "WhatsApp surface", "Signal surface", "Email delivery"]],
  ["Provider controls", ["Ollama Cloud", "Local endpoint", "Provider routing", "Model catalog", "Context policy", "Usage monitor"]],
  ["Deployment center", ["Linux installer", "Windows installer", "macOS installer", "Termux installer", "Container runtime", "Remote workspace"]],
  ["Community center", ["Launch updates", "Article signals", "Community hub", "Contributing guide", "Issue triage", "Release watch"]],
  ["Africa forward", ["Regional rollout", "Connectivity design", "Learning access", "Research nodes", "Community programs", "Local language roadmap"]],
] as const;

const workspacePages: ExperiencePage[] = workspaceFamilies.flatMap(([section, titles]) => titles.map((title) => ({
  slug: `workspace-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  title,
  summary: "An in-app NasTech workspace surface. Connect a supported runtime or integration when you are ready to activate it.",
  section,
  source: sourceReferences.tools,
})));

export const experiencePages: ExperiencePage[] = [...baseExperiencePages, ...capabilityPages, ...nestedPages, ...workspacePages].slice(0, 229);

export const routeSourceMap: Record<string, SourceReference> = Object.fromEntries(
  experiencePages.map((page) => [page.slug, page.source]),
);
