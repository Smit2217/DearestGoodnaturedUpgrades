import { type ReactNode, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Compass,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Flame,
  Gauge,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  Map as MapIcon,
  MapPin,
  Mail,
  Menu,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  X,
  Zap,
  LogOut,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Section = 'Dashboard' | 'Profile' | 'Skills' | 'Career' | 'Roadmap' | 'Achievements';

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
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Profile', icon: UserRound },
  { label: 'Skills', icon: Gauge, count: '06' },
  { label: 'Career', icon: BriefcaseBusiness },
  { label: 'Roadmap', icon: MapIcon, count: '04' },
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
        <button type="button" data-testid="button-profile" onClick={() => onChange('Profile')} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[hsl(var(--sidebar-accent))]">
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
  const intro = active === 'Dashboard' ? 'Good morning, Aarav.' : active === 'Profile' ? 'Your profile, in focus.' : active === 'Skills' ? 'Your skill profile.' : active === 'Career' ? 'The role you are building toward.' : active === 'Roadmap' ? 'The route to your offer.' : 'Receipts for your progress.';
  const subline = active === 'Dashboard' ? 'Here is the clearest next move for your career.' : active === 'Profile' ? 'Make your strengths easy for the right people to find.' : active === 'Skills' ? 'Small gains compound into a profile recruiters remember.' : active === 'Career' ? 'Translate your progress into a direction that feels like yours.' : active === 'Roadmap' ? 'A focused plan, tuned to where you are right now.' : 'Every finished rep is evidence that you are ready.';
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

function ProfileView({ onFeedback, onSignOut }: { onFeedback: (message: string) => void; onSignOut: () => void }) {
  const [editing, setEditing] = useState(false);
  const profileFields = [
    { label: 'Email', value: 'aarav.mehta@university.edu', icon: Mail },
    { label: 'Location', value: 'Bengaluru, India', icon: MapPin },
    { label: 'Graduation', value: 'May 2026 · Computer Science', icon: GraduationCap },
  ];

  const handleProfileAction = () => {
    if (editing) {
      setEditing(false);
      onFeedback('Profile saved. Your story is ready to share.');
    } else {
      setEditing(true);
    }
  };

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[hsl(var(--primary))]">Student identity · 92% complete</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.06em]">Make your profile memorable.</h2>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">A clear profile gives your progress context and helps mentors, recruiters, and opportunities find you.</p>
        </div>
        <button type="button" data-testid="button-edit-profile" onClick={handleProfileAction} className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--secondary))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--secondary-foreground))] transition hover:-translate-y-0.5">
          {editing ? <Check size={15} /> : <Pencil size={15} />} {editing ? 'Save profile' : 'Edit profile'}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="paper-card overflow-hidden rounded-2xl">
          <div className="relative overflow-hidden bg-[hsl(var(--secondary))] p-6 text-[hsl(var(--secondary-foreground))] sm:p-8">
            <div className="absolute -right-16 -top-24 size-64 rounded-full border-[28px] border-[hsl(var(--sidebar-primary)/.08)]" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid size-20 shrink-0 place-items-center rounded-[1.6rem] bg-[hsl(var(--accent))] font-display text-2xl font-bold text-[hsl(var(--foreground))] shadow-[0_12px_28px_rgba(239,132,108,.25)]">AM</div>
              <div>
                <div className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary-foreground)/.58)]">Profile / 03</div>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-[-.06em]">Aarav Mehta</h3>
                <p className="mt-1 text-xs text-[hsl(var(--secondary-foreground)/.62)]">Computer Science · Year 3 · Builder at heart</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
            {profileFields.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl bg-[hsl(var(--muted)/.55)] p-3.5">
                <Icon size={15} className="text-[hsl(var(--primary))]" />
                <div className="mt-3 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{label}</div>
                <div className="mt-1 text-[11px] font-bold leading-relaxed">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="paper-card rounded-2xl p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Profile signal</div>
              <h3 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">Profile strength</h3>
            </div>
            <div className="font-display text-2xl font-bold text-[hsl(var(--primary))]">92<span className="text-sm">%</span></div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="bar-fill h-full w-[92%] rounded-full bg-[hsl(var(--primary))]" /></div>
          <div className="mt-5 space-y-3">
            {[
              ['Career direction', 'Clear', true],
              ['Project proof', 'Strong', true],
              ['Introduction video', 'Add one', false],
            ].map(([label, status, done]) => (
              <div key={label as string} className="flex items-center gap-3 text-[11px]">
                <div className={`grid size-6 place-items-center rounded-full ${done ? 'bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))]' : 'bg-[hsl(var(--accent)/.14)] text-[hsl(var(--accent-foreground))]'}`}>{done ? <Check size={13} /> : <Plus size={13} />}</div>
                <span className="flex-1 font-semibold">{label as string}</span>
                <span className="font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">{status as string}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="paper-card rounded-2xl p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Your context</div>
              <h3 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">What drives you</h3>
            </div>
            <FileText size={18} className="text-[hsl(var(--primary))]" />
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">I like turning messy, real-world problems into thoughtful products. Right now I am exploring frontend systems, developer tools, and the space where design meets engineering.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Product building', 'Design systems', 'Open source', 'Public speaking'].map((interest) => <span key={interest} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted)/.45)] px-3 py-1.5 text-[10px] font-bold">{interest}</span>)}
          </div>
        </section>
        <section className="rounded-2xl bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))] sm:p-6">
          <div className="flex items-start justify-between">
            <div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary-foreground)/.65)]">Visibility</div>
            <Globe2 size={17} />
          </div>
          <h3 className="mt-7 max-w-sm font-display text-xl font-bold leading-tight tracking-[-.05em]">Your profile is visible to your campus talent network.</h3>
          <p className="mt-3 text-xs leading-relaxed text-[hsl(var(--primary-foreground)/.68)]">Keep your latest project and strongest skill signals up to date before your next mentor review.</p>
          <button type="button" onClick={() => onFeedback('Share link copied to your clipboard.')} className="mt-6 flex items-center gap-2 rounded-xl bg-[hsl(var(--card))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--foreground))] transition hover:-translate-y-0.5">Share profile <ArrowRight size={14} /></button>
        </section>
      </div>

      <button type="button" data-testid="button-sign-out" onClick={onSignOut} className="flex items-center gap-2 text-[11px] font-bold text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--destructive))]"><LogOut size={14} /> Sign out of this demo</button>
    </div>
  );
}

