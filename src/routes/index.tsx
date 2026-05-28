import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Rocket, Code2, Database, Sigma, Brain, Network, Languages,
  Sparkles, Bot, Layers, Cloud, Telescope, Trophy, Flag,
  ChevronDown, Check, Zap, RotateCcw, Search, Flame, Target,
} from "lucide-react";
import { ROADMAP, TOTAL_TOPICS, type Level } from "@/data/roadmap";
import heroImg from "@/assets/hero-neural.jpg";
import iconFoundation from "@/assets/icon-foundation.png";
import iconML from "@/assets/icon-ml.png";
import iconAgent from "@/assets/icon-agent.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neura — The Expert AI & ML Roadmap" },
      { name: "description", content: "A guided, level-by-level AI & ML learning platform: 250+ topics from Python basics to expert agents, RAG, deployment and beyond." },
      { property: "og:title", content: "Neura — The Expert AI & ML Roadmap" },
      { property: "og:description", content: "Track your journey from foundation to expert AI engineer across 14 levels." },
    ],
  }),
  component: HomePage,
});

const ICONS = { rocket: Rocket, code: Code2, database: Database, sigma: Sigma, brain: Brain, network: Network, languages: Languages, sparkles: Sparkles, bot: Bot, layers: Layers, cloud: Cloud, telescope: Telescope, trophy: Trophy, flag: Flag } as const;

type Filter = "all" | "pending" | "done" | "new";

const keyFor = (lIdx: number, section: string, topic: string) => `${lIdx}||${section}||${topic}`;

function HomePage() {
  const [state, setState] = useState<Record<string, boolean>>({});
  const [openLevels, setOpenLevels] = useState<Record<number, boolean>>({ 0: true });
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("neura_roadmap_v1");
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("neura_roadmap_v1", JSON.stringify(state)); } catch {}
  }, [state]);

  const done = useMemo(() => Object.values(state).filter(Boolean).length, [state]);
  const pct = Math.round((done / TOTAL_TOPICS) * 100);

  const completedLevels = useMemo(
    () => ROADMAP.filter((lvl, i) => {
      const total = lvl.sections.reduce((a, s) => a + s.topics.length, 0);
      const d = lvl.sections.flatMap(s => s.topics.map(tp => keyFor(i, s.name, tp.name))).filter(k => state[k]).length;
      return total > 0 && d === total;
    }).length,
    [state]
  );

  function toggleTopic(k: string) {
    setState(prev => ({ ...prev, [k]: !prev[k] }));
  }
  function reset() {
    if (confirm("Reset all progress? Idhu undo aagadhu.")) setState({});
  }
  function markLevelDone(lIdx: number) {
    setState(prev => {
      const next = { ...prev };
      ROADMAP[lIdx].sections.forEach(s => s.topics.forEach(tp => { next[keyFor(lIdx, s.name, tp.name)] = true; }));
      return next;
    });
  }

  return (
    <div className="min-h-screen">
      <Header pct={pct} />
      <Hero done={done} pct={pct} completedLevels={completedLevels} />
      <Showcase />

      <main className="mx-auto max-w-6xl px-5 pb-32">
        <Controls
          filter={filter} setFilter={setFilter}
          query={query} setQuery={setQuery}
          onReset={reset}
        />

        <ol className="mt-8 space-y-4">
          {ROADMAP.map((lvl, lIdx) => (
            <LevelCard
              key={lIdx}
              lvl={lvl}
              lIdx={lIdx}
              state={state}
              open={!!openLevels[lIdx]}
              setOpen={(v) => setOpenLevels(p => ({ ...p, [lIdx]: v }))}
              onToggle={toggleTopic}
              onMarkAll={() => markLevelDone(lIdx)}
              filter={filter}
              query={query.trim().toLowerCase()}
            />
          ))}
        </ol>
      </main>

      <Footer />
    </div>
  );
}

