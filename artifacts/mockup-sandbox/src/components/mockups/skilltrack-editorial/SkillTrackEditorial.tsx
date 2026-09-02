import { useState } from 'react';
import {
  ArrowRight,
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
  FileText,
  Flame,
  Gauge,
  Lightbulb,
  Map as MapIcon,
  Menu,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react';
import './SkillTrackEditorial.css';

type Section = 'Dashboard' | 'Profile' | 'Skills' | 'Career' | 'Roadmap' | 'Achievements';
type IconType = typeof Code2;
type Skill = { id: string; name: string; group: string; score: number; target: number; trend: string; color: string; icon: IconType; note: string };
type RoadmapStep = { id: string; phase: string; title: string; description: string; time: string; type: string };

const navItems: { label: Section; icon: IconType; count?: string }[] = [
  { label: 'Dashboard', icon: Gauge },
  { label: 'Profile', icon: UserRound },
  { label: 'Skills', icon: Code2, count: '06' },
  { label: 'Career', icon: BriefcaseBusiness },
  { label: 'Roadmap', icon: MapIcon, count: '04' },
];

const skills: Skill[] = [
  { id: 'frontend', name: 'Frontend development', group: 'Technical', score: 82, target: 90, trend: '+8 this month', color: '#c8735d', icon: Code2, note: 'Strong React foundation. Sharpen accessibility and performance patterns next.' },
  { id: 'problem-solving', name: 'Problem solving', group: 'Technical', score: 76, target: 85, trend: '+12 this month', color: '#5796a0', icon: Lightbulb, note: 'Your consistency is showing. Two timed graph sessions will close the gap.' },
  { id: 'communication', name: 'Communication', group: 'Professional', score: 68, target: 82, trend: '+5 this month', color: '#e2a849', icon: Users, note: 'Your ideas are clear in writing. Practice a tighter 60-second verbal pitch.' },
  { id: 'system-design', name: 'System design', group: 'Technical', score: 54, target: 75, trend: '+9 this month', color: '#8585a8', icon: Compass, note: 'The biggest opportunity in your profile. Start with queues, caching, and trade-offs.' },
];

const roadmapSteps: RoadmapStep[] = [
  { id: 'portfolio', phase: '01', title: 'Ship your proof of work', description: 'Polish the CampusCart case study and publish a crisp project README.', time: 'This week', type: 'Build' },
  { id: 'algorithms', phase: '02', title: 'Build interview momentum', description: 'Complete 3 medium graph problems and review your mistake log.', time: 'Next 10 days', type: 'Practice' },
  { id: 'pitch', phase: '03', title: 'Tell your story clearly', description: 'Record a 60-second introduction that connects your projects to impact.', time: '18 Jun', type: 'Prepare' },
  { id: 'mock', phase: '04', title: 'Run a realistic mock', description: 'Schedule one peer interview and turn the feedback into action items.', time: '24 Jun', type: 'Connect' },
];

const wins = [
  { title: '7 day focus streak', detail: 'Practiced consistently', date: 'Today', icon: Flame, color: '#c8735d' },
  { title: 'Project shipped', detail: 'CampusCart v1.0', date: '2 days ago', icon: BriefcaseBusiness, color: '#5796a0' },
  { title: 'Problem solver', detail: '50 challenges completed', date: '6 days ago', icon: ShieldCheck, color: '#e2a849' },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="editorial-brand">
      <div className="editorial-mark"><Zap size={17} strokeWidth={2.7} /></div>
      {!compact && <div><div className="editorial-brand-name">SkillTrack<em>.ai</em></div><div className="editorial-brand-sub editorial-mono">Career field notes</div></div>}
    </div>
  );
}

