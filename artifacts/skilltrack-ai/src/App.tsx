import { type ReactNode, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Compass,
  Flame,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Map as MapIcon,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Section = 'Overview' | 'My Skills' | 'Roadmap' | 'Achievements';

type Skill = {
  id: string;
  name: string;
  group: string;
  score: number;
  target: number;
  trend: string;
  color: string;
  icon: typeof Code2;
  note: string;
};

type RoadmapStep = {
  id: string;
  phase: string;
  title: string;
  description: string;
  time: string;
  type: string;
};

const navItems: { label: Section; icon: typeof LayoutDashboard; count?: string }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My Skills', icon: Gauge, count: '06' },
  { label: 'Roadmap', icon: MapIcon, count: '04' },
  { label: 'Achievements', icon: Trophy, count: '08' },
];

const skills: Skill[] = [
  {
    id: 'frontend',
    name: 'Frontend development',
    group: 'Technical',
    score: 82,
    target: 90,
    trend: '+8 this month',
    color: '#ef846c',
    icon: Code2,
    note: 'Strong React foundation. Sharpen accessibility and performance patterns next.',
  },
  {
    id: 'problem-solving',
    name: 'Problem solving',
    group: 'Technical',
    score: 76,
    target: 85,
    trend: '+12 this month',
    color: '#24a18f',
    icon: Lightbulb,
    note: 'Your consistency is showing. Two timed graph sessions will close the gap.',
  },
  {
    id: 'communication',
    name: 'Communication',
    group: 'Professional',
    score: 68,
    target: 82,
    trend: '+5 this month',
    color: '#e6ad4c',
    icon: Users,
    note: 'Your ideas are clear in writing. Practice a tighter 60-second verbal pitch.',
  },
  {
    id: 'system-design',
    name: 'System design',
    group: 'Technical',
    score: 54,
    target: 75,
    trend: '+9 this month',
    color: '#8a78bf',
    icon: Compass,
    note: 'The biggest opportunity in your profile. Start with queues, caching, and trade-offs.',
  },
];

const roadmapSteps: RoadmapStep[] = [
  {
    id: 'portfolio',
    phase: '01',
    title: 'Ship your proof of work',
    description: 'Polish the CampusCart case study and publish a crisp project README.',
    time: 'This week',
    type: 'Build',
  },
  {
    id: 'algorithms',
    phase: '02',
    title: 'Build interview momentum',
    description: 'Complete 3 medium graph problems and review your mistake log.',
    time: 'Next 10 days',
    type: 'Practice',
  },
  {
    id: 'pitch',
    phase: '03',
    title: 'Tell your story clearly',
    description: 'Record a 60-second introduction that connects your projects to impact.',
    time: '18 Jun',
    type: 'Prepare',
  },
  {
    id: 'mock',
    phase: '04',
    title: 'Run a realistic mock',
    description: 'Schedule one peer interview and turn the feedback into action items.',
    time: '24 Jun',
    type: 'Connect',
  },
];

const achievements = [
  { id: 'streak', title: '7 day focus streak', detail: 'Practiced consistently', date: 'Today', icon: Flame, tint: 'coral' },
  { id: 'project', title: 'Project shipped', detail: 'CampusCart v1.0', date: '2 days ago', icon: BriefcaseBusiness, tint: 'teal' },
  { id: 'challenge', title: 'Problem solver', detail: '50 challenges completed', date: '6 days ago', icon: ShieldCheck, tint: 'gold' },
];

function SectionIcon({ icon: Icon }: { icon: typeof LayoutDashboard }) {
  return <Icon size={18} strokeWidth={1.8} />;
}