function CareerView({ onFeedback }: { onFeedback: (message: string) => void }) {
  const roles = [
    { title: 'Frontend Engineer', company: 'Product teams', match: 86, detail: 'Your strongest current fit', color: 'var(--accent)', icon: Code2, demand: 'High demand', location: 'Remote friendly', reason: 'Your React foundation and product-building proof are already working together.' },
    { title: 'Product Engineer', company: 'Early-stage startups', match: 78, detail: 'A stretch with upside', color: 'var(--primary)', icon: Sparkles, demand: 'Growing fast', location: 'Bengaluru · Hybrid', reason: 'Build system design depth and this becomes your most differentiated lane.' },
    { title: 'UX Engineer', company: 'Design-led companies', match: 71, detail: 'A creative alternative', color: 'var(--chart-3)', icon: Compass, demand: 'Steady demand', location: 'Global teams', reason: 'Your communication and interface instincts give you a strong starting signal.' },
  ];
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  return (
    <div className="page-enter space-y-6">
      <div>
        <div className="font-mono-custom text-[10px] uppercase tracking-[.17em] text-[hsl(var(--primary))]">Career compass · 03 paths in view</div>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.06em]">Turn progress into direction.</h2>
        <p className="mt-2 max-w-xl text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Career clarity is not a single job title. Explore the paths where your current evidence gives you a head start.</p>
      </div>

      <section className="relative overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] p-6 text-[hsl(var(--secondary-foreground))] sm:p-8">
        <div className="absolute -right-16 -top-20 size-64 rounded-full border-[30px] border-[hsl(var(--sidebar-primary)/.08)]" />
        <div className="relative grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--secondary-foreground)/.57)]"><BriefcaseBusiness size={13} className="text-[hsl(var(--accent))]" /> Best current match</div>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-[-.07em]">{selectedRole.title}</h3>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-[hsl(var(--secondary-foreground)/.62)]">{selectedRole.reason}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--secondary-foreground)/.1)] px-3 py-1.5 text-[10px]"><Building2 size={12} /> {selectedRole.company}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--secondary-foreground)/.1)] px-3 py-1.5 text-[10px]"><Globe2 size={12} /> {selectedRole.location}</span>
            </div>
          </div>
          <div className="flex items-end gap-5 lg:justify-end">
            <div className="grid size-28 place-items-center rounded-full border-[10px] border-[hsl(var(--accent))] bg-[hsl(var(--sidebar))] text-center">
              <div><div className="font-display text-3xl font-bold">{selectedRole.match}</div><div className="font-mono-custom text-[9px] uppercase tracking-widest text-[hsl(var(--secondary-foreground)/.45)]">fit score</div></div>
            </div>
            <div className="pb-1"><div className="font-mono-custom text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent))]">{selectedRole.detail}</div><p className="mt-2 max-w-[150px] text-[11px] leading-relaxed text-[hsl(var(--secondary-foreground)/.55)]">Based on your skill signals, proof of work, and goals.</p></div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const selected = role.title === selectedRole.title;
          return (
            <button key={role.title} type="button" onClick={() => { setSelectedRole(role); onFeedback(`${role.title} selected. Your fit story is updated.`); }} className={`interactive-card paper-card rounded-2xl p-5 text-left ${selected ? 'border-[hsl(var(--primary)/.5)] ring-2 ring-[hsl(var(--primary)/.12)]' : ''}`}>
              <div className="flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl" style={{ backgroundColor: `hsl(${role.color} / .14)`, color: `hsl(${role.color})` }}><Icon size={18} /></div><ArrowUpRight size={16} className="text-[hsl(var(--muted-foreground))]" /></div>
              <div className="mt-7 text-sm font-bold">{role.title}</div>
              <div className="mt-1 text-[10px] text-[hsl(var(--muted-foreground))]">{role.company}</div>
              <div className="mt-5 flex items-end justify-between"><span className="font-mono-custom text-[10px] text-[hsl(var(--muted-foreground))]">{role.demand}</span><span className="font-display text-2xl font-bold" style={{ color: `hsl(${role.color})` }}>{role.match}%</span></div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="bar-fill h-full rounded-full" style={{ width: `${role.match}%`, backgroundColor: `hsl(${role.color})` }} /></div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <section className="paper-card rounded-2xl p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]"><Target size={13} className="text-[hsl(var(--primary))]" /> Readiness snapshot</div>
          <div className="space-y-4">
            {[['Technical foundation', 82, 'Strong'], ['Portfolio evidence', 76, 'On track'], ['Interview confidence', 61, 'Build next']].map(([label, value, status]) => <div key={label as string}><div className="mb-2 flex justify-between text-[11px]"><span className="font-semibold">{label as string}</span><span className="font-mono-custom text-[9px] text-[hsl(var(--muted-foreground))]">{status as string}</span></div><div className="h-2 rounded-full bg-[hsl(var(--muted))]"><div className="bar-fill h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${value}%` }} /></div></div>)}
          </div>
        </section>
        <section className="paper-card rounded-2xl p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Next career signal</div><h3 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">One action that increases your odds</h3></div><CalendarDays size={18} className="text-[hsl(var(--accent))]" /></div>
          <div className="flex items-start gap-4 rounded-xl bg-[hsl(var(--muted)/.55)] p-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[hsl(var(--accent)/.16)] text-[hsl(var(--accent-foreground))]"><FileText size={17} /></div><div><div className="text-xs font-bold">Publish the CampusCart case study</div><p className="mt-1 text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">Recruiters need to see how you think, not only what you shipped. Connect the problem, trade-offs, and measurable outcome.</p><button type="button" onClick={() => onFeedback('Career action added to your roadmap.')} className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[hsl(var(--primary))]">Add to roadmap <ArrowRight size={13} /></button></div></div>
        </section>
      </div>
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

function Overview({ score, checkedIn, completed, selectedSkill, selectedRoadmapId, onCheckIn, onSkillSelect, onRoadmapSelect, onRoadmapToggle, onViewSkills, onViewRoadmap, onViewAchievements }: { score: number; checkedIn: boolean; completed: Set<string>; selectedSkill: Skill | undefined; selectedRoadmapId: string; onCheckIn: () => void; onSkillSelect: (skill: Skill) => void; onRoadmapSelect: (id: string) => void; onRoadmapToggle: (step: RoadmapStep) => void; onViewSkills: () => void; onViewRoadmap: () => void; onViewAchievements: () => void }) {
  return (
    <div className="page-enter space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><ScoreCard score={score} checkedIn={checkedIn} onCheckIn={onCheckIn} /><ProgressStrip checkedIn={checkedIn} completedCount={completed.size} onCheckIn={onCheckIn} /></div>
       <div className="flex items-end justify-between gap-3"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">The signal board</div><h2 className="mt-1 font-display text-xl font-bold tracking-[-.05em]">Your active skills</h2></div><button type="button" data-testid="button-view-all-skills" onClick={onViewSkills} className="hidden items-center gap-1 text-[11px] font-bold text-[hsl(var(--primary))] sm:flex">View all skills <ArrowUpRight size={14} /></button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{skills.map((skill, index) => <div key={skill.id} className={`page-enter stagger-${index + 1}`}><SkillCard skill={skill} selected={selectedSkill?.id === skill.id} onSelect={() => onSkillSelect(skill)} /></div>)}</div>
      <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]"><SkillGapChart selectedSkill={selectedSkill} /><RoadmapCard completed={completed} selectedId={selectedRoadmapId} onSelect={(id) => id === 'full' ? onViewRoadmap() : onRoadmapSelect(id)} onToggle={onRoadmapToggle} /></div>
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><AchievementsCard onViewAll={onViewAchievements} /><section className="paper-card rounded-2xl p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Focus forecast</div><h2 className="mt-1 font-display text-lg font-bold tracking-[-.04em]">What moves the needle</h2></div><div className="grid size-8 place-items-center rounded-lg bg-[hsl(var(--primary)/.11)] text-[hsl(var(--primary))]"><Gauge size={16} /></div></div><div className="flex items-center gap-4"><div className="grid size-14 place-items-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Code2 size={23} /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2 text-xs font-bold"><span>System design</span><span className="font-mono-custom text-[10px] text-[hsl(var(--primary))]">+21 pts gap</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="bar-fill h-full w-[54%] rounded-full bg-[hsl(var(--primary))]" /></div><p className="mt-2 text-[10px] text-[hsl(var(--muted-foreground))]">Highest-impact skill for your target roles.</p></div><button type="button" data-testid="button-focus-system-design" onClick={() => onSkillSelect(skills[3])} className="grid size-8 shrink-0 place-items-center rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--primary)/.4)] hover:text-[hsl(var(--primary))]"><ChevronRight size={15} /></button></div></section></div>
    </div>
  );
}