function Nav({ active, onChange }: { active: Section; onChange: (section: Section) => void }) {
  return <nav className="editorial-nav" aria-label="Primary navigation">
    {navItems.map(({ label, icon: Icon, count }) => (
      <button type="button" key={label} className={active === label ? 'active' : ''} onClick={() => onChange(label)}>
        <span className="editorial-nav-label"><Icon size={16} strokeWidth={1.8} />{label}</span>
        {count && <span className="editorial-nav-count">{count}</span>}
      </button>
    ))}
    <button type="button" className={active === 'Achievements' ? 'active' : ''} onClick={() => onChange('Achievements')}>
      <span className="editorial-nav-label"><Trophy size={16} strokeWidth={1.8} />Achievements</span>
      <span className="editorial-nav-count">08</span>
    </button>
  </nav>;
}

function Sidebar({ active, onChange }: { active: Section; onChange: (section: Section) => void }) {
  return <aside className="editorial-sidebar">
    <div>
      <Brand />
      <div className="editorial-kicker editorial-mono">Workspace</div>
      <Nav active={active} onChange={onChange} />
      <div className="editorial-signal">
        <div className="editorial-signal-head editorial-mono"><span>Your signal</span><span style={{ color: 'var(--saffron)' }}>+6.4%</span></div>
        <div className="editorial-signal-score"><strong>74</strong><span>/100</span></div>
        <div className="editorial-meter"><i style={{ width: '74%' }} /></div>
        <p>You are 11 points from the top quarter of your cohort.</p>
      </div>
    </div>
    <button type="button" className="editorial-account" onClick={() => onChange('Profile')}>
      <div className="editorial-avatar">AM</div>
      <div className="editorial-account-copy"><div className="editorial-account-name">Aarav Mehta</div><div className="editorial-account-meta">Computer Science · Year 3</div></div>
      <MoreHorizontal size={16} color="rgba(244,242,233,.45)" />
    </button>
  </aside>;
}

function Header({ active, onMenu, onNotice, onChange }: { active: Section; onMenu: () => void; onNotice: (message: string) => void; onChange: (section: Section) => void }) {
  const intro = active === 'Dashboard' ? 'Good morning, Aarav.' : active === 'Profile' ? 'Your profile, in focus.' : active === 'Skills' ? 'Your skill profile.' : active === 'Career' ? 'The role you are building toward.' : active === 'Roadmap' ? 'The route to your offer.' : 'Receipts for your progress.';
  const subline = active === 'Dashboard' ? 'Here is the clearest next move for your career.' : active === 'Profile' ? 'Make your strengths easy for the right people to find.' : active === 'Skills' ? 'Small gains compound into a profile recruiters remember.' : active === 'Career' ? 'Translate your progress into a direction that feels like yours.' : active === 'Roadmap' ? 'A focused plan, tuned to where you are right now.' : 'Every finished rep is evidence that you are ready.';
  return <header className="editorial-header">
    <div className="editorial-header-left">
      <button type="button" className="editorial-icon-button editorial-mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={17} /></button>
      <div><div className="editorial-date editorial-mono"><span style={{ marginRight: 7 }}>●</span> Tuesday, 11 June 2024</div><h1 className="editorial-display">{intro}</h1><p>{subline}</p></div>
    </div>
    <div className="editorial-header-actions">
      <button type="button" className="editorial-icon-button" onClick={() => onNotice('Search is ready for your next signal.')} aria-label="Search"><Search size={16} /></button>
      <button type="button" className="editorial-icon-button" onClick={() => onNotice('You have one new mentor note.')} aria-label="Notifications"><Bell size={16} /><span style={{ position: 'absolute', margin: '-22px 0 0 20px', width: 5, height: 5, borderRadius: '50%', background: 'var(--rust)' }} /></button>
      <div className="editorial-divider" />
      <button type="button" className="editorial-avatar editorial-header-avatar" onClick={() => onChange('Profile')} aria-label="Open profile">AM</button>
    </div>
  </header>;
}