function Sidebar({ active, onChange }: { active: Section; onChange: (section: Section) => void }) {
  return (
    <aside className="sidebar-surface hidden w-[248px] shrink-0 flex-col justify-between px-4 py-6 md:flex">
      <div>
        <div className="mb-10 flex items-center gap-3 px-3">
          <div className="grid size-9 place-items-center rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] shadow-[0_8px_18px_rgba(239,132,108,.24)]">
            <Zap size={18} strokeWidth={2.6} />
          </div>
          <div>
            <div className="font-display text-[17px] font-bold tracking-[-.04em]">SkillTrack<span className="text-[hsl(var(--sidebar-primary))]">.ai</span></div>
            <div className="font-mono-custom mt-0.5 text-[9px] uppercase tracking-[.18em] text-[hsl(var(--sidebar-foreground)/.52)]">Career command center</div>
          </div>
        </div>

        <div className="mb-3 px-3 font-mono-custom text-[9px] uppercase tracking-[.2em] text-[hsl(var(--sidebar-foreground)/.42)]">Workspace</div>
        <nav className="space-y-1.5" aria-label="Primary navigation">
          {navItems.map(({ label, icon, count }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                type="button"
                data-testid={`button-nav-${label.toLowerCase().replace(' ', '-')}`}
                onClick={() => onChange(label)}
                className={`nav-item flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[13px] font-semibold ${
                  isActive
                    ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] shadow-[inset_3px_0_0_hsl(var(--accent))]'
                    : 'text-[hsl(var(--sidebar-foreground)/.63)] hover:bg-[hsl(var(--sidebar-accent)/.65)] hover:text-[hsl(var(--sidebar-foreground))]'
                }`}
              >
                <span className="flex items-center gap-3"><SectionIcon icon={icon} />{label}</span>
                {count && <span className={`font-mono-custom text-[10px] ${isActive ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--sidebar-foreground)/.34)]'}`}>{count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mt-10 mb-3 px-3 font-mono-custom text-[9px] uppercase tracking-[.2em] text-[hsl(var(--sidebar-foreground)/.42)]">Your signal</div>
        <div className="rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent)/.48)] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-[hsl(var(--sidebar-foreground)/.58)]">Readiness</span>
            <span className="rounded-full bg-[hsl(var(--accent)/.14)] px-2 py-1 font-mono-custom text-[10px] text-[hsl(var(--accent))]">+6.4%</span>
          </div>
          <div className="font-display text-3xl font-bold tracking-[-.06em]">74<span className="text-base font-medium text-[hsl(var(--sidebar-foreground)/.4)]">/100</span></div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--sidebar-foreground)/.11)]">
            <div className="h-full w-[74%] rounded-full bg-[hsl(var(--accent))]" />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[hsl(var(--sidebar-foreground)/.5)]">You are 11 points from the top quarter of your cohort.</p>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--sidebar-border))] pt-4">
        <button type="button" data-testid="button-profile" onClick={() => onChange('Overview')} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[hsl(var(--sidebar-accent))]">
          <div className="grid size-9 place-items-center rounded-full bg-[hsl(var(--sidebar-primary)/.18)] font-display text-sm font-bold text-[hsl(var(--sidebar-primary))]">AM</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-bold">Aarav Mehta</div>
            <div className="truncate text-[10px] text-[hsl(var(--sidebar-foreground)/.48)]">Computer Science · Year 3</div>
          </div>
          <MoreHorizontal size={17} className="text-[hsl(var(--sidebar-foreground)/.4)]" />
        </button>
      </div>
    </aside>
  );
}

function MobileNav({ active, onChange }: { active: Section; onChange: (section: Section) => void }) {
  return (
    <div className="mobile-nav-scroll flex gap-2 overflow-x-auto border-b border-[hsl(var(--border))] px-4 py-3 md:hidden">
      {navItems.map(({ label, icon }) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            data-testid={`button-mobile-nav-${label.toLowerCase().replace(' ', '-')}`}
            onClick={() => onChange(label)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition ${isActive ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]' : 'bg-[hsl(var(--muted)/.7)] text-[hsl(var(--muted-foreground))]'}`}
          >
            <SectionIcon icon={icon} /> {label}
          </button>
        );
      })}
    </div>
  );
}

function Header({ active, onMenu }: { active: Section; onMenu: () => void }) {
  const intro = active === 'Overview' ? 'Good morning, Aarav.' : active === 'My Skills' ? 'Your skill profile.' : active === 'Roadmap' ? 'The route to your offer.' : 'Receipts for your progress.';
  const subline = active === 'Overview' ? 'Here is the clearest next move for your career.' : active === 'My Skills' ? 'Small gains compound into a profile recruiters remember.' : active === 'Roadmap' ? 'A focused plan, tuned to where you are right now.' : 'Every finished rep is evidence that you are ready.';
  return (
    <header className="relative z-10 flex items-start justify-between gap-4 px-4 pb-5 pt-5 sm:px-7 sm:pt-7 lg:px-10">
      <div className="flex items-start gap-3">
        <button type="button" data-testid="button-open-menu" onClick={onMenu} className="mt-1 grid size-9 place-items-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] md:hidden">
          <Menu size={17} />
        </button>
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--primary))]"><span className="size-1.5 rounded-full bg-[hsl(var(--accent))]" /> Tuesday, 11 June 2024</div>
          <h1 className="font-display text-[clamp(1.65rem,3vw,2.45rem)] font-bold leading-[1.06] tracking-[-.065em]">{intro}</h1>
          <p className="mt-2 max-w-xl text-xs text-[hsl(var(--muted-foreground))] sm:text-sm">{subline}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button type="button" data-testid="button-search" onClick={() => onMenu()} className="hidden size-10 place-items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition hover:-translate-y-0.5 hover:text-[hsl(var(--foreground))] sm:grid" aria-label="Search"><Search size={17} /></button>
        <button type="button" data-testid="button-notifications" onClick={() => onMenu()} className="relative grid size-10 place-items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition hover:-translate-y-0.5 hover:text-[hsl(var(--foreground))]" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-[hsl(var(--accent))]" />
        </button>
        <div className="hidden h-9 w-px bg-[hsl(var(--border))] sm:block" />
        <div className="grid size-10 place-items-center rounded-full border-2 border-[hsl(var(--card))] bg-[hsl(var(--secondary))] font-display text-xs font-bold text-[hsl(var(--secondary-foreground))] shadow-[0_0_0_1px_hsl(var(--border))]">AM</div>
      </div>
    </header>
  );
}

