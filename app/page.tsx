'use client';

import {
  AlertTriangle, ArrowLeft, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronRight, Clock3, Home, MapPin, Menu,
  MessageSquareText, MoreHorizontal, Navigation, Phone, ShieldCheck,
  Sparkles, Timer, UserRound, UsersRound, Wrench, X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Role = 'employee' | 'owner';
type JobStatus = 'Next up' | 'Scheduled' | 'In progress' | 'Complete';
type Job = { id: number; time: string; endTime: string; customer: string; service: string; address: string; status: JobStatus; accent: string; instructions: string };

const employeeJobs: Job[] = [
  { id: 1, time: '9:30 AM', endTime: '11:00 AM', customer: 'Hearthside Bakery', service: 'Walk-in cooler inspection', address: '804 Juniper Ave · 2.4 mi', status: 'Next up', accent: '#D96B45', instructions: 'Ask for Maya at the service entrance. Check the compressor vibration noted on the last visit.' },
  { id: 2, time: '12:30 PM', endTime: '2:00 PM', customer: 'Lumen Coffee Co.', service: 'Preventive maintenance', address: '1620 Market St · 5.8 mi', status: 'Scheduled', accent: '#E9B34D', instructions: 'Quarterly maintenance checklist is attached in the core system. Roof access is through the rear stairwell.' },
  { id: 3, time: '3:15 PM', endTime: '4:30 PM', customer: 'Northstar Dental', service: 'Thermostat replacement', address: '71 W Pine St · 3.1 mi', status: 'Scheduled', accent: '#4B8E78', instructions: 'Replacement unit is in the van inventory. Avoid the 3:30–4:00 patient checkout window if possible.' },
];

const team = [
  { initials: 'JM', name: 'Jordan Miles', detail: 'Hearthside Bakery', state: 'On site', tone: 'green' },
  { initials: 'AL', name: 'Avery Lee', detail: 'En route · 8 min', state: 'Driving', tone: 'blue' },
  { initials: 'RK', name: 'Riley Kim', detail: 'Shop · clocked in 8:12', state: 'Available', tone: 'gold' },
  { initials: 'MS', name: 'Morgan Shaw', detail: 'Not clocked in', state: 'Off shift', tone: 'gray' },
];

const ownerJobs = [
  { time: '8:00', customer: 'Riverside Market', tech: 'Avery', state: 'Complete', tone: 'green' },
  { time: '9:30', customer: 'Hearthside Bakery', tech: 'Jordan', state: 'On site', tone: 'blue' },
  { time: '10:15', customer: 'Bell & Finch', tech: 'Unassigned', state: 'Needs tech', tone: 'orange' },
  { time: '12:30', customer: 'Lumen Coffee Co.', tech: 'Jordan', state: 'Scheduled', tone: 'gray' },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span /><span /></span>;
}

function RoleSwitcher({ role, onChange }: { role: Role; onChange: (role: Role) => void }) {
  return (
    <div className="role-switcher" aria-label="Preview app as">
      <button className={role === 'employee' ? 'active' : ''} onClick={() => onChange('employee')} aria-pressed={role === 'employee'}>Employee</button>
      <button className={role === 'owner' ? 'active' : ''} onClick={() => onChange('owner')} aria-pressed={role === 'owner'}>Owner</button>
    </div>
  );
}

function BottomNav({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  const items = [{ label: 'Today', icon: Home }, { label: 'Jobs', icon: BriefcaseBusiness }, { label: 'Me', icon: UserRound }];
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(({ label, icon: Icon }) => (
        <button key={label} className={active === label ? 'active' : ''} onClick={() => onChange(label)} aria-current={active === label ? 'page' : undefined}>
          <Icon size={20} strokeWidth={2.2} /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function ClockCard({ clockedIn, jobsiteVerified, onToggle, onVerifyRequest }: { clockedIn: boolean; jobsiteVerified: boolean; onToggle: () => void; onVerifyRequest: () => void }) {
  return (
    <section className={`clock-card ${clockedIn ? 'clocked-in' : ''}`} aria-label="Shift status">
      <div className="clock-copy"><span className="eyebrow">{clockedIn ? 'On the clock' : 'Shift status'}</span><strong>{clockedIn ? '2h 18m' : 'Ready when you are'}</strong><span className="clock-meta">{clockedIn ? 'Since 8:12 AM · Oak Street HVAC' : 'Monday · September 1'}</span></div>
      <button className="clock-button" onClick={clockedIn || jobsiteVerified ? onToggle : onVerifyRequest} aria-label={clockedIn ? 'Clock out for today' : 'Clock in for today'}>
        {clockedIn ? <Timer size={22} /> : <Clock3 size={22} />}{clockedIn ? 'Clock out' : 'Clock in'}
      </button>
    </section>
  );
}

function JobRow({ job, onOpen }: { job: Job; onOpen: (job: Job) => void }) {
  return (
    <button className="job-row" onClick={() => onOpen(job)} aria-label={`Open ${job.service} for ${job.customer}`}>
      <div className="job-time"><span>{job.time.replace(' AM', '').replace(' PM', '')}</span><small>{job.time.includes('AM') ? 'AM' : 'PM'}</small></div>
      <span className="job-line" style={{ background: job.accent }} /><div className="job-main"><span className="job-status">{job.status}</span><strong>{job.customer}</strong><span>{job.service}</span><small><MapPin size={13} /> {job.address}</small></div><ChevronRight size={18} aria-hidden="true" />
    </button>
  );
}

function JobDetail({ job, onBack, onStatus }: { job: Job; onBack: () => void; onStatus: (status: JobStatus) => void }) {
  const [notes, setNotes] = useState('');
  const isStarted = job.status === 'In progress';
  return (
    <div className="detail-screen">
      <header className="detail-header"><button className="icon-button" onClick={onBack} aria-label="Back to today’s jobs"><ArrowLeft size={21} /></button><span>Job details</span><button className="icon-button" aria-label="More job options"><MoreHorizontal size={22} /></button></header>
      <div className="detail-body">
        <div className="detail-title"><span className="status-pill"><span /> {job.status}</span><h2>{job.service}</h2><p>{job.customer}</p></div>
        <section className="detail-card schedule-card">
          <div><CalendarDays size={19} /><span><small>Today</small><strong>{job.time}–{job.endTime}</strong></span></div>
          <div><MapPin size={19} /><span><small>Service address</small><strong>{job.address.replace(/ ·.*/, '')}</strong></span></div>
          <button className="route-button"><Navigation size={16} /> Directions</button>
        </section>
        <section className="detail-section"><h3>Job notes</h3><p className="instructions">{job.instructions}</p><label htmlFor="field-notes">Your field notes</label><textarea id="field-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add observations, parts used, or follow-up needed…" /><span className="helper-text">Demo only — notes stay in this browser session.</span></section>
        <div className="detail-actions"><button className="secondary-action"><Phone size={18} /> Call contact</button><button className="primary-action" onClick={() => onStatus(isStarted ? 'Complete' : 'In progress')}>{isStarted ? <Check size={19} /> : <Wrench size={19} />}{isStarted ? 'Mark complete' : 'Start job'}</button></div>
      </div>
    </div>
  );
}

function EmployeeView() {
  const [clockedIn, setClockedIn] = useState(true);
  const [jobsiteVerified, setJobsiteVerified] = useState(false);
  const [showCheckInGate, setShowCheckInGate] = useState(false);
  const [jobsitePin, setJobsitePin] = useState('');
  const [checkInError, setCheckInError] = useState('');
  const verifyPin = () => {
    if (jobsitePin === '4826') { setJobsiteVerified(true); setShowCheckInGate(false); setCheckInError(''); }
    else setCheckInError('That PIN does not match the owner-approved jobsite PIN.');
  };
  const verifyLocation = () => { setJobsiteVerified(true); setShowCheckInGate(false); setCheckInError(''); };
  const toggleClock = () => {
    if (!clockedIn && !jobsiteVerified) { setShowCheckInGate(true); return; }
    if (clockedIn) {
      setClockedIn(false);
      setJobsiteVerified(false);
      setShowCheckInGate(true);
      return;
    }
    setClockedIn(true);
    setShowCheckInGate(false);
  };
  const [activeNav, setActiveNav] = useState('Today');
  const [jobs, setJobs] = useState(employeeJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const updateJobStatus = (status: JobStatus) => {
    if (!selectedJob) return;
    const updated = { ...selectedJob, status };
    setSelectedJob(updated);
    setJobs((current) => current.map((job) => job.id === updated.id ? updated : job));
  };
  if (selectedJob) return <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} onStatus={updateJobStatus} />;
  if (activeNav === 'Me') return (
    <div className="phone-content tab-content">
      <div className="simple-tab-header"><span className="avatar large">JM</span><h1>Jordan Miles</h1><p>Field technician</p></div>
      <section className="profile-card"><ShieldCheck size={22} /><div><strong>Demo profile</strong><p>No account or real employee information is connected.</p></div></section>
      <section className="settings-list"><button>Notification preferences <ChevronRight size={18} /></button><button>App appearance <ChevronRight size={18} /></button><button>Help & feedback <ChevronRight size={18} /></button></section>
      <BottomNav active={activeNav} onChange={setActiveNav} />
    </div>
  );
  return (
    <div className="phone-content">
      <header className="app-header"><div><span className="eyebrow">Good morning</span><h1>{activeNav === 'Jobs' ? 'All jobs' : 'Jordan'}</h1></div><button className="avatar" aria-label="Open profile" onClick={() => setActiveNav('Me')}>JM<span className="online-dot" /></button></header>
      {activeNav === 'Today' && <ClockCard clockedIn={clockedIn} jobsiteVerified={jobsiteVerified} onToggle={toggleClock} onVerifyRequest={() => setShowCheckInGate(true)} />}
      {!clockedIn && showCheckInGate && <section className="check-in-gate" aria-label="Jobsite check-in"><div className="gate-heading"><MapPin size={18} /><div><strong>Owner-approved jobsite check required</strong><p>Enter the jobsite PIN or verify your location before clocking in.</p></div></div><label htmlFor="jobsite-pin">Jobsite PIN</label><div className="pin-row"><input id="jobsite-pin" inputMode="numeric" value={jobsitePin} onChange={(event) => setJobsitePin(event.target.value)} placeholder="Enter PIN" /><button className="primary-action" onClick={verifyPin} aria-label="Verify jobsite PIN">Verify PIN</button></div><button className="location-button" onClick={verifyLocation}><Navigation size={16} /> Verify location at jobsite</button>{checkInError && <p className="check-in-error" role="alert">{checkInError}</p>}<p className="helper-text">Demo rule: the owner or manager sets the PIN/address; production would use secure GPS geofencing or a managed site code.</p></section>}
      {!clockedIn && jobsiteVerified && <p className="verified-badge" role="status"><CheckCircle2 size={15} /> Jobsite verified</p>}
      <section className="jobs-section"><div className="section-heading"><div><span className="eyebrow">{activeNav === 'Jobs' ? 'Monday route' : 'Today'}</span><h2>{jobs.length} assigned jobs</h2></div><button aria-label="Open schedule"><CalendarDays size={19} /></button></div><div className="job-list">{jobs.map((job) => <JobRow key={job.id} job={job} onOpen={setSelectedJob} />)}</div></section>
      <BottomNav active={activeNav} onChange={setActiveNav} />
    </div>
  );
}

function OwnerView() {
  const [activeTab, setActiveTab] = useState<'Team' | 'Jobs'>('Team');
  return (
    <div className="phone-content owner-view">
      <header className="app-header owner-header"><div><span className="eyebrow">Monday, Sep 1</span><h1>Good morning, Sam</h1></div><button className="icon-button menu-button" aria-label="Open menu"><Menu size={21} /></button></header>
      <section className="owner-summary"><div className="summary-lead"><span className="summary-icon"><Sparkles size={18} /></span><div><span>Today at a glance</span><strong>Everything’s moving</strong></div></div><div className="metric-row"><div><strong>7</strong><span>Jobs</span></div><div><strong>3</strong><span>Active</span></div><div><strong>1</strong><span>Needs attention</span></div></div></section>
      <section className="alert-card"><span><AlertTriangle size={18} /></span><div><strong>Bell & Finch needs a technician</strong><p>10:15 AM · Installation follow-up</p></div><ChevronRight size={18} /></section>
      <div className="owner-tabs" role="tablist" aria-label="Owner dashboard views"><button role="tab" aria-selected={activeTab === 'Team'} className={activeTab === 'Team' ? 'active' : ''} onClick={() => setActiveTab('Team')}>Team</button><button role="tab" aria-selected={activeTab === 'Jobs'} className={activeTab === 'Jobs' ? 'active' : ''} onClick={() => setActiveTab('Jobs')}>Today’s jobs</button></div>
      {activeTab === 'Team' ? (
        <section className="team-list" aria-label="Team activity">{team.map((person) => <button key={person.name} className="team-row"><span className={`avatar team-avatar ${person.tone}`}>{person.initials}<span className="online-dot" /></span><span className="team-person"><strong>{person.name}</strong><small>{person.detail}</small></span><span className={`team-state ${person.tone}`}>{person.state}</span></button>)}</section>
      ) : (
        <section className="owner-jobs" aria-label="Today’s jobs">{ownerJobs.map((job) => <button key={`${job.time}-${job.customer}`} className="owner-job-row"><span className="owner-job-time">{job.time}</span><span><strong>{job.customer}</strong><small>{job.tech}</small></span><span className={`team-state ${job.tone}`}>{job.state}</span></button>)}</section>
      )}
      <section className="activity-strip"><div className="activity-icon"><CheckCircle2 size={18} /></div><div><strong>Riverside Market completed</strong><span>Avery wrapped up 12 min ago</span></div></section>
      <nav className="bottom-nav owner-nav" aria-label="Owner navigation"><button className="active" aria-current="page"><Home size={20} /><span>Overview</span></button><button><BriefcaseBusiness size={20} /><span>Jobs</span></button><button><UsersRound size={20} /><span>Team</span></button><button><MessageSquareText size={20} /><span>Alerts</span><i>1</i></button></nav>
    </div>
  );
}

export default function HomePage() {
  const [role, setRole] = useState<Role>('employee');
  const [showInfo, setShowInfo] = useState(true);
  const roleLabel = useMemo(() => role === 'employee' ? 'Employee field view' : 'Owner visibility view', [role]);
  return (
    <main className="site-shell">
      <section className="story-panel"><div className="wordmark"><BrandMark /><span>ClearPath</span></div><div className="story-copy"><span className="project-kicker">Project 04 · Mobile companion</span><h1>Your business,<br />within reach.</h1><p>A focused phone companion for the moments that happen away from the desk—built for field teams and the owners keeping work moving.</p><div className="story-note"><ShieldCheck size={19} /><span><strong>Optional by design.</strong> The core ClearPath PC business system works fully without this companion app.</span></div></div><div className="story-footer"><span>ClearPath Business Systems</span><span>Portfolio demo · Synthetic data</span></div></section>
      <section className="preview-panel" aria-label="Interactive mobile app preview">
        <div className="preview-toolbar"><div><span className="preview-label">Interactive preview</span><strong>{roleLabel}</strong></div><RoleSwitcher role={role} onChange={setRole} /></div>
        <div className="phone-frame"><div className="phone-status" aria-hidden="true"><span>9:41</span><span className="dynamic-island" /><span>● ◒</span></div><div className="app-brand"><BrandMark /><span>clearpath</span><small>DEMO</small></div>{showInfo && <aside className="demo-notice"><Sparkles size={16} /><p><strong>Companion preview</strong><span>Sample data only. Nothing here is sent or saved.</span></p><button onClick={() => setShowInfo(false)} aria-label="Dismiss demo notice"><X size={16} /></button></aside>}{role === 'employee' ? <EmployeeView /> : <OwnerView />}</div>
        <p className="preview-hint"><span /> Try switching roles and opening a job</p>
      </section>
    </main>
  );
}