function ScoreCard({ checkedIn, onCheckIn, score }: { checkedIn: boolean; onCheckIn: () => void; score: number }) {
  return <section className="editorial-dark-card editorial-score">
    <div className="editorial-score-top"><div><div className="editorial-label editorial-dark-label editorial-mono"><Sparkles size={12} /> Career readiness</div><div className="editorial-score-copy">You are building a <strong>credible</strong> profile.</div></div><button type="button" className="editorial-icon-button" style={{ background: 'rgba(244,242,233,.09)', border: 0, color: 'var(--cream)' }} onClick={onCheckIn} aria-label="Update readiness"><ArrowUpRight size={15} /></button></div>
    <div className="editorial-score-bottom">
      <div className="editorial-ring"><div className="editorial-ring-inner"><div className="editorial-ring-score">{score}<small>out of 100</small></div></div></div>
      <div className="editorial-score-meta"><div className="editorial-trend"><ArrowUpRight size={13} /> 6.4% <span style={{ color: 'rgba(244,242,233,.42)', fontWeight: 400 }}>vs last month</span></div><p>Top 31% of CS students in your cohort.</p><button type="button" className="editorial-action" style={{ marginTop: 13 }} onClick={onCheckIn}>{checkedIn ? <Check size={13} /> : <Flame size={13} />} {checkedIn ? 'Checked in' : 'Daily check-in'}</button></div>
    </div>
  </section>;
}

function WeeklyPulse({ checkedIn, completedCount, onCheckIn }: { checkedIn: boolean; completedCount: number; onCheckIn: () => void }) {
  const progress = Math.min(100, 47 + completedCount * 11 + (checkedIn ? 12 : 0));
  return <section className="editorial-card editorial-weekly">
    <div><div className="editorial-label editorial-mono"><BookOpen size={12} /> Weekly pulse</div><h2>Keep the signal warm.</h2><p>You have 3 focused sessions left to hit this week&apos;s goal.</p></div>
    <div className="editorial-weekly-bottom"><div className="editorial-progress-ring"><svg viewBox="0 0 36 36"><path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="var(--line)" strokeWidth="3.2" /><path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="var(--forest)" strokeWidth="3.2" strokeDasharray={`${progress}, 100`} strokeLinecap="round" /></svg><strong>{progress}%</strong></div><button type="button" className="editorial-action editorial-action-dark" onClick={onCheckIn}>{checkedIn ? <Check size={13} /> : <Zap size={13} />} {checkedIn ? 'Logged for today' : 'Start a session'}</button></div>
  </section>;
}

function SkillCard({ skill, selected, onSelect }: { skill: Skill; selected: boolean; onSelect: () => void }) {
  const Icon = skill.icon;
  return <button type="button" className={`editorial-skill ${selected ? 'selected' : ''}`} onClick={onSelect}>
    <div className="editorial-skill-top"><div className="editorial-skill-icon" style={{ background: `${skill.color}1c`, color: skill.color }}><Icon size={16} /></div><span className="editorial-skill-group editorial-mono">{skill.group}</span></div>
    <h3>{skill.name}</h3>
    <div className="editorial-skill-score"><strong>{skill.score}<span style={{ font: '500 13px "DM Sans"', letterSpacing: 0 }}>%</span></strong><span className="editorial-skill-trend" style={{ color: skill.color }}><ArrowUpRight size={11} /> {skill.trend}</span></div>
    <div className="editorial-bar"><i style={{ width: `${skill.score}%`, background: skill.color }} /></div><div className="editorial-bar-meta"><span>Current level</span><span>{skill.target - skill.score} pts to target</span></div><ChevronRight size={14} style={{ position: 'absolute', right: 13, bottom: 13, color: 'var(--ink-soft)' }} />
  </button>;
}