function ScoreCard({ score, onCheckIn, checkedIn }: { score: number; onCheckIn: () => void; checkedIn: boolean }) {
  const degrees = score * 3.6;
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] p-5 text-[hsl(var(--secondary-foreground))] shadow-[0_18px_40px_rgba(34,44,67,.17)] sm:p-6">
      <div className="absolute -right-16 -top-24 size-60 rounded-full border-[28px] border-[hsl(var(--sidebar-primary)/.08)]" />
      <div className="relative flex h-full flex-col justify-between gap-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary-foreground)/.58)]"><Sparkles size={13} className="text-[hsl(var(--accent))]" /> Career readiness</div>
            <div className="mt-2 max-w-[190px] font-display text-xl font-semibold leading-tight tracking-[-.045em]">You are building a <span className="text-[hsl(var(--accent))]">credible</span> profile.</div>
          </div>
          <button type="button" data-testid="button-score-details" onClick={onCheckIn} className="grid size-8 place-items-center rounded-lg bg-[hsl(var(--secondary-foreground)/.1)] text-[hsl(var(--secondary-foreground)/.65)] transition hover:bg-[hsl(var(--accent)/.18)] hover:text-[hsl(var(--accent))]" aria-label="Update readiness">
            <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="score-ring grid size-[112px] shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(hsl(var(--accent)) 0deg ${degrees}deg, hsl(var(--sidebar-accent)) ${degrees}deg 360deg)` }}>
              <div className="score-ring-inner grid size-[88px] place-items-center rounded-full">
                <div className="text-center"><div className="font-display text-3xl font-bold tracking-[-.08em]">{score}</div><div className="font-mono-custom text-[9px] uppercase tracking-widest text-[hsl(var(--secondary-foreground)/.45)]">out of 100</div></div>
              </div>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[hsl(var(--accent))]"><ArrowUpRight size={14} /> 6.4% <span className="font-normal text-[hsl(var(--secondary-foreground)/.45)]">vs last month</span></div>
              <p className="mt-2 max-w-[155px] text-[11px] leading-relaxed text-[hsl(var(--secondary-foreground)/.5)]">Top 31% of CS students in your cohort.</p>
            </div>
          </div>
          <button type="button" data-testid="button-daily-checkin" onClick={onCheckIn} className={`hidden shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold transition sm:flex ${checkedIn ? 'bg-[hsl(var(--primary)/.25)] text-[hsl(var(--sidebar-primary))]' : 'bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] hover:-translate-y-0.5'}`}>
            {checkedIn ? <Check size={14} /> : <Flame size={14} />} {checkedIn ? 'Checked in' : 'Daily check-in'}
          </button>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, selected, onSelect }: { skill: Skill; selected: boolean; onSelect: () => void }) {
  const Icon = skill.icon;
  const gap = skill.target - skill.score;
  return (
    <button type="button" data-testid={`card-skill-${skill.id}`} onClick={onSelect} className={`interactive-card paper-card group relative w-full overflow-hidden rounded-2xl p-4 text-left ${selected ? 'border-[hsl(var(--primary)/.5)] ring-2 ring-[hsl(var(--primary)/.12)]' : ''}`}>
      <div className="absolute right-0 top-0 h-1 w-1/2 rounded-bl-full opacity-80" style={{ backgroundColor: skill.color }} />
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="grid size-9 place-items-center rounded-xl" style={{ backgroundColor: `${skill.color}18`, color: skill.color }}><Icon size={17} /></div>
        <span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">{skill.group}</span>
      </div>
      <div className="text-[13px] font-bold leading-snug">{skill.name}</div>
      <div className="mt-3 flex items-end justify-between">
        <div className="font-display text-3xl font-bold tracking-[-.07em]">{skill.score}<span className="ml-1 text-sm font-medium text-[hsl(var(--muted-foreground))]">%</span></div>
        <span className="mb-1 flex items-center gap-1 text-[10px] font-bold" style={{ color: skill.color }}><ArrowUpRight size={12} /> {skill.trend}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="bar-fill h-full rounded-full" style={{ width: `${skill.score}%`, backgroundColor: skill.color }} /></div>
      <div className="mt-2 flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]"><span>Current level</span><span>{gap} pts to target</span></div>
      <ChevronRight size={15} className="absolute bottom-4 right-4 text-[hsl(var(--muted-foreground)/.5)] transition group-hover:translate-x-1 group-hover:text-[hsl(var(--foreground))]" />
    </button>
  );
}