function Header({ pct }: { pct: number }) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
            <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Neura</span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-mono ml-2">/ ai-ml-roadmap</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground hidden sm:inline">{pct}% complete</span>
          <div className="h-1.5 w-28 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ done, pct, completedLevels }: { done: number; pct: number; completedLevels: number }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Expert edition · 14 levels · {TOTAL_TOPICS}+ topics
        </div>
        <h1 className="mt-5 font-display text-5xl sm:text-7xl font-semibold leading-[1.02] tracking-tight max-w-3xl">
          The complete <span className="text-gradient">AI &amp; ML</span> roadmap.<br />
          From zero to shipping production agents.
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          A guided, level-by-level journey across Python, classical ML, deep learning, LLMs, RAG, agents, deployment and expert systems. Track every topic. Build the projects. Become undeniable.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          <Stat label="Total topics" value={TOTAL_TOPICS} icon={<Target className="h-4 w-4" />} />
          <Stat label="Completed" value={done} icon={<Check className="h-4 w-4" />} accent />
          <Stat label="Levels cleared" value={`${completedLevels}/14`} icon={<Trophy className="h-4 w-4" />} />
          <Stat label="Progress" value={`${pct}%`} icon={<Flame className="h-4 w-4" />} accent />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, icon, accent }: { label: string; value: string | number; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 glass ${accent ? "border-primary/40 shadow-glow" : ""}`}>
      <div className="flex items-center gap-2 text-muted-foreground text-xs">{icon}<span className="font-mono uppercase tracking-wider">{label}</span></div>
      <div className={`mt-2 font-display text-2xl font-semibold ${accent ? "text-gradient" : ""}`}>{value}</div>
    </div>
  );
}

function Showcase() {
  const items = [
    { img: iconFoundation, title: "Strong foundation", body: "OS, terminal, Git, Python — built like a real engineer." },
    { img: iconML, title: "Deep ML intuition", body: "From regression and forests to transformers and attention." },
    { img: iconAgent, title: "Production agents", body: "RAG, MCP, multi-agent orchestration, observability, scale." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 -mt-4 pb-10">
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="glass rounded-2xl p-5 shadow-card hover:border-primary/40 transition-colors group">
            <div className="h-20 w-20 -mt-1 mb-3 grid place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border group-hover:shadow-glow transition-shadow">
              <img src={it.img} alt="" width={64} height={64} className="h-16 w-16 object-contain" loading="lazy" />
            </div>
            <h3 className="font-display text-lg font-semibold">{it.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Controls({ filter, setFilter, query, setQuery, onReset }: {
  filter: Filter; setFilter: (f: Filter) => void;
  query: string; setQuery: (q: string) => void; onReset: () => void;
}) {
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "done", label: "Done" },
    { id: "new", label: "New" },
  ];
  return (
    <div id="roadmap" className="sticky top-14 z-30 -mx-5 px-5 py-3 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full h-9 pl-9 pr-3 rounded-full bg-surface border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>
        <div className="flex gap-1.5">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`h-9 px-3.5 rounded-full text-xs font-medium border transition ${
                filter === f.id
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-border-strong"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={onReset} className="ml-auto h-9 px-3.5 rounded-full text-xs font-medium border border-border bg-surface text-muted-foreground hover:text-destructive hover:border-destructive/50 transition inline-flex items-center gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}

function LevelCard({ lvl, lIdx, state, open, setOpen, onToggle, onMarkAll, filter, query }: {
  lvl: Level; lIdx: number;
  state: Record<string, boolean>;
  open: boolean; setOpen: (b: boolean) => void;
  onToggle: (k: string) => void; onMarkAll: () => void;
  filter: Filter; query: string;
}) {
  const Icon = ICONS[lvl.icon];
  const totals = useMemo(() => {
    const all = lvl.sections.flatMap(s => s.topics.map(tp => keyFor(lIdx, s.name, tp.name)));
    return { total: all.length, done: all.filter(k => state[k]).length };
  }, [lvl, lIdx, state]);
  const pct = totals.total ? Math.round((totals.done / totals.total) * 100) : 0;
  const hasNew = lvl.sections.some(s => s.topics.some(tp => tp.isNew));
  const status = totals.done === 0 ? "empty" : totals.done === totals.total ? "done" : "progress";

  return (
    <li className="rounded-2xl border border-border bg-card shadow-card overflow-hidden transition-all hover:border-border-strong">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
      >
        <div className={`relative h-12 w-12 shrink-0 rounded-xl grid place-items-center border ${
          status === "done" ? "bg-gradient-to-br from-primary/30 to-primary/10 border-primary/50 shadow-glow"
          : status === "progress" ? "bg-gradient-to-br from-primary/15 to-accent/10 border-primary/30"
          : "bg-surface-2 border-border"
        }`}>
          <Icon className={`h-5 w-5 ${status === "empty" ? "text-muted-foreground" : "text-primary"}`} strokeWidth={2} />
          {status === "done" && (
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary grid place-items-center">
              <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">L{lIdx.toString().padStart(2, "0")}</span>
            <h2 className="font-display text-base sm:text-lg font-semibold truncate">{lvl.short}</h2>
            {hasNew && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber/15 text-amber border border-amber/30">updated</span>}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">{lvl.tagline}</p>
          <div className="mt-2.5 flex items-center gap-3">
            <div className="h-1 flex-1 max-w-[200px] rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{totals.done}/{totals.total}</span>
          </div>
        </div>

        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-border px-4 sm:px-5 py-5 space-y-5 bg-surface/40">
          {lvl.sections.map(section => {
            const filtered = section.topics.filter(tp => {
              const k = keyFor(lIdx, section.name, tp.name);
              const isDone = !!state[k];
              if (filter === "done" && !isDone) return false;
              if (filter === "pending" && isDone) return false;
              if (filter === "new" && !tp.isNew) return false;
              if (query && !tp.name.toLowerCase().includes(query)) return false;
              return true;
            });
            if (!filtered.length) return null;
            return (
              <div key={section.name}>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-2.5">{section.name}</div>
                <div className="flex flex-wrap gap-2">
                  {filtered.map(tp => {
                    const k = keyFor(lIdx, section.name, tp.name);
                    const isDone = !!state[k];
                    return (
                      <button
                        key={k}
                        onClick={() => onToggle(k)}
                        className={`group inline-flex items-center gap-1.5 text-xs sm:text-[13px] px-3 py-1.5 rounded-full border transition-all ${
                          isDone
                            ? "bg-primary/15 border-primary/50 text-primary-glow shadow-[0_0_0_1px_oklch(0.72_0.16_160/0.2)]"
                            : tp.isNew
                            ? "bg-amber/10 border-amber/40 text-amber hover:bg-amber/20"
                            : "bg-surface-2 border-border text-foreground/85 hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full transition ${
                          isDone ? "bg-primary" : tp.isNew ? "bg-amber" : "bg-muted-foreground/40"
                        }`} />
                        {tp.name}
                        {isDone && <Check className="h-3 w-3 ml-0.5" strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onMarkAll}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition inline-flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5" /> Mark level complete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center">
            <Zap className="h-3 w-3 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-foreground">Neura</span>
          <span>· built for serious AI engineers</span>
        </div>
        <span className="font-mono">Created by Manikandan · progress saved locally · v1</span>
      </div>
    </footer>
  );
}