function GapChart({ selectedSkill }: { selectedSkill?: Skill }) {
  const data = [{ label: 'Technical', current: 78, target: 88, color: '#5796a0' }, { label: 'Problem solving', current: 76, target: 85, color: '#c8735d' }, { label: 'Communication', current: 68, target: 82, color: '#e2a849' }, { label: 'Leadership', current: 47, target: 70, color: '#8585a8' }];
  return <section className="editorial-card editorial-chart-card">
    <div className="editorial-section-head"><div><div className="editorial-label editorial-mono"><Target size={12} /> Signal analysis</div><h2 className="editorial-section-title">Your skill gap, at a glance</h2></div><button type="button" className="editorial-outline-button">This semester</button></div>
    <div className="editorial-legend"><span><i style={{ background: 'var(--forest)' }} /> Your level</span><span><i style={{ border: '1px solid var(--ink-soft)' }} /> Target level</span></div>
    <div className="editorial-chart-rows">{data.map((item) => <div className="editorial-chart-row" key={item.label}><div className="editorial-chart-label"><span>{item.label}</span><span>{item.current} / {item.target}</span></div><div className="editorial-chart-track"><i style={{ width: `${item.current}%`, background: item.color }} /><span className="editorial-target" style={{ left: `calc(${item.target}% - 7px)` }} /></div></div>)}</div>
    {selectedSkill && <div className="editorial-ai-note"><div className="editorial-ai-icon"><Lightbulb size={13} /></div><div><strong>AI read on {selectedSkill.name.toLowerCase()}</strong><p>{selectedSkill.note}</p></div></div>}
  </section>;
}

function RoadmapCard({ completed, selectedId, onToggle, onSelect, onView }: { completed: Set<string>; selectedId: string; onToggle: (step: RoadmapStep) => void; onSelect: (id: string) => void; onView: () => void }) {
  return <section className="editorial-card editorial-roadmap">
    <div className="editorial-section-head"><div><div className="editorial-label editorial-mono"><MapIcon size={12} /> Active roadmap</div><h2 className="editorial-section-title">Next best moves</h2></div><span className="editorial-mono" style={{ color: 'var(--rust)' }}>{completed.size}/4 done</span></div>
    <div className="editorial-roadmap-list">{roadmapSteps.slice(0, 3).map((step) => { const done = completed.has(step.id); return <div key={step.id} className={`editorial-roadmap-item ${selectedId === step.id ? 'active' : ''}`}><button type="button" className={`editorial-step ${done ? 'done' : ''}`} onClick={() => onToggle(step)} aria-label={done ? 'Reopen step' : 'Complete step'}>{done ? <Check size={13} strokeWidth={3} /> : step.phase}</button><button type="button" className="editorial-roadmap-copy" onClick={() => onSelect(step.id)}><header><h3 className={done ? 'done' : ''}>{step.title}</h3><span className="editorial-roadmap-time">{step.time}</span></header><p>{step.description}</p></button></div>; })}</div>
    <button type="button" className="editorial-roam-link editorial-link-button" onClick={onView}><span>View full roadmap</span><ArrowUpRight size={13} /></button>
  </section>;
}

function WinsCard({ onView }: { onView: () => void }) {
  return <section className="editorial-card editorial-card-pad"><div className="editorial-section-head"><div><div className="editorial-label editorial-mono"><Trophy size={12} /> Recent wins</div><h2 className="editorial-section-title">Momentum worth keeping</h2></div><button type="button" className="editorial-link-button" onClick={onView}>See all</button></div><div className="editorial-win-list">{wins.map(({ title, detail, date, icon: Icon, color }) => <div className="editorial-win" key={title}><div className="editorial-win-icon" style={{ color, background: `${color}1c` }}><Icon size={15} /></div><div className="editorial-win-copy"><strong>{title}</strong><span>{detail}</span></div><span className="editorial-win-date">{date}</span></div>)}</div></section>;
}