function SkillGapChart({ selectedSkill }: { selectedSkill: Skill | undefined }) {
  const data = [
    { label: 'Technical', current: 78, desired: 88, color: '#24a18f' },
    { label: 'Problem solving', current: 76, desired: 85, color: '#ef846c' },
    { label: 'Communication', current: 68, desired: 82, color: '#e6ad4c' },
    { label: 'Leadership', current: 47, desired: 70, color: '#8a78bf' },
  ];
  return (
    <section className="paper-card rounded-2xl p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div><div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]"><Target size={13} className="text-[hsl(var(--primary))]" /> Signal analysis</div><h2 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">Your skill gap, at a glance</h2></div>
        <button type="button" data-testid="button-gap-view" className="rounded-lg border border-[hsl(var(--border))] px-2.5 py-1.5 text-[10px] font-bold text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--primary)/.4)] hover:text-[hsl(var(--primary))]">This semester</button>
      </div>
      <div className="mb-5 flex items-center gap-4 text-[10px] text-[hsl(var(--muted-foreground))]"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[hsl(var(--primary))]" /> Your level</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full border border-[hsl(var(--muted-foreground)/.55)]" /> Target level</span></div>
      <div className="space-y-5">
        {data.map((item, index) => (
          <div key={item.label} className="group">
            <div className="mb-2 flex items-center justify-between text-[11px]"><span className="font-semibold">{item.label}</span><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">{item.current} / {item.desired}</span></div>
            <div className="relative h-2 rounded-full bg-[hsl(var(--muted))]">
              <div className="bar-fill h-full rounded-full" style={{ width: `${item.current}%`, backgroundColor: item.color, animationDelay: `${index * 90}ms` }} />
              <span className="absolute -top-1.5 size-5 rounded-full border-2 border-[hsl(var(--card))] bg-transparent shadow-[0_0_0_1px_hsl(var(--muted-foreground)/.38)] transition group-hover:scale-110" style={{ left: `calc(${item.desired}% - 8px)` }} />
            </div>
          </div>
        ))}
      </div>
      {selectedSkill && (
        <div className="pop-in mt-6 flex items-start gap-3 rounded-xl bg-[hsl(var(--primary)/.08)] p-3.5">
          <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Lightbulb size={14} /></div>
          <div><div className="text-[11px] font-bold">AI read on {selectedSkill.name.toLowerCase()}</div><p className="mt-1 text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">{selectedSkill.note}</p></div>
        </div>
      )}
    </section>
  );
}