function LoginScreen() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] p-4 sm:p-6 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100dvh-32px)] max-w-[1280px] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-lift)] lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative hidden overflow-hidden bg-[hsl(var(--secondary))] p-8 text-[hsl(var(--secondary-foreground))] lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="absolute -right-28 -top-28 size-[28rem] rounded-full border-[42px] border-[hsl(var(--sidebar-primary)/.08)]" />
          <div className="absolute -bottom-28 -left-28 size-[24rem] rounded-full border-[32px] border-[hsl(var(--accent)/.08)]" />
          <div className="relative flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] shadow-[0_8px_18px_rgba(239,132,108,.24)]"><Zap size={19} strokeWidth={2.6} /></div>
            <div><div className="font-display text-lg font-bold tracking-[-.04em]">SkillTrack<span className="text-[hsl(var(--sidebar-primary))]">.ai</span></div><div className="font-mono-custom mt-0.5 text-[9px] uppercase tracking-[.18em] text-[hsl(var(--sidebar-foreground)/.52)]">Career command center</div></div>
          </div>
          <div className="relative max-w-lg">
            <div className="mb-5 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--sidebar-primary))]"><Sparkles size={14} /> Built for your next chapter</div>
            <h1 className="font-display text-5xl font-bold leading-[.98] tracking-[-.075em] xl:text-6xl">Turn your potential into <span className="text-[hsl(var(--accent))]">proof.</span></h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[hsl(var(--secondary-foreground)/.6)]">A personal career readiness system that makes your skills visible, your gaps actionable, and your next move clear.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {['Know your signal', 'Build with intent', 'Show your work'].map((label) => <div key={label} className="flex items-center gap-2 rounded-full bg-[hsl(var(--secondary-foreground)/.08)] px-3 py-2 text-[10px] font-bold"><CheckCircle2 size={13} className="text-[hsl(var(--accent))]" /> {label}</div>)}
            </div>
          </div>
          <div className="relative flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[hsl(var(--secondary-foreground)/.42)]"><ShieldCheck size={14} /> Your progress, your pace, your signal.</div>
        </section>

        <section className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="grid size-10 place-items-center rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"><Zap size={19} /></div>
            <div><div className="font-display text-lg font-bold tracking-[-.04em]">SkillTrack<span className="text-[hsl(var(--primary))]">.ai</span></div><div className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Career command center</div></div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8"><div className="mb-3 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--primary))]">Welcome back · Student portal</div><h2 className="font-display text-3xl font-bold tracking-[-.065em] sm:text-4xl">Your next move starts here.</h2><p className="mt-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Sign in to continue building your career signal.</p></div>
            <form onSubmit={(event) => { event.preventDefault(); navigate('/'); }} className="space-y-4">
              <label className="block"><span className="mb-2 block text-[11px] font-bold">University email</span><div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" /><input data-testid="input-login-email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@university.edu" className="h-12 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/.35)] pl-10 pr-4 text-xs outline-none transition placeholder:text-[hsl(var(--muted-foreground)/.65)] focus:border-[hsl(var(--primary))] focus:ring-4 focus:ring-[hsl(var(--primary)/.1)]" required /></div></label>
              <label className="block"><span className="mb-2 block text-[11px] font-bold">Password</span><div className="relative"><LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" /><input data-testid="input-login-password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="h-12 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/.35)] pl-10 pr-11 text-xs outline-none transition placeholder:text-[hsl(var(--muted-foreground)/.65)] focus:border-[hsl(var(--primary))] focus:ring-4 focus:ring-[hsl(var(--primary)/.1)]" required /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--foreground))]" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
              <div className="flex items-center justify-between pt-1"><label className="flex items-center gap-2 text-[10px] text-[hsl(var(--muted-foreground))]"><input type="checkbox" className="accent-[hsl(var(--primary))]" /> Keep me signed in</label><button type="button" onClick={() => window.alert('Password reset link requested.')} className="text-[10px] font-bold text-[hsl(var(--primary))] hover:underline">Forgot password?</button></div>
              <button data-testid="button-login-submit" type="submit" className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--secondary))] text-xs font-bold text-[hsl(var(--secondary-foreground))] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(34,44,67,.16)]">Sign in to SkillTrack <ArrowRight size={15} /></button>
            </form>
            <div className="my-7 flex items-center gap-3"><div className="h-px flex-1 bg-[hsl(var(--border))]" /><span className="font-mono-custom text-[9px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">or</span><div className="h-px flex-1 bg-[hsl(var(--border))]" /></div>
            <button type="button" data-testid="button-demo-login" onClick={() => navigate('/')} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-xs font-bold transition hover:border-[hsl(var(--primary)/.45)] hover:bg-[hsl(var(--muted)/.55)]"><GraduationCap size={15} className="text-[hsl(var(--primary))]" /> Explore the demo profile</button>
            <p className="mt-7 text-center text-[10px] leading-relaxed text-[hsl(var(--muted-foreground))]">By continuing, you agree to SkillTrack&apos;s student community guidelines.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Dashboard() {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set(['portfolio']));
  const [selectedSkillId, setSelectedSkillId] = useState('frontend');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('algorithms');
  const [feedback, setFeedback] = useState<string | null>(null);

  const sectionPaths: Record<Section, string> = {
    Dashboard: '/',
    Profile: '/profile',
    Skills: '/skills',
    Career: '/career',
    Roadmap: '/roadmap',
    Achievements: '/achievements',
  };
  const active = Object.entries(sectionPaths).find(([, path]) => path === location)?.[0] as Section | undefined ?? 'Dashboard';
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
    setMenuOpen(false);
    navigate(sectionPaths[section]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleSignOut = () => navigate('/login');

  return (
    <div className="app-shell flex">
      <Sidebar active={active} onChange={handleChange} />
      <main className="dashboard-main min-w-0 flex-1">
        <Header active={active} onMenu={() => setMenuOpen((open) => !open)} />
        <MobileNav active={active} onChange={handleChange} />
        <div className="relative z-[1] mx-auto max-w-[1440px] px-4 pb-10 sm:px-7 lg:px-10">
          {active === 'Dashboard' && <Overview score={score} checkedIn={checkedIn} completed={completed} selectedSkill={selectedSkill} selectedRoadmapId={selectedRoadmapId} onCheckIn={handleCheckIn} onSkillSelect={handleSkillSelect} onRoadmapSelect={setSelectedRoadmapId} onRoadmapToggle={handleToggle} onViewSkills={() => handleChange('Skills')} onViewRoadmap={() => handleChange('Roadmap')} onViewAchievements={() => handleChange('Achievements')} />}
          {active === 'Profile' && <ProfileView onFeedback={showFeedback} onSignOut={handleSignOut} />}
          {active === 'Skills' && <SkillsView selectedSkill={selectedSkill} onSelect={handleSkillSelect} onPractice={handlePractice} />}
          {active === 'Career' && <CareerView onFeedback={showFeedback} />}
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
        <Route path="/login" component={LoginScreen} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Dashboard} />
        <Route path="/skills" component={Dashboard} />
        <Route path="/career" component={Dashboard} />
        <Route path="/roadmap" component={Dashboard} />
        <Route path="/achievements" component={Dashboard} />
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