function FocusCard({ onFocus }: { onFocus: () => void }) {
  return <section className="editorial-dark-card editorial-focus"><div><div className="editorial-label editorial-dark-label editorial-mono"><Gauge size={12} /> Focus forecast</div><h2>What moves the needle</h2></div><div className="editorial-focus-row"><div className="editorial-focus-icon"><Code2 size={21} /></div><div className="editorial-focus-copy"><header><span>System design</span><span>+21 pts gap</span></header><div className="editorial-meter"><i style={{ width: '54%', background: 'var(--saffron)' }} /></div><p>Highest-impact skill for your target roles.</p></div><button type="button" className="editorial-icon-button" style={{ background: 'transparent', color: 'var(--cream)', borderColor: 'rgba(244,242,233,.22)' }} onClick={onFocus} aria-label="Open system design"><ChevronRight size={15} /></button></div></section>;
}

function DashboardPage({ selectedSkill, selectedId, completed, checkedIn, score, onSkill, onRoadmapSelect, onRoadmapToggle, onCheckIn, onView }: { selectedSkill?: Skill; selectedId: string; completed: Set<string>; checkedIn: boolean; score: number; onSkill: (skill: Skill) => void; onRoadmapSelect: (id: string) => void; onRoadmapToggle: (step: RoadmapStep) => void; onCheckIn: () => void; onView: (section: Section) => void }) {
  return <div className="editorial-page">
    <div className="editorial-row editorial-row-top"><ScoreCard score={score} checkedIn={checkedIn} onCheckIn={onCheckIn} /><WeeklyPulse checkedIn={checkedIn} completedCount={completed.size} onCheckIn={onCheckIn} /></div>
    <div className="editorial-board-head"><div><div className="editorial-label editorial-mono">The signal board</div><h2 className="editorial-board-title">Your active skills</h2></div><button type="button" className="editorial-link-button" onClick={() => onView('Skills')}>View all skills <ArrowUpRight size={13} /></button></div>
    <div className="editorial-skill-grid">{skills.map((skill) => <SkillCard key={skill.id} skill={skill} selected={selectedSkill?.id === skill.id} onSelect={() => onSkill(skill)} />)}</div>
    <div className="editorial-row editorial-row-mid" style={{ marginTop: 18 }}><GapChart selectedSkill={selectedSkill} /><RoadmapCard completed={completed} selectedId={selectedId} onSelect={onRoadmapSelect} onToggle={onRoadmapToggle} onView={() => onView('Roadmap')} /></div>
    <div className="editorial-row editorial-row-bottom" style={{ marginTop: 18 }}><WinsCard onView={() => onView('Achievements')} /><FocusCard onFocus={() => onSkill(skills[3])} /></div>
  </div>;
}

function DetailPage({ active, selectedSkill, onAction }: { active: Section; selectedSkill?: Skill; onAction: (message: string) => void }) {
  const title = active === 'Skills' ? 'Skills that tell your story.' : active === 'Profile' ? 'Make your profile memorable.' : active === 'Career' ? 'Turn progress into direction.' : active === 'Roadmap' ? 'A route with less noise.' : 'A record of showing up.';
  const label = active === 'Skills' ? 'Profile inventory · 12 signals' : active === 'Profile' ? 'Student identity · 92% complete' : active === 'Career' ? 'Career compass · 03 paths in view' : active === 'Roadmap' ? 'June · 4 focused moves' : 'Proof, not promises · 08 unlocked';
  return <div className="editorial-page">
    <div className="editorial-card editorial-card-pad" style={{ minHeight: 390 }}>
      <div className="editorial-label editorial-mono"><Sparkles size={12} /> {label}</div><h2 className="editorial-display" style={{ fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: .96, margin: '13px 0 0', maxWidth: 650 }}>{title}</h2>
      <p style={{ color: 'var(--ink-soft)', fontSize: 12, lineHeight: 1.6, maxWidth: 570, marginTop: 17 }}>This editorial view is tuned to your current signal. Select a card, finish an honest step, and let the evidence make the next decision easier.</p>
      {active === 'Skills' && <div className="editorial-skill-grid" style={{ marginTop: 30 }}>{skills.map((skill) => <SkillCard key={skill.id} skill={skill} selected={selectedSkill?.id === skill.id} onSelect={() => onAction(`${skill.name} selected. Your next best rep is ready.`)} />)}</div>}
      {active === 'Roadmap' && <div className="editorial-roadmap-list" style={{ marginTop: 30 }}>{roadmapSteps.map((step) => <div className="editorial-roadmap-item" key={step.id}><div className="editorial-step">{step.phase}</div><div className="editorial-roadmap-copy"><header><h3>{step.title}</h3><span className="editorial-roadmap-time">{step.time}</span></header><p>{step.description}</p></div></div>)}</div>}
      {active !== 'Skills' && active !== 'Roadmap' && <div className="editorial-dark-card" style={{ marginTop: 30, padding: 24 }}><div className="editorial-label editorial-dark-label editorial-mono"><Target size={12} /> Current reading</div><h3 className="editorial-display" style={{ fontSize: 29, margin: '10px 0 0' }}>Your strongest story is still being written.</h3><button type="button" className="editorial-action" style={{ marginTop: 22 }} onClick={() => onAction('Your next move has been added to the active queue.')}><ArrowRight size={13} /> Add a focused move</button></div>}
    </div>
  </div>;
}