function RoadmapCard({ completed, selectedId, onSelect, onToggle }: { completed: Set<string>; selectedId: string; onSelect: (id: string) => void; onToggle: (step: RoadmapStep) => void }) {
  return (
    <section className="paper-card rounded-2xl p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div><div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]"><MapIcon size={13} className="text-[hsl(var(--primary))]" /> Active roadmap</div><h2 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">Next best moves</h2></div>
        <span className="rounded-full bg-[hsl(var(--accent)/.14)] px-2.5 py-1 font-mono-custom text-[10px] text-[hsl(var(--accent-foreground))]">{completed.size}/4 done</span>
      </div>
      <div className="relative space-y-1">
        <div className="roadmap-line absolute left-[15px] top-4 h-[calc(100%-32px)] w-px opacity-30" />
        {roadmapSteps.slice(0, 3).map((step, index) => {
          const isDone = completed.has(step.id);
          const isSelected = selectedId === step.id;
          return (
            <div key={step.id} className={`relative flex gap-3 rounded-xl p-2 transition ${isSelected ? 'bg-[hsl(var(--muted)/.7)]' : 'hover:bg-[hsl(var(--muted)/.42)]'}`}>
              <button type="button" data-testid={`button-roadmap-toggle-${step.id}`} onClick={() => onToggle(step)} className={`relative z-[1] mt-1 grid size-7 shrink-0 place-items-center rounded-full border-2 transition ${isDone ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]'}`} aria-label={`${isDone ? 'Reopen' : 'Complete'} ${step.title}`}>{isDone ? <Check size={13} strokeWidth={3} /> : <span className="font-mono-custom text-[9px]">{step.phase}</span>}</button>
              <button type="button" data-testid={`button-roadmap-select-${step.id}`} onClick={() => onSelect(step.id)} className="min-w-0 flex-1 text-left">
                <div className={`flex items-start justify-between gap-3 ${isDone ? 'opacity-55' : ''}`}><div><div className={`text-[12px] font-bold ${isDone ? 'line-through' : ''}`}>{step.title}</div><p className="mt-1 line-clamp-1 text-[10px] leading-relaxed text-[hsl(var(--muted-foreground))]">{step.description}</p></div><span className="shrink-0 font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">{step.time}</span></div>
              </button>
            </div>
          );
        })}
      </div>
      <button type="button" data-testid="button-view-roadmap" onClick={() => onSelect('full')} className="mt-5 flex w-full items-center justify-between border-t border-[hsl(var(--border))] pt-4 text-[11px] font-bold text-[hsl(var(--primary))] transition hover:text-[hsl(var(--accent-foreground))]"><span>View full roadmap</span><ArrowUpRight size={14} /></button>
    </section>
  );
}

function AchievementsCard({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section className="paper-card rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3"><div><div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]"><Trophy size={13} className="text-[hsl(var(--accent))]" /> Recent wins</div><h2 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">Momentum worth keeping</h2></div><button type="button" data-testid="button-all-achievements" onClick={onViewAll} className="text-[11px] font-bold text-[hsl(var(--primary))] hover:underline">See all</button></div>
      <div className="space-y-2">
        {achievements.map(({ id, title, detail, date, icon: Icon, tint }) => {
          const tintVar = tint === 'coral' ? 'var(--accent)' : tint === 'teal' ? 'var(--primary)' : 'var(--chart-3)';
          return <div key={id} data-testid={`status-achievement-${id}`} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-[hsl(var(--muted)/.48)]"><div className="grid size-9 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `hsl(${tintVar} / .14)`, color: `hsl(${tintVar})` }}><Icon size={16} /></div><div className="min-w-0 flex-1"><div className="truncate text-[11px] font-bold">{title}</div><div className="mt-0.5 truncate text-[10px] text-[hsl(var(--muted-foreground))]">{detail}</div></div><div className="shrink-0 text-right font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">{date}</div></div>;
        })}
      </div>
    </section>
  );
}

function ProgressStrip({ checkedIn, completedCount, onCheckIn }: { checkedIn: boolean; completedCount: number; onCheckIn: () => void }) {
  const weekProgress = Math.min(100, 47 + completedCount * 11 + (checkedIn ? 12 : 0));
  return (
    <section className="grid-texture relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/.48)] p-5 sm:p-6">
      <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div><div className="mb-2 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]"><BookOpen size={13} /> Weekly pulse</div><h2 className="font-display text-xl font-bold tracking-[-.045em]">Keep the signal warm.</h2><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">You have 3 focused sessions left to hit this week&apos;s goal.</p></div>
        <div className="flex items-center gap-5"><div className="relative size-[74px]"><svg className="size-full -rotate-90" viewBox="0 0 36 36"><path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="3.5" /><path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeDasharray={`${weekProgress}, 100`} strokeLinecap="round" /></svg><span className="absolute inset-0 grid place-items-center font-display text-sm font-bold">{weekProgress}%</span></div><button type="button" data-testid="button-progress-checkin" onClick={onCheckIn} className="flex items-center gap-2 rounded-xl bg-[hsl(var(--secondary))] px-3.5 py-2.5 text-[11px] font-bold text-[hsl(var(--secondary-foreground))] transition hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(34,44,67,.15)]">{checkedIn ? <Check size={14} className="text-[hsl(var(--accent))]" /> : <Play size={13} fill="currentColor" />} {checkedIn ? 'Logged for today' : 'Start a session'}</button></div>
      </div>
    </section>
  );
}

