import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, Bot, Boxes, BrainCircuit, Check, ChevronRight, CirclePlay,
  Command, Copy, Cpu, ExternalLink, Github, Globe2, Menu, Network, Orbit, PanelTop, Play,
  Radio, Search, ShieldCheck, Sparkles, TerminalSquare, X, Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { capabilities, experiencePages, featuredDocs, installOptions, subpageNames, type Capability } from "@/data/nastech";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { fetchGithubSnapshot, formatCount, formatRelativeDate, type GithubSnapshot } from "@/lib/github";
import { canSubmitSubscription, toggleMobileMenu } from "@/lib/interactions";
import { trpc } from "@/lib/trpc";

const REPO = "https://github.com/nastechresearch/NasTech-Agent";
const DOCS = "https://nastechresearch.github.io/nastech-agent/docs/";
const BRAND_BLACK = "/assets/nastech-africa-black.jpg";
const BRAND_INK = "/assets/nastech-africa-ink.jpg";

type NavItem = { label: string; href: string };
const navItems: NavItem[] = [
  { label: "Platform", href: "/" },
  { label: "Install", href: "/install" },
  { label: "Architecture", href: "/architecture" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Africa forward", href: "/future-africa" },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.48, ease: "easeOut" as const },
};

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo-mark ${compact ? "logo-mark--compact" : ""}`} aria-hidden="true">
      <span className="logo-mark__core">N</span>
      <span className="logo-mark__orbital" />
    </span>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [location] = useLocation();
  useEffect(() => { setMenuOpen(false); setPaletteOpen(false); }, [location]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const paletteItems = experiencePages.filter((item) => `${item.title} ${item.summary} ${item.section}`.toLowerCase().includes(paletteQuery.toLowerCase())).slice(0, 8);
  return (
    <div className="app-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="grid-field" aria-hidden="true" />
      <header className="topbar">
        <Link href="/" className="brand" aria-label="NasTech Agent home">
          <LogoMark compact />
          <span><strong>NASTECH</strong><em>AGENT</em></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "active" : ""}>{item.label}</Link>)}
          <a href={REPO} target="_blank" rel="noreferrer" className="nav-github"><Github size={15} /> Source</a>
        </nav>
        <button className="command-trigger" onClick={() => setPaletteOpen(true)} aria-label="Open command palette"><Search size={14} /><span>Explore</span><kbd>⌘K</kbd></button>
        <button className="icon-button menu-toggle" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(toggleMobileMenu)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.18 }} aria-label="Mobile navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}<ChevronRight size={17} /></Link>)}
          <a href={REPO} target="_blank" rel="noreferrer">GitHub repository<ExternalLink size={17} /></a>
        </motion.nav>}
      </AnimatePresence>
      <AnimatePresence>{paletteOpen ? <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setPaletteOpen(false)}><motion.div className="command-palette" role="dialog" aria-modal="true" aria-label="NasTech page navigator" initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: .98 }} transition={{ duration: .18 }} onMouseDown={(event) => event.stopPropagation()}><div className="command-palette__input"><Search size={17} /><input autoFocus value={paletteQuery} onChange={(event) => setPaletteQuery(event.target.value)} placeholder="Explore NasTech surfaces" aria-label="Search NasTech pages" /><kbd>ESC</kbd></div><p>Navigation palette · guide mode · no agent inference</p><div className="command-palette__list">{paletteItems.map((item) => <Link key={item.slug} href={item.href?.startsWith("/") ? item.href : `/explore/${item.slug}`}><span>{item.section}</span><strong>{item.title}</strong><ArrowUpRight size={16} /></Link>)}</div></motion.div></motion.div> : null}</AnimatePresence>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div><div className="brand"><LogoMark compact /><span><strong>NASTECH</strong><em>AGENT</em></span></div><p>Open-source agent infrastructure, translated into a living public product experience.</p></div>
          <div><h4>Explore</h4><Link href="/install">Installation</Link><Link href="/capabilities">Capability atlas</Link><Link href="/architecture">Architecture</Link></div>
          <div><h4>Source</h4><a href={REPO} target="_blank" rel="noreferrer">GitHub repository</a><a href={DOCS} target="_blank" rel="noreferrer">Official docs</a><a href="https://discord.gg/NastechResearch" target="_blank" rel="noreferrer">Community</a></div>
          <div><h4>Position</h4><p>Current product capabilities are cited from public NasTech sources. Future regional expansion is presented as a roadmap direction, not a released feature.</p></div>
        </div>
        <div className="footer-bottom"><span>Built around public NasTech Agent documentation.</span><span>MIT source repository · 2026</span></div>
      </footer>
    </div>
  );
}

function useGithubData() {
  const [data, setData] = useState<GithubSnapshot | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const refresh = async () => {
    setState("loading");
    try { setData(await fetchGithubSnapshot()); setState("ready"); }
    catch { setState("error"); }
  };
  useEffect(() => { void refresh(); }, []);
  return { data, state, refresh };
}

function GithubPulse({ compact = false }: { compact?: boolean }) {
  const { data, state, refresh } = useGithubData();
  const metrics = data ? [
    ["Stars", formatCount(data.repo.stargazers_count)], ["Forks", formatCount(data.repo.forks_count)], ["Open issues", formatCount(data.repo.open_issues_count)], ["Pushed", formatRelativeDate(data.repo.pushed_at)],
  ] : [["Stars", "—"], ["Forks", "—"], ["Open issues", "—"], ["Pushed", "—"]];
  return <section className={`github-pulse ${compact ? "github-pulse--compact" : ""}`} aria-label="Live GitHub repository data">
    <div className="section-kicker"><span className={`status-dot ${state === "ready" ? "" : "status-dot--idle"}`} /> Live repository signal</div>
    <div className="github-pulse__head"><div><h3>Source stays in motion.</h3><p>Public GitHub data is requested live when this page opens.</p></div><button className="text-button" onClick={() => void refresh()} aria-label="Refresh repository data"><Radio size={15} /> Refresh</button></div>
    <div className="metric-row">{metrics.map(([label, value]) => <div key={label} className="metric"><strong>{value}</strong><span>{label}</span></div>)}</div>
    {state === "error" ? <p className="inline-notice">GitHub is not responding at the moment. The source repository remains available below.</p> : null}
    <a className="source-link" href={REPO} target="_blank" rel="noreferrer"><Github size={16} /> Explore live source <ArrowUpRight size={15} /></a>
  </section>;
}

function ParticleField() {
  const reduced = useReducedMotion();
  const particles = useMemo(() => Array.from({ length: 36 }, (_, index) => ({
    id: index, left: `${(index * 17.7) % 100}%`, top: `${(index * 23.9) % 92}%`, delay: `${(index % 9) * -0.6}s`, duration: `${4.8 + (index % 5)}s`, size: `${2 + (index % 3)}px`,
  })), []);
  return <div className={`particle-field ${reduced ? "particle-field--still" : ""}`} aria-hidden="true">{particles.map((particle) => <i key={particle.id} style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration, width: particle.size, height: particle.size }} />)}</div>;
}

function Hero({ openVideo }: { openVideo: () => void }) {
  return <section className="hero-section">
    <ParticleField />
    <div className="hero-grid">
      <motion.div {...reveal} className="hero-copy">
        <div className="eyebrow"><span /> Agent infrastructure · open source · alive</div>
        <div className="hero-brandline"><LogoMark /><div><span>THE AGENT THAT</span><strong>GROWS WITH YOU</strong></div></div>
        <h1>Build a <span>living</span> intelligence layer.</h1>
        <p className="hero-lede">NasTech Agent brings a self-improving loop, durable memory, real tools, model choice, and a cross-platform gateway into one agent system — designed to move from personal workspaces to durable infrastructure.</p>
        <div className="hero-actions"><Link href="/install" className="button button--primary">Start installation <ArrowDownRight size={18} /></Link><button onClick={openVideo} className="button button--ghost"><CirclePlay size={18} /> Watch the walkthrough</button></div>
        <div className="trust-line"><span className="trust-line__pulse" /> Built around verified public repository and documentation sources</div>
      </motion.div>
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="hero-visual">
        <div className="orbital-rails" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-art"><img src={BRAND_BLACK} alt="NasTech Agent Africa-forward brand artwork" /><div className="hero-art__scrim" /></div>
        <div className="agent-window">
          <div className="window-top"><span className="window-led" /><span>nastech · agent session</span><span className="window-meta">LIVE STATE</span></div>
          <div className="window-body"><div className="prompt"><span>YOU</span> Design a reliable research workflow.</div><div className="response"><span>NASTECH</span><p>Mapping tools, memory, and a parallel workstream before the first action.</p><div className="tool-line"><BrainCircuit size={14} /> MEMORY CONTEXT <i /> <TerminalSquare size={14} /> TOOL READY</div></div></div>
          <button onClick={openVideo} className="window-play"><Play size={15} fill="currentColor" /> Play overview</button>
        </div>
        <div className="floating-chip floating-chip--one"><Sparkles size={14} /> SELF-IMPROVING</div><div className="floating-chip floating-chip--two"><Network size={14} /> MULTI-SURFACE</div>
      </motion.div>
    </div>
  </section>;
}

function OperatingSystem() {
  const nodes = [
    ["01", "Input surfaces", "CLI, TUI, browser, and connected messaging platforms."],
    ["02", "AIAgent core", "Prompt assembly, provider resolution, tool dispatch, retries, persistence."],
    ["03", "Learning layer", "Curated memory, skills, FTS5 recall, and journey visualization."],
    ["04", "Execution layer", "Tools, MCP, isolated backends, delegates and scheduled work."],
  ];
  return <section className="section section--architecture">
    <motion.div {...reveal} className="section-heading section-heading--split"><div><div className="eyebrow"><span /> System intelligence</div><h2>One agent. <span>Many realities.</span></h2></div><p>The official architecture maps several entry points into the same core agent loop. The public site mirrors that idea: each view stays connected to the operating system beneath it.</p></motion.div>
    <div className="architecture-flow">{nodes.map((node, index) => <motion.article key={node[0]} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }} className="flow-node"><div className="node-index">{node[0]}</div><div><h3>{node[1]}</h3><p>{node[2]}</p></div>{index < nodes.length - 1 ? <ChevronRight className="flow-arrow" /> : null}</motion.article>)}</div>
    <div className="architecture-banner"><div><span>OBSERVABLE BY DESIGN</span><h3>Architecture is not a black box.</h3><p>NasTech documents prompt stability, visible tool calls, interruption, platform-agnostic orchestration, loose coupling, and profile isolation as core design principles.</p></div><Link href="/architecture" className="button button--soft">Explore the architecture <ArrowUpRight size={17} /></Link></div>
  </section>;
}

function ConsoleGuide() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "I’m connected through **Ollama Cloud Gemma 4 31B**. Ask about NasTech Agent’s installation, tools, memory, models, architecture, gateways, or documentation." }]);
  const chat = trpc.gemma.chat.useMutation({
    onSuccess: ({ message }) => setMessages((current) => [...current, { role: "assistant", content: message }]),
    onError: (error) => setMessages((current) => [...current, { role: "assistant", content: `**Gemma 4 connection status:** ${error.message}` }]),
  });
  const send = (content: string) => {
    if (chat.isPending) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    chat.mutate({ messages: next.map(({ role, content: message }) => ({ role: role as "user" | "assistant", content: message })) });
  };
  return <section id="console" className="section section--console"><motion.div {...reveal} className="console-layout"><div className="console-copy"><div className="eyebrow"><span /> Live in-browser AI</div><h2>Meet the system <span>with</span> Gemma 4.</h2><p>Ask the live product guide about verified NasTech source material. This browser chat calls **only Ollama Cloud Gemma 4 31B**; it will show a direct status message rather than quietly switching models.</p><div className="console-badges"><span><ShieldCheck size={15} /> Server-side key protection</span><span><Command size={15} /> Gemma 4 31B only</span></div></div><div className="console-card console-card--live"><div className="console-card__top"><span className="status-dot" /> NASTECH PRODUCT CONSOLE <em>GEMMA 4 · CLOUD</em></div><AIChatBox messages={messages} onSendMessage={send} isLoading={chat.isPending} height="350px" className="nastech-ai-chat" placeholder="Ask about installation, memory, Ollama, gateway…" suggestedPrompts={["How do I install NasTech Agent?", "What does its memory system do?", "How does Ollama Cloud fit into NasTech?"]} /></div></motion.div></section>;
}

function CapabilityPreview() {
  const [activeDomain, setActiveDomain] = useState<Capability["domain"] | "All">("All");
  const domains: (Capability["domain"] | "All")[] = ["All", "Interface", "Learning", "Tools", "Deploy", "Provider", "Orchestration"];
  const visible = capabilities.filter((item) => activeDomain === "All" || item.domain === activeDomain).slice(0, 12);
  return <section className="section"><motion.div {...reveal} className="section-heading section-heading--split"><div><div className="eyebrow"><span /> Verified capability map</div><h2>All <span>72</span> capabilities. No vague promises.</h2></div><p>Each capability is mapped from the public repository and documentation. The full atlas is deliberately detailed, so teams can evaluate the system without a product-marketing fog.</p></motion.div>
    <div className="filter-row" role="tablist" aria-label="Capability domains">{domains.map((domain) => <button key={domain} role="tab" aria-selected={activeDomain === domain} className={activeDomain === domain ? "selected" : ""} onClick={() => setActiveDomain(domain)}>{domain}</button>)}</div>
    <div className="capability-grid">{visible.map((item, index) => <motion.article key={item.number} {...reveal} transition={{ ...reveal.transition, delay: index * 0.035 }} className="capability-card"><div><span className="capability-number">{String(item.number).padStart(2, "0")}</span><span className="capability-domain">{item.domain}</span></div><h3>{item.title}</h3><p>{item.detail}</p><a className="claim-source" href={item.source.href} target="_blank" rel="noreferrer">{item.source.label} <ExternalLink size={12} /></a></motion.article>)}</div>
    <div className="section-action"><Link href="/capabilities" className="button button--soft">Open all 72 capability cards <ArrowUpRight size={17} /></Link></div>
  </section>;
}

function EcosystemPreview() {
  const tiles = [
    ["Models", "Portal", "OpenRouter", "Ollama Cloud", "Custom endpoints"], ["Work", "Web", "Browser", "Terminal", "MCP"], ["Reach", "Telegram", "Discord", "Slack", "WhatsApp"], ["Memory", "Skills", "FTS5 recall", "Profiles", "Learning journey"],
  ];
  return <section className="section section--ecosystem"><motion.div {...reveal} className="section-heading"><div className="eyebrow"><span /> Connected by design</div><h2>Choice at every <span>layer.</span></h2><p>NasTech’s official sources describe an extensible ecosystem: providers, tools, execution backends, gateway adapters, skills, plugins, and development surfaces. The website keeps each door visible.</p></motion.div><div className="ecosystem-grid">{tiles.map(([title, ...items], index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }} key={title} className="ecosystem-tile"><span className="tile-glyph">{index === 0 ? <Cpu /> : index === 1 ? <Boxes /> : index === 2 ? <Globe2 /> : <Orbit />}</span><h3>{title}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></motion.article>)}</div><div className="section-action"><Link href="/ecosystem" className="button button--soft">Explore ecosystem direction <ArrowUpRight size={17} /></Link></div></section>;
}

function AfricaPreview() {
  return <section className="section section--africa"><motion.div {...reveal} className="africa-card"><div className="africa-card__art"><img src={BRAND_INK} alt="Illustrated scene of family, agriculture, wildlife and an eclipse" /></div><div className="africa-card__content"><div className="eyebrow"><span /> Africa-forward future</div><h2>Infrastructure should grow <span>close to the people it serves.</span></h2><p>NasTech’s Africa-forward expansion space is a future-facing direction for community infrastructure, local learning pathways, technical access, and regional use cases. The artwork anchors this vision in continuity, care, and generational capability.</p><div className="future-tags"><span>Community learning</span><span>Local deployment literacy</span><span>Research collaboration</span><span>Responsible access</span></div><Link href="/future-africa" className="button button--primary">Explore the future lens <ArrowDownRight size={17} /></Link></div></motion.div></section>;
}

function DocsPreview() {
  return <section className="section"><motion.div {...reveal} className="section-heading section-heading--split"><div><div className="eyebrow"><span /> Documentation orbit</div><h2>Start where your <span>question</span> lives.</h2></div><a href={DOCS} target="_blank" rel="noreferrer" className="text-button">Visit official docs <ExternalLink size={15} /></a></motion.div><div className="docs-grid">{featuredDocs.map((doc, index) => <motion.a {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} href={doc.href} target="_blank" rel="noreferrer" key={doc.title} className="doc-card"><span><PanelTop size={18} /></span><h3>{doc.title}</h3><p>{doc.description}</p><ArrowUpRight size={17} className="doc-arrow" /></motion.a>)}</div></section>;
}

function UpdatesPreview() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const subscribe = trpc.subscribers.join.useMutation({
    onSuccess: ({ status, alertSent }) => {
      setEmail("");
      setConsent(false);
      setSubscriptionMessage(status === "subscribed" ? (alertSent ? "You’re on the list. The project owner has been alerted." : "You’re on the list. The owner alert is temporarily pending and has been retried.") : "This address is already subscribed. Thank you for staying close to the work.");
    },
    onError: (error) => setSubscriptionMessage(error.message),
  });
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const onSubmit = () => {
    if (!canSubmitSubscription(email, consent) || subscribe.isPending) return;
    setSubscriptionMessage("");
    subscribe.mutate({ email, consent: true });
  };
  return <section id="updates" className="section section--updates"><motion.div {...reveal} className="updates-card"><div><div className="eyebrow"><span /> Keep a signal open</div><h2>Follow the next <span>chapter.</span></h2><p>Launch updates, regional announcements, and live editorial content will enter here through a verified source workflow. No invented articles. No synthetic social proof.</p></div><div className="updates-options"><SubscriptionForm email={email} consent={consent} isPending={subscribe.isPending} message={subscriptionMessage} onEmailChange={setEmail} onConsentChange={setConsent} onSubmit={onSubmit} /><div className="updates-links"><Link href="/articles" className="button button--soft">Open articles hub <ArrowUpRight size={17} /></Link><a href="https://discord.gg/NastechResearch" target="_blank" rel="noreferrer" className="button button--soft">Join community <ArrowUpRight size={17} /></a></div></div></motion.div></section>;
}

function VideoOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open ? <motion.div className="video-overlay" role="dialog" aria-modal="true" aria-label="NasTech Agent tutorials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="video-dialog" initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.24 }} onClick={(event) => event.stopPropagation()}><div className="video-dialog__top"><div><span className="status-dot" /> OFFICIAL WALKTHROUGH SURFACE</div><button className="icon-button" onClick={onClose} aria-label="Close video"><X size={20} /></button></div><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=PLmpUb_PWAkDxewld5ZYyKifuHxgIbiq2d" title="NasTech Agent tutorials and use cases" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div><p>Video uses the NasTech Agent tutorial playlist linked from the public Quickstart documentation.</p></motion.div></motion.div> : null}</AnimatePresence>;
}

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  return <PageShell><Hero openVideo={() => setVideoOpen(true)} /><GithubPulse /><OperatingSystem /><ConsoleGuide /><CapabilityPreview /><EcosystemPreview /><AfricaPreview /><DocsPreview /><UpdatesPreview /><VideoOverlay open={videoOpen} onClose={() => setVideoOpen(false)} /></PageShell>;
}

export function InstallCenter() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (command: string) => { await navigator.clipboard.writeText(command); setCopied(command); window.setTimeout(() => setCopied(null), 1500); };
  const steps = [["01", "Install", "Use the official platform installer."], ["02", "Choose a model", "Run `nastech model` or use `nastech setup --portal`."], ["03", "Verify chat", "Start `nastech` and complete one normal conversation."], ["04", "Add a layer", "Then configure gateway, tools, skills, MCP, voice, or automation."]];
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Install center</div><h1>From zero to <span>first conversation.</span></h1><p>Official installer commands, a progressive first-run path, and a prominent source action — built around the documentation’s own recommendation: get one clean chat working before you add more layers.</p></section><section className="section install-section"><div className="install-grid">{installOptions.map((option, index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }} key={option.platform} className="install-card"><div className="install-card__head"><span>{index === 0 ? <TerminalSquare size={20} /> : <Command size={20} />}</span><div><p>OFFICIAL INSTALLER</p><h2>{option.platform}</h2></div></div><p>{option.note}</p><div className="command-block"><code>{option.command}</code><button onClick={() => void copy(option.command)} aria-label={`Copy ${option.platform} installer command`}>{copied === option.command ? <Check size={17} /> : <Copy size={17} />}</button></div><div className="install-links"><a href={option.link} target="_blank" rel="noreferrer" className="text-button">Open installer <ExternalLink size={15} /></a><a href={option.source} target="_blank" rel="noreferrer" className="text-button">Review GitHub source <Github size={15} /></a></div></motion.article>)}</div><div className="star-tapper"><div className="star-tapper__icon"><Github size={28} /></div><div><p>Open source grows when the source stays visible.</p><h2>Give NasTech Agent a star.</h2><span>GitHub may ask you to sign in before you can star the repository.</span></div><a href={`${REPO}/stargazers`} target="_blank" rel="noreferrer" className="button button--primary">Star on GitHub <Github size={18} /></a></div><div className="first-run"><div className="section-heading"><div className="eyebrow"><span /> First-run system</div><h2>Build confidence in <span>four moves.</span></h2></div><div className="steps-grid">{steps.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section><GithubPulse compact /></PageShell>;
}

export function ArchitecturePage() {
  const layers = [["Entry points", "CLI · gateway · ACP · batch runner · API server · Python library", "Input surfaces"], ["AIAgent", "Prompt builder · provider resolution · tool dispatch · caching & compression", "Core loop"], ["Persistence", "SQLite · FTS5 · sessions · profiles · durable delivery", "Continuity"], ["Extensibility", "Tool registry · plugins · MCP · execution backends · cron", "Reach"]];
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Architecture lens</div><h1>Systems should be <span>legible.</span></h1><p>The official documentation positions the `AIAgent` as the shared orchestration core across interfaces. This visual map reduces the system to navigable layers without replacing its technical documentation.</p></section><section className="section"><div className="architecture-map">{layers.map(([title, detail, tag], index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }} key={title} className="architecture-map__layer"><span>{String(index + 1).padStart(2, "0")}</span><div><p>{tag}</p><h2>{title}</h2><h3>{detail}</h3></div><Network size={27} /></motion.article>)}</div><div className="deep-links"><a href="https://nastechresearch.github.io/nastech-agent/docs/developer-guide/architecture" target="_blank" rel="noreferrer" className="button button--primary">Read official architecture <ExternalLink size={17} /></a><Link href="/capabilities" className="button button--soft">View capability atlas <ArrowUpRight size={17} /></Link></div></section></PageShell>;
}

export function EcosystemPage() {
  const direction = [["Model layer", "Nastech Portal, direct providers, Ollama Cloud, local models, and OpenAI-compatible endpoints.", "Provider choice"], ["Tool layer", "Web, browser, terminal, files, media, code execution, memory, delegation, scheduling and MCP pathways.", "Composable work"], ["Surface layer", "CLI, modern TUI, gateway platforms, ACP editors, batch and API entry points.", "Where work happens"], ["Future layer", "Public documentation, community, regional launch stories and source-backed articles.", "Visible growth"]];
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Ecosystem & integrations</div><h1>Choose a toolchain. <span>Keep your agency.</span></h1><p>NasTech’s repository documents a modular system in which the model, tools, execution backend, and user surface can vary without changing the core agent concept.</p></section><section className="section"><div className="direction-grid">{direction.map(([title, detail, label], index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }} key={title} className="direction-card"><span>{label}</span><h2>{title}</h2><p>{detail}</p><ArrowDownRight size={21} /></motion.article>)}</div><div className="timeline"><div className="timeline-head"><div><div className="eyebrow"><span /> Expansion sequence</div><h2>Current source. Community signal. <span>Future reach.</span></h2></div><Link href="/future-africa" className="text-button">Africa-forward view <ArrowUpRight size={15} /></Link></div>{[["Now", "Verified product surface", "Repository, docs, installers, tools, provider paths, community and open-source work."], ["Next", "Live knowledge surface", "Source-connected GitHub activity, published updates, and transparent integration status."], ["Future", "Regional expansion", "Community learning, local deployment literacy, research collaboration, and responsible access framing."]].map(([phase, title, detail]) => <div className="timeline-row" key={phase}><span>{phase}</span><div><h3>{title}</h3><p>{detail}</p></div></div>)}</div></section></PageShell>;
}

export function AfricaFuturePage() {
  return <PageShell><section className="africa-hero"><img src={BRAND_BLACK} alt="NasTech Africa-forward brand artwork" /><div className="africa-hero__veil" /><div className="africa-hero__copy"><div className="eyebrow"><span /> Future expansion</div><h1>Build the next layer <span>with the continent, not around it.</span></h1><p>This space names a future direction for NasTech: regional community, accessible agent infrastructure, local deployment knowledge, research collaboration, and responsible participation. It does not present unreleased regional programs as active services.</p></div></section><section className="section"><div className="future-grid">{[["Regional learning", "Create practical pathways for people to understand model choice, local execution, skills, memory, and safe automation."], ["Applied use cases", "Frame future use cases around research, education, operations, language-aware knowledge work, and community-led experimentation."], ["Local ownership", "Keep deployment literacy, local tools, custom endpoints, and adaptable infrastructure visible in the product story."], ["Community fabric", "Use transparent source links, public documentation, contribution paths, and launch updates to grow participation without fabricated claims."]].map(([title, detail], index) => <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{detail}</p></motion.article>)}</div><div className="africa-callout"><img src={BRAND_INK} alt="African landscape and family brand illustration" /><div><div className="eyebrow"><span /> Community-first lens</div><h2>Rooted in continuity. <span>Designed for capability.</span></h2><p>The supplied visual identity stays central to this future-facing section: family, land, care, wildlife, and a horizon that can hold technical ambition without leaving people behind.</p><a href="https://discord.gg/NastechResearch" target="_blank" rel="noreferrer" className="button button--primary">Enter the community <ArrowUpRight size={17} /></a></div></div></section></PageShell>;
}

export function CapabilitiesPage() {
  const [domain, setDomain] = useState<Capability["domain"] | "All">("All");
  const shown = capabilities.filter((item) => domain === "All" || item.domain === domain);
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Full capability atlas</div><h1>Every capability has a <span>place.</span></h1><p>All 72 cards below map to repository and official documentation content. They are categorized for exploration, but no capability is hidden or condensed into an unsupported marketing claim.</p></section><section className="section"><div className="filter-row filter-row--large">{["All", "Interface", "Learning", "Tools", "Deploy", "Provider", "Orchestration"].map((item) => <button key={item} className={domain === item ? "selected" : ""} onClick={() => setDomain(item as Capability["domain"] | "All")}>{item}</button>)}</div><div className="capability-grid capability-grid--full">{shown.map((item) => <article key={item.number} className="capability-card"><div><span className="capability-number">{String(item.number).padStart(2, "0")}</span><span className="capability-domain">{item.domain}</span></div><h3>{item.title}</h3><p>{item.detail}</p><a className="claim-source" href={item.source.href} target="_blank" rel="noreferrer">{item.source.label} <ExternalLink size={12} /></a></article>)}</div></section></PageShell>;
}

export function ArticlesPage() {
  const categories = ["Product releases", "Field notes", "Installation guides", "African futures", "Community updates", "Engineering notes"];
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Live articles hub</div><h1>Real sources. <span>Real updates.</span></h1><p>This launch-ready hub is structured for verified live content. It intentionally does not invent editorial stories, publication dates, authors, or social proof before there is a public source of truth.</p></section><section className="section"><div className="article-status"><span className="status-dot status-dot--idle" /><div><h2>Waiting for a published content source.</h2><p>Connect a verified articles feed or CMS to populate this surface. Until then, readers can follow live repository activity and official documentation.</p></div><Link href="/activity" className="button button--soft">See live GitHub signal <ArrowUpRight size={17} /></Link></div><div className="article-category-grid">{categories.map((category, index) => <article key={category}><span>{String(index + 1).padStart(2, "0")}</span><h3>{category}</h3><p>Structured category ready for source-connected publishing.</p><ArrowUpRight size={17} /></article>)}</div></section></PageShell>;
}

export function DocsPage() { return <PageShell><section className="subhero"><div className="eyebrow"><span /> Documentation hub</div><h1>Depth lives in the <span>source.</span></h1><p>The site prioritizes clear discovery, then sends readers into official documentation for long-form technical details that evolve with the repository.</p></section><section className="section"><div className="docs-grid docs-grid--full">{featuredDocs.map((doc) => <a href={doc.href} target="_blank" rel="noreferrer" key={doc.title} className="doc-card"><span><PanelTop size={18} /></span><h3>{doc.title}</h3><p>{doc.description}</p><ArrowUpRight size={17} className="doc-arrow" /></a>)}</div></section></PageShell>; }

export function ActivityPage() {
  const { data, state } = useGithubData();
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Live source activity</div><h1>Follow the <span>work in motion.</span></h1><p>Repository metrics, recent commits, contributors, and the latest release come from GitHub’s public API at page load. If an endpoint is unavailable, the page stays honest about it.</p></section><section className="section"><GithubPulse /><div className="activity-grid"><article className="activity-card"><h3>Recent commits</h3>{state === "loading" ? <p>Reading live source…</p> : data?.commits.map((commit) => <a key={commit.sha} href={commit.html_url} target="_blank" rel="noreferrer"><span>{commit.commit.message}</span><em>{formatRelativeDate(commit.commit.author.date)}</em></a>) ?? <p>Commit activity unavailable right now.</p>}</article><article className="activity-card"><h3>Latest release</h3>{data?.release ? <a href={data.release.html_url} target="_blank" rel="noreferrer"><strong>{data.release.name || data.release.tag_name}</strong><span>Published {formatRelativeDate(data.release.published_at)}</span><ArrowUpRight size={17} /></a> : <p>{state === "loading" ? "Checking releases…" : "No public latest release was returned by GitHub."}</p>}</article><article className="activity-card"><h3>Contributors</h3><div className="contributors">{data?.contributors.map((person) => <a key={person.login} href={person.html_url} target="_blank" rel="noreferrer" title={person.login}><img src={person.avatar_url} alt={person.login} /></a>) ?? <p>Contributor profiles unavailable right now.</p>}</div></article></div></section></PageShell>;
}

export function ExplorerPage() {
  const [, params] = useRoute("/explore/:slug");
  const slug = params?.slug ?? "site-map";
  const page = experiencePages.find((item) => item.slug === slug) ?? experiencePages.find((item) => item.slug === "site-map")!;
  const [query, setQuery] = useState("");
  const listed = experiencePages.filter((item) => `${item.title} ${item.summary} ${item.section}`.toLowerCase().includes(query.toLowerCase()));
  return <PageShell><section className="subhero"><div className="eyebrow"><span /> Experience directory</div><h1>{page.title}<span>.</span></h1><p>{page.summary} This route is part of a data-driven information architecture built for expansion while keeping source links central.</p><div className="deep-links">{page.href?.startsWith("http") ? <a href={page.href} target="_blank" rel="noreferrer" className="button button--primary">Open source surface <ExternalLink size={17} /></a> : page.href ? <Link href={page.href} className="button button--primary">Open surface <ArrowUpRight size={17} /></Link> : null}<a href={page.source.href} target="_blank" rel="noreferrer" className="button button--soft">{page.source.label} <ExternalLink size={17} /></a></div></section><section className="section directory-section"><div className="directory-head"><div><h2>59 core surfaces</h2><p>Public site route inventory.</p></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this directory" aria-label="Search the NasTech experience directory" /></div><div className="directory-grid">{listed.map((item) => <Link key={item.slug} href={`/explore/${item.slug}`} className={item.slug === slug ? "directory-item directory-item--active" : "directory-item"}><span>{item.section}</span><h3>{item.title}</h3><p>{item.summary}</p><ArrowUpRight size={17} /></Link>)}</div><div className="subpages-panel"><div><p>Nested exploration surfaces</p><h2>38 subpages mapped for expansion.</h2></div><div>{subpageNames.map((name) => <span key={name}>{name.replaceAll("-", " ")}</span>)}</div></div></section></PageShell>;
}