export function SkillTrackEditorial() {
  const [active, setActive] = useState<Section>('Dashboard');
  const [checkedIn, setCheckedIn] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set(['portfolio']));
  const [selectedSkillId, setSelectedSkillId] = useState('frontend');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('algorithms');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const selectedSkill = skills.find((skill) => skill.id === selectedSkillId);
  const score = Math.min(98, 74 + completed.size * 2 + (checkedIn ? 1 : 0));
  const feedback = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2600); };
  const changeSection = (section: Section) => { setActive(section); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const checkIn = () => { setCheckedIn(true); feedback(checkedIn ? 'You already logged today — protect the streak.' : 'Daily pulse logged. That consistency compounds.'); };
  const toggleRoadmap = (step: RoadmapStep) => setCompleted((current) => { const next = new Set(current); if (next.has(step.id)) { next.delete(step.id); feedback(`${step.title} moved back to your active queue.`); } else { next.add(step.id); feedback(`${step.title} complete. One more receipt for your profile.`); } return next; });
  const selectSkill = (skill: Skill) => { setSelectedSkillId(skill.id); feedback(`${skill.name} selected. Your next best rep is ready.`); };

  return <div className="editorial-shell" style={{ display: 'flex' }}>
    <Sidebar active={active} onChange={changeSection} />
    <main className="editorial-main">
      <Header active={active} onMenu={() => setMenuOpen(true)} onNotice={feedback} onChange={changeSection} />
      <div className="editorial-mobile-tabs">{navItems.map(({ label, icon: Icon }) => <button type="button" key={label} className={active === label ? 'active' : ''} onClick={() => changeSection(label)}><Icon size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{label}</button>)}</div>
      <div className="editorial-content">
        {active === 'Dashboard' ? <DashboardPage selectedSkill={selectedSkill} selectedId={selectedRoadmapId} completed={completed} checkedIn={checkedIn} score={score} onSkill={selectSkill} onRoadmapSelect={setSelectedRoadmapId} onRoadmapToggle={toggleRoadmap} onCheckIn={checkIn} onView={changeSection} /> : <DetailPage active={active} selectedSkill={selectedSkill} onAction={feedback} />}
      </div>
      {menuOpen && <><div className="editorial-mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} /><aside className="editorial-mobile-drawer"><div className="editorial-mobile-drawer-head"><Brand compact /><button type="button" className="editorial-mobile-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button></div><div className="editorial-kicker editorial-mono">Quick switch</div><Nav active={active} onChange={changeSection} /></aside></>}
      {notice && <div className="editorial-toast"><CheckCircle2 size={15} />{notice}</div>}
    </main>
  </div>;
}

export default SkillTrackEditorial;