function SkillsView({ selectedSkill, onSelect, onPractice }: { selectedSkill: Skill | undefined; onSelect: (skill: Skill) => void; onPractice: () => void }) {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[hsl(var(--primary))]">Profile inventory · 12 signals</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-.06em]">Skills that tell your story</h2></div><button type="button" data-testid="button-log-practice-skills" onClick={onPractice} className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--secondary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--secondary-foreground))] transition hover:-translate-y-0.5"><Plus size={15} /> Log a practice session</button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{skills.map((skill) => <SkillCard key={skill.id} skill={skill} selected={selectedSkill?.id === skill.id} onSelect={() => onSelect(skill)} />)}</div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><SkillGapChart selectedSkill={selectedSkill} /><section className="rounded-2xl bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))]"><div className="mb-8 flex items-start justify-between"><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary-foreground)/.65)]">AI recommendation</div><Sparkles size={18} /></div><h3 className="max-w-sm font-display text-2xl font-bold leading-tight tracking-[-.055em]">Turn your weakest signal into your strongest story.</h3><p className="mt-4 max-w-sm text-xs leading-relaxed text-[hsl(var(--primary-foreground)/.7)]">Your system design gap is the clearest lever for placement readiness. A 20-minute practice loop, four times a week, is enough to shift it.</p><button type="button" data-testid="button-start-recommendation" onClick={onPractice} className="mt-7 flex items-center gap-2 rounded-xl bg-[hsl(var(--card))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--foreground))] transition hover:-translate-y-0.5"><Play size={13} fill="currentColor" /> Start today&apos;s loop</button></section></div>
    </div>
  );
}

function RoadmapView({ completed, selectedId, onSelect, onToggle, onCompleteNext }: { completed: Set<string>; selectedId: string; onSelect: (id: string) => void; onToggle: (step: RoadmapStep) => void; onCompleteNext: () => void }) {
  const selected = roadmapSteps.find((step) => step.id === selectedId) ?? roadmapSteps[0];
  return (
    <div className="page-enter space-y-6">
      <div><div className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[hsl(var(--primary))]">June · 4 focused moves</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-.06em]">A route with less noise.</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">The plan adapts as you move. Finish the next honest step, then let the data redraw the route.</p></div>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <section className="paper-card rounded-2xl p-5 sm:p-7"><div className="mb-8 flex items-center justify-between"><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Your sequence</div><span className="font-mono-custom text-[10px] text-[hsl(var(--primary))]">{completed.size} completed</span></div><div className="relative space-y-3"><div className="roadmap-line absolute left-[20px] top-5 h-[calc(100%-40px)] w-px opacity-35" />{roadmapSteps.map((step) => { const done = completed.has(step.id); const active = selected.id === step.id; return <div key={step.id} className={`relative flex gap-4 rounded-2xl border p-3 transition ${active ? 'border-[hsl(var(--primary)/.35)] bg-[hsl(var(--primary)/.06)]' : 'border-transparent hover:bg-[hsl(var(--muted)/.5)]'}`}><button type="button" data-testid={`button-roadmap-page-toggle-${step.id}`} onClick={() => onToggle(step)} className={`relative z-[1] mt-1 grid size-10 shrink-0 place-items-center rounded-full border-2 ${done ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]'}`}>{done ? <Check size={16} strokeWidth={3} /> : <span className="font-mono-custom text-[10px]">{step.phase}</span>}</button><button type="button" data-testid={`button-roadmap-page-select-${step.id}`} onClick={() => onSelect(step.id)} className="flex-1 text-left"><div className="flex flex-wrap items-start justify-between gap-2"><div><span className="font-mono-custom text-[9px] uppercase tracking-[.13em] text-[hsl(var(--primary))]">{step.type}</span><h3 className={`mt-1 text-sm font-bold ${done ? 'line-through opacity-50' : ''}`}>{step.title}</h3></div><span className="rounded-full bg-[hsl(var(--muted))] px-2 py-1 font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">{step.time}</span></div><p className="mt-2 max-w-lg text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">{step.description}</p></button></div>; })}</div></section>
        <section className="rounded-2xl bg-[hsl(var(--secondary))] p-6 text-[hsl(var(--secondary-foreground))]"><div className="mb-8 flex items-center justify-between"><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--secondary-foreground)/.54)]">Selected move</div><div className="grid size-8 place-items-center rounded-lg bg-[hsl(var(--accent)/.16)] text-[hsl(var(--accent))]"><Target size={15} /></div></div><div className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent))]">Phase {selected.phase} · {selected.type}</div><h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-.055em]">{selected.title}</h3><p className="mt-4 text-xs leading-relaxed text-[hsl(var(--secondary-foreground)/.62)]">{selected.description}</p><div className="mt-8 flex items-center gap-2 text-[11px] text-[hsl(var(--secondary-foreground)/.5)]"><Circle size={12} /> Suggested time: {selected.time}</div><button type="button" data-testid="button-complete-selected" onClick={onCompleteNext} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-4 py-3 text-xs font-bold text-[hsl(var(--foreground))] transition hover:-translate-y-0.5">{completed.has(selected.id) ? <Check size={15} /> : <CheckCircle2 size={15} />} {completed.has(selected.id) ? 'Completed — nice work' : 'Mark this move complete'}</button></section>
      </div>
    </div>
  );
}

function AchievementsView({ onPractice }: { onPractice: () => void }) {
  return (
    <div className="page-enter space-y-6">
      <div><div className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[hsl(var(--primary))]">Proof, not promises · 08 unlocked</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-.06em]">A record of showing up.</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">The moments that make your progress visible, even on the days it feels slow.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">{achievements.map(({ id, title, detail, date, icon: Icon, tint }, index) => { const tintVar = tint === 'coral' ? 'var(--accent)' : tint === 'teal' ? 'var(--primary)' : 'var(--chart-3)'; return <div key={id} data-testid={`card-achievement-${id}`} className="paper-card interactive-card rounded-2xl p-5"><div className="flex items-start justify-between"><div className="grid size-12 place-items-center rounded-2xl" style={{ backgroundColor: `hsl(${tintVar} / .14)`, color: `hsl(${tintVar})` }}><Icon size={22} /></div><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">0{index + 1}</span></div><h3 className="mt-8 text-sm font-bold">{title}</h3><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">{detail}</p><div className="mt-6 border-t border-[hsl(var(--border))] pt-3 font-mono-custom text-[9px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">{date}</div></div>; })}</div>
      <section className="relative overflow-hidden rounded-2xl bg-[hsl(var(--accent))] p-6 sm:p-8"><div className="absolute -right-10 -top-20 size-64 rounded-full border-[34px] border-[hsl(var(--foreground)/.08)]" /><div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--foreground)/.62)]">Next unlock</div><h3 className="mt-2 max-w-lg font-display text-2xl font-bold leading-tight tracking-[-.06em]">The next receipt is one focused session away.</h3><p className="mt-3 max-w-md text-xs leading-relaxed text-[hsl(var(--foreground)/.67)]">Complete a system design loop to unlock “Trade-off thinker”.</p></div><button type="button" data-testid="button-achievement-practice" onClick={onPractice} className="relative flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--secondary))] px-4 py-3 text-xs font-bold text-[hsl(var(--secondary-foreground))] transition hover:-translate-y-0.5"><Play size={13} fill="currentColor" /> Practice now</button></div></section>
    </div>
  );
}

function Overview({ score, checkedIn, completed, selectedSkill, selectedRoadmapId, onCheckIn, onSkillSelect, onRoadmapSelect, onRoadmapToggle, onViewRoadmap, onViewAchievements }: { score: number; checkedIn: boolean; completed: Set<string>; selectedSkill: Skill | undefined; selectedRoadmapId: string; onCheckIn: () => void; onSkillSelect: (skill: Skill) => void; onRoadmapSelect: (id: string) => void; onRoadmapToggle: (step: RoadmapStep) => void; onViewRoadmap: () => void; onViewAchievements: () => void }) {
  return (
    <div className="page-enter space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><ScoreCard score={score} checkedIn={checkedIn} onCheckIn={onCheckIn} /><ProgressStrip checkedIn={checkedIn} completedCount={completed.size} onCheckIn={onCheckIn} /></div>
      <div className="flex items-end justify-between gap-3"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">The signal board</div><h2 className="mt-1 font-display text-xl font-bold tracking-[-.05em]">Your active skills</h2></div><button type="button" data-testid="button-view-all-skills" onClick={() => onSkillSelect(skills[0])} className="hidden items-center gap-1 text-[11px] font-bold text-[hsl(var(--primary))] sm:flex">View all skills <ArrowUpRight size={14} /></button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{skills.map((skill, index) => <div key={skill.id} className={`page-enter stagger-${index + 1}`}><SkillCard skill={skill} selected={selectedSkill?.id === skill.id} onSelect={() => onSkillSelect(skill)} /></div>)}</div>
      <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]"><SkillGapChart selectedSkill={selectedSkill} /><RoadmapCard completed={completed} selectedId={selectedRoadmapId} onSelect={(id) => id === 'full' ? onViewRoadmap() : onRoadmapSelect(id)} onToggle={onRoadmapToggle} /></div>
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><AchievementsCard onViewAll={onViewAchievements} /><section className="paper-card rounded-2xl p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Focus forecast</div><h2 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">What moves the needle</h2></div><div className="grid size-8 place-items-center rounded-lg bg-[hsl(var(--primary)/.11)] text-[hsl(var(--primary))]"><Gauge size={16} /></div></div><div className="flex items-center gap-4"><div className="grid size-14 place-items-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Code2 size={23} /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2 text-xs font-bold"><span>System design</span><span className="font-mono-custom text-[10px] text-[hsl(var(--primary))]">+21 pts gap</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="bar-fill h-full w-[54%] rounded-full bg-[hsl(var(--primary))]" /></div><p className="mt-2 text-[10px] text-[hsl(var(--muted-foreground))]">Highest-impact skill for your target roles.</p></div><button type="button" data-testid="button-focus-system-design" onClick={() => onSkillSelect(skills[3])} className="grid size-8 shrink-0 place-items-center rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--primary)/.4)] hover:text-[hsl(var(--primary))]"><ChevronRight size={15} /></button></div></section></div>
    </div>
  );
}

function Dashboard() {
  const [active, setActive] = useState<Section>('Overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set(['portfolio']));
  const [selectedSkillId, setSelectedSkillId] = useState('frontend');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('algorithms');
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedSkill = useMemo(() => skills.find((skill) => skill.id === selectedSkillId), [selectedSkillId]);
  const score = Math.min(98, 74 + completed.size * 2 + (checkedIn ? 1 : 0));

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2700);
  };
  const handleCheckIn = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      showFeedback('Daily pulse logged. That consistency compounds.');
    } else {
      showFeedback('You already logged today — protect the streak.');
    }
  };
  const handleToggle = (step: RoadmapStep) => {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(step.id)) {
        next.delete(step.id);
        showFeedback(`${step.title} moved back to your active queue.`);
      } else {
        next.add(step.id);
        showFeedback(`${step.title} complete. One more receipt for your profile.`);
      }
      return next;
    });
  };
  const handlePractice = () => {
    setCheckedIn(true);
    showFeedback('Practice loop started. Twenty focused minutes is enough.');
  };
  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkillId(skill.id);
    showFeedback(`${skill.name} selected. Your next best rep is ready.`);
  };
  const handleChange = (section: Section) => {
    setActive(section);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell flex">
      <Sidebar active={active} onChange={handleChange} />
      <main className="dashboard-main min-w-0 flex-1">
        <Header active={active} onMenu={() => setMenuOpen((open) => !open)} />
        <MobileNav active={active} onChange={handleChange} />
        <div className="relative z-[1] mx-auto max-w-[1440px] px-4 pb-10 sm:px-7 lg:px-10">
          {active === 'Overview' && <Overview score={score} checkedIn={checkedIn} completed={completed} selectedSkill={selectedSkill} selectedRoadmapId={selectedRoadmapId} onCheckIn={handleCheckIn} onSkillSelect={handleSkillSelect} onRoadmapSelect={setSelectedRoadmapId} onRoadmapToggle={handleToggle} onViewRoadmap={() => handleChange('Roadmap')} onViewAchievements={() => handleChange('Achievements')} />}
          {active === 'My Skills' && <SkillsView selectedSkill={selectedSkill} onSelect={handleSkillSelect} onPractice={handlePractice} />}
          {active === 'Roadmap' && <RoadmapView completed={completed} selectedId={selectedRoadmapId} onSelect={setSelectedRoadmapId} onToggle={handleToggle} onCompleteNext={() => handleToggle(roadmapSteps.find((step) => step.id === selectedRoadmapId) ?? roadmapSteps[0])} />}
          {active === 'Achievements' && <AchievementsView onPractice={handlePractice} />}
        </div>
        {menuOpen && <div className="fixed inset-0 z-20 bg-[hsl(var(--foreground)/.18)] md:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true"><div className="absolute right-4 top-16 w-52 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-lift)]" onClick={(event) => event.stopPropagation()}><div className="mb-2 flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Quick switch <button type="button" data-testid="button-close-menu" onClick={() => setMenuOpen(false)}><X size={14} /></button></div>{navItems.map(({ label, icon: Icon }) => <button key={label} type="button" data-testid={`button-menu-${label.toLowerCase().replace(' ', '-')}`} onClick={() => handleChange(label)} className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-xs font-bold ${active === label ? 'bg-[hsl(var(--muted))]' : ''}`}><Icon size={15} />{label}</button>)}</div></div>}
        {feedback && <div data-testid="status-feedback" className="toast-pop fixed bottom-5 left-1/2 z-30 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-xl bg-[hsl(var(--secondary))] px-4 py-3 text-[11px] font-bold text-[hsl(var(--secondary-foreground))] shadow-[0_14px_30px_rgba(34,44,67,.2)]"><CheckCircle2 size={16} className="shrink-0 text-[hsl(var(--accent))]" />{feedback}</div>}
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;