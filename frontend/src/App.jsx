import { useEffect, useRef, useState } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import LoginPage from './features/auth/pages/LoginPage.jsx'

const iconPaths = {
  grid: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
  check: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  folder: 'M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z',
  board: 'M4 4h16v16H4V4Zm5 0v16m6-16v16',
  chart: 'M4 20V10m5 10V4m6 16v-7m5 7V7',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-4 12h-4',
  settings: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Zm7-3.5 2-1-2-3-2 1-2-1V5h-6v3l-2 1-2-1-2 3 2 1v4l-2 1 2 3 2-1 2 1v2h6v-2l2-1 2 1 2-3-2-1v-4Z',
  search: 'M21 21l-4.4-4.4M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z',
  plus: 'M12 5v14M5 12h14',
  calendar: 'M7 2v4m10-4v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
}

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  )
}

const navItems = [
  ['Overview', 'grid'], ['My tasks', 'check'], ['Projects', 'folder'],
  ['Sprint board', 'board'], ['Reports', 'chart'], ['Settings', 'settings'],
]

const projects = [
  { name: 'Website redesign', code: 'WEB', progress: 72, status: 'On track', color: '#5b7cfa', owner: 'MC', due: 'Nov 28' },
  { name: 'Mobile app', code: 'APP', progress: 48, status: 'At risk', color: '#9b6af3', owner: 'JL', due: 'Dec 12' },
  { name: 'Payments API', code: 'API', progress: 86, status: 'On track', color: '#45a7dd', owner: 'PS', due: 'Nov 25' },
  { name: 'Customer portal', code: 'PORT', progress: 35, status: 'At risk', color: '#34ae91', owner: 'AK', due: 'Dec 04' },
]

const tasks = [
  { title: 'Review API contract', project: 'Payments API', assignee: 'Alex Kim', due: 'Today', priority: 'High', done: false, color: '#ef6464' },
  { title: 'Prepare sprint demo', project: 'Website redesign', assignee: 'Maya Chen', due: 'Tomorrow', priority: 'Medium', done: false, color: '#f1a35b' },
  { title: 'Update deployment guide', project: 'Customer portal', assignee: 'Jordan Lee', due: 'Nov 28', priority: 'Low', done: false, color: '#5b89ef' },
  { title: 'Approve design changes', project: 'Mobile app', assignee: 'Priya Shah', due: 'Nov 30', priority: 'Medium', done: true, color: '#9b70e7' },
]

function Dashboard({ setModal }) {
  const cards = [
    ['Active projects', '12', '#5b7cfa'], ['Open tasks', '48', '#9668ed'],
    ['Overdue', '6', '#ed6262'], ['Completed this week', '31', '#38b989'],
  ]

  return (
    <>
      <div className="page-heading">
        <div><h1>Good morning, Alex</h1><p>Here’s what’s happening across your workspace.</p></div>
        <button className="primary-button" onClick={() => setModal(true)}><Icon name="plus" size={18} />Create project</button>
      </div>

      <section className="summary-grid">
        {cards.map(([label, value, color]) => <article className="summary-card" key={label}><div className="summary-label"><span>{label}</span><i style={{ background: color }} /></div><strong style={{ color }}>{value}</strong></article>)}
      </section>

      <section className="dashboard-grid">
        <article className="panel project-progress">
          <div className="panel-heading"><div><h2>Project progress</h2><p>Completion across active projects</p></div><button className="icon-button"><Icon name="dots" /></button></div>
          <div className="progress-list">
            {projects.map(project => <div className="progress-item" key={project.name}><div className="progress-meta"><span>{project.name}</span><strong>{project.progress}%</strong></div><div className="progress-track"><i style={{ width: `${project.progress}%`, background: project.color }} /></div></div>)}
          </div>
        </article>

        <article className="panel priorities">
          <div className="panel-heading"><div><h2>My priorities</h2></div></div>
          <div className="priority-list">
            {tasks.slice(0, 4).map(task => <div className="priority-item" key={task.title}><i style={{ background: task.color }} /><div><strong>{task.title}</strong><span>{task.due}</span></div></div>)}
          </div>
        </article>
      </section>

      <article className="panel activity-panel">
        <div className="panel-heading"><div><h2>Recent activity</h2></div><button className="text-button">View all</button></div>
        <div className="activity-list">
          {[['MC', 'Maya Chen', 'completed API integration test', '10 min ago', '#45b99a'], ['JL', 'Jordan Lee', 'assigned you Review API contract', '32 min ago', '#5b7cfa'], ['PS', 'Priya Shah', 'commented on Website redesign', '1 hour ago', '#9b70e7']].map(([initials, name, action, time, color]) => <div className="activity-item" key={name}><div className="avatar" style={{ background: color }}>{initials}</div><p><strong>{name}</strong> {action}</p><time>{time}</time></div>)}
        </div>
      </article>
    </>
  )
}

function Projects({ setModal }) {
  return <><div className="page-heading"><div><h1>Projects</h1><p>Manage projects across your workspace.</p></div><button className="primary-button" onClick={() => setModal(true)}><Icon name="plus" size={18} />New project</button></div><div className="project-grid">{projects.map(project => <article className="project-card" key={project.name}><div className="project-card-top"><div className="project-mark" style={{ background: project.color }}>{project.code.slice(0, 2)}</div><button className="icon-button"><Icon name="dots" /></button></div><h2>{project.name}</h2><span className={`status ${project.status === 'At risk' ? 'risk' : ''}`}>{project.status}</span><div className="project-progress-row"><span>Progress</span><strong>{project.progress}%</strong></div><div className="progress-track"><i style={{ width: `${project.progress}%`, background: project.color }} /></div><footer><div className="avatar small">{project.owner}</div><span>Due {project.due}</span></footer></article>)}</div></>
}

function Tasks() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? tasks : filter === 'Completed' ? tasks.filter(t => t.done) : tasks.filter(t => !t.done)
  return <><div className="page-heading"><div><h1>My tasks</h1><p>Stay on top of your work.</p></div><button className="primary-button"><Icon name="plus" size={18} />Add task</button></div><div className="panel task-panel"><div className="task-toolbar"><div className="tabs">{['All', 'Active', 'Completed'].map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><button className="filter-button"><Icon name="calendar" size={17} /> Due date</button></div><div className="task-table">{visible.map(task => <div className="task-row" key={task.title}><button className={`task-check ${task.done ? 'checked' : ''}`}>{task.done ? '✓' : ''}</button><div className="task-name"><strong>{task.title}</strong><span>{task.project}</span></div><div className="task-assignee"><div className="avatar small">{task.assignee.split(' ').map(n => n[0]).join('')}</div><span>{task.assignee}</span></div><span className={`priority priority-${task.priority.toLowerCase()}`}><i style={{ background: task.color }} />{task.priority}</span><time><Icon name="calendar" size={16} />{task.due}</time></div>)}</div></div></>
}

function NotificationsView({ notifications, setNotifications }) {
  const markAllRead = () => setNotifications(items => items.map(item => ({ ...item, read: true })))
  return <><div className="page-heading"><div><h1>Notifications</h1><p>Review updates and mentions from your team.</p></div><button className="secondary-button" onClick={markAllRead}>Mark all as read</button></div><div className="panel notification-list">{notifications.map(item => <button type="button" key={item.id} className={`notification-row ${item.read ? '' : 'unread'}`} onClick={() => setNotifications(items => items.map(notification => notification.id === item.id ? { ...notification, read: true } : notification))}><div className="avatar" style={{ background: item.color }}>{item.initials}</div><div><strong>{item.title}</strong><p>{item.message}</p><time>{item.time}</time></div>{!item.read && <i className="unread-dot" />}</button>)}</div></>
}

function SettingsView({ setOnboardingOpen }) {
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [mentions, setMentions] = useState(true)
  const [weekly, setWeekly] = useState(false)
  const [toast, setToast] = useState(false)
  const save = () => { setToast(true); window.setTimeout(() => setToast(false), 2200) }
  return <><div className="page-heading"><div><h1>Settings</h1><p>Configure your workspace and notification preferences.</p></div><button className="primary-button" onClick={save}>Save preferences</button></div>{toast && <div className="toast success-toast">Preferences saved</div>}<div className="settings-grid"><article className="panel settings-card"><div className="panel-heading"><div><h2>Notifications</h2><p>Choose what you want to hear about</p></div></div><div className="setting-row"><div><strong>Email updates</strong><span>Receive important workspace updates</span></div><button className={`switch ${emailUpdates ? 'on' : ''}`} aria-label="Toggle email updates" onClick={() => setEmailUpdates(v => !v)}><i /></button></div><div className="setting-row"><div><strong>Mentions</strong><span>When teammates mention you</span></div><button className={`switch ${mentions ? 'on' : ''}`} aria-label="Toggle mentions" onClick={() => setMentions(v => !v)}><i /></button></div><div className="setting-row"><div><strong>Weekly digest</strong><span>A summary delivered every Friday</span></div><button className={`switch ${weekly ? 'on' : ''}`} aria-label="Toggle weekly digest" onClick={() => setWeekly(v => !v)}><i /></button></div></article><article className="panel settings-card"><div className="panel-heading"><div><h2>Account</h2><p>Workspace setup and policies</p></div></div><button className="settings-link" onClick={() => setOnboardingOpen(true)}><div><strong>Replay onboarding</strong><span>Review workspace setup</span></div><b>›</b></button><button className="settings-link" onClick={() => window.dispatchEvent(new CustomEvent('open-terms'))}><div><strong>Terms and privacy</strong><span>Review service agreements</span></div><b>›</b></button></article></div></>
}

function TermsView() {
  return <><div className="page-heading"><div><h1>Terms & privacy</h1><p>Policies for your ProjectFlow workspace.</p></div></div><article className="panel legal-panel"><h2>Terms of service</h2><p>By using ProjectFlow, you agree to use the workspace responsibly and protect your account credentials. Workspace administrators control access to projects and shared information.</p><h2>Privacy</h2><p>Your profile details and workspace activity are used to provide collaboration features. ProjectFlow never sells personal data or profile photos to third parties.</p><h2>Cookie and storage preferences</h2><p>ProjectFlow stores interface preferences, profile information, and onboarding status locally in this browser for a consistent experience.</p></article></>
}

function SprintView() {
  const [columns, setColumns] = useState([
    { name: 'Backlog', cards: ['User research summary', 'Add keyboard shortcuts'] },
    { name: 'In progress', cards: ['API contract review', 'Mobile navigation'] },
    { name: 'In review', cards: ['Design system updates'] },
    { name: 'Done', cards: ['Sprint planning', 'Update documentation'] },
  ])
  const moveTask = (columnIndex, cardIndex) => {
    if (columnIndex >= columns.length - 1) return
    setColumns(current => current.map((column, index) => index === columnIndex ? { ...column, cards: column.cards.filter((_, i) => i !== cardIndex) } : index === columnIndex + 1 ? { ...column, cards: [...column.cards, current[columnIndex].cards[cardIndex]] } : column))
  }
  return <><div className="page-heading"><div><h1>Sprint board</h1><p>Plan and track your team’s current sprint.</p></div><button className="primary-button" onClick={() => setColumns(current => current.map((column, index) => index === 0 ? { ...column, cards: [...column.cards, 'Untitled task'] } : column))}><Icon name="plus" size={18} />Add task</button></div><div className="board-grid">{columns.map((column, columnIndex) => <section className="board-column" key={column.name}><header><strong>{column.name}</strong><span>{column.cards.length}</span></header>{column.cards.map((card, cardIndex) => <button type="button" className="board-card" key={card} onClick={() => moveTask(columnIndex, cardIndex)}><strong>{card}</strong><div><span>ACME</span><time>Nov 28</time></div></button>)}</section>)}</div></>
}

function ReportsView() {
  return <><div className="page-heading"><div><h1>Reports</h1><p>Measure progress and team performance.</p></div><button className="secondary-button">Export report</button></div><div className="report-grid"><article className="panel report-card"><div><span>Tasks completed</span><strong>31</strong></div><div className="mini-chart">{[40,62,48,75,58,82,68,92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article><article className="panel report-card"><div><span>Team velocity</span><strong>86%</strong></div><div className="velocity-ring">86%</div></article><article className="panel report-card wide"><h2>Project health</h2>{projects.map(project => <div className="report-progress" key={project.name}><span>{project.name}</span><div className="progress-track"><i style={{ width: `${project.progress}%`, background: project.color }} /></div><strong>{project.progress}%</strong></div>)}</article></div></>
}

function SimpleView({ title, description }) {
  return <><div className="page-heading"><div><h1>{title}</h1><p>{description}</p></div></div><div className="empty-panel"><div className="empty-icon"><Icon name={title === 'Notifications' ? 'bell' : title === 'Reports' ? 'chart' : 'settings'} size={28} /></div><h2>{title} workspace</h2><p>This area is ready for your team’s {title.toLowerCase()} data.</p></div></>
}

function ProfileView() {
  const defaultProfile = {
    name: 'Alex Kim', email: 'alex.kim@acme.com', phone: '+1 (555) 123-4567',
    title: 'Product Designer', department: 'Product & Design', location: 'San Francisco, CA',
    about: 'Product designer focused on creating thoughtful, intuitive experiences. Working across design systems, mobile apps, and web platforms.',
    image: '',
  }
  const [profile, setProfile] = useState(() => {
    try { return { ...defaultProfile, ...JSON.parse(localStorage.getItem('projectflow-profile') || '{}') } }
    catch { return defaultProfile }
  })
  const [draft, setDraft] = useState(profile)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)
  const preview = editing ? draft : profile
  const initials = preview.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()

  const update = (field, value) => setDraft(current => ({ ...current, [field]: value }))
  const save = () => {
    localStorage.setItem('projectflow-profile', JSON.stringify(draft))
    setProfile(draft)
    setEditing(false)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }
  const cancel = () => { setDraft(profile); setEditing(false) }
  const uploadImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    if (file.size > 3 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => update('image', String(reader.result))
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className="page-heading">
        <div><h1>My profile</h1><p>View and manage your personal information.</p></div>
        {editing ? <div className="heading-actions"><button className="secondary-button" onClick={cancel}>Cancel</button><button className="primary-button" onClick={save}>Save changes</button></div> : <button className="primary-button" onClick={() => setEditing(true)}>Edit profile</button>}
      </div>
      {saved && <div className="toast success-toast">Profile changes saved</div>}

      <div className="profile-layout">
        <article className="panel profile-card">
          <div className="profile-cover"><span>ACME</span></div>
          <div className="profile-main">
            <div className="profile-avatar-wrap">
              {preview.image ? <img className="profile-avatar" src={preview.image} alt="Profile" /> : <div className="profile-avatar">{initials}</div>}
              {editing && <button className="avatar-edit" type="button" onClick={() => fileRef.current?.click()} aria-label="Change profile photo">📷</button>}
              <input ref={fileRef} className="visually-hidden" type="file" accept="image/*" onChange={uploadImage} />
            </div>
            {editing && <button className="avatar-remove" type="button" onClick={() => update('image', '')}>Remove photo</button>}
            <h2>{preview.name}</h2><p>{preview.title}</p><span className="profile-status">Available</span>
          </div>
          <div className="profile-stats"><div><strong>12</strong><span>Projects</span></div><div><strong>48</strong><span>Tasks</span></div><div><strong>31</strong><span>Completed</span></div></div>
        </article>

        <article className="panel profile-details">
          <div className="panel-heading"><div><h2>Personal details</h2><p>Your account and contact information</p></div></div>
          <div className="profile-fields">
            <label><span>Full name</span><input value={editing ? draft.name : profile.name} onChange={e => update('name', e.target.value)} disabled={!editing} /></label>
            <label><span>Email address</span><input type="email" value={editing ? draft.email : profile.email} onChange={e => update('email', e.target.value)} disabled={!editing} /></label>
            <label><span>Phone number</span><input value={editing ? draft.phone : profile.phone} onChange={e => update('phone', e.target.value)} disabled={!editing} /></label>
            <label><span>Job title</span><input value={editing ? draft.title : profile.title} onChange={e => update('title', e.target.value)} disabled={!editing} /></label>
            <label><span>Department</span><input value={editing ? draft.department : profile.department} onChange={e => update('department', e.target.value)} disabled={!editing} /></label>
            <label><span>Location</span><input value={editing ? draft.location : profile.location} onChange={e => update('location', e.target.value)} disabled={!editing} /></label>
          </div>
        </article>

        <article className="panel profile-about"><div className="panel-heading"><div><h2>About</h2></div></div><textarea value={editing ? draft.about : profile.about} onChange={e => update('about', e.target.value)} disabled={!editing} /></article>
        <article className="panel profile-work"><div className="panel-heading"><div><h2>Workspace</h2></div></div><div className="workspace-info"><div><span>Organization</span><strong>Acme Inc.</strong></div><div><span>Role</span><strong>Administrator</strong></div><div><span>Member since</span><strong>January 2024</strong></div></div></article>
      </div>
    </>
  )
}

function Onboarding({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [workspace, setWorkspace] = useState('Acme Inc.')
  const [role, setRole] = useState('Product')
  const steps = [
    { title: 'Welcome to ProjectFlow', text: 'Bring projects, tasks, and your team together in one focused workspace.', icon: 'grid' },
    { title: 'Set up your workspace', text: 'Tell us where you work and which team you belong to.', icon: 'folder' },
    { title: 'You’re ready', text: 'Invite teammates later or start by creating your first project.', icon: 'check' },
  ]
  if (!open) return null
  const finish = () => { localStorage.setItem('projectflow-onboarding', 'complete'); onClose() }
  return <div className="onboarding-backdrop"><div className="onboarding-modal"><button className="onboarding-close" onClick={finish} aria-label="Close onboarding">×</button><div className="onboarding-visual"><div className="onboarding-icon"><Icon name={steps[step].icon} size={34} /></div><div className="onboarding-dots">{steps.map((_, index) => <i key={index} className={index === step ? 'active' : ''} />)}</div></div><div className="onboarding-copy"><span>STEP {step + 1} OF {steps.length}</span><h2>{steps[step].title}</h2><p>{steps[step].text}</p>{step === 1 && <div className="onboarding-fields"><label>Workspace<input value={workspace} onChange={e => setWorkspace(e.target.value)} /></label><label>Team<select value={role} onChange={e => setRole(e.target.value)}><option>Product</option><option>Engineering</option><option>Design</option><option>Marketing</option></select></label></div>}<div className="onboarding-actions">{step > 0 && <button className="secondary-button" onClick={() => setStep(value => value - 1)}>Back</button>}<button className="primary-button" onClick={() => step === steps.length - 1 ? finish() : setStep(value => value + 1)}>{step === steps.length - 1 ? 'Go to dashboard' : 'Continue'}</button></div></div></div></div>
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('projectflow-authenticated') === 'true')
  const [active, setActive] = useState('Overview')
  const [modal, setModal] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const notificationRef = useRef(null)
  const [onboardingOpen, setOnboardingOpen] = useState(() => localStorage.getItem('projectflow-onboarding') !== 'complete')
  const [notifications, setNotifications] = useState([
    { id: 1, initials: 'MC', title: 'Maya completed a task', message: 'API integration test is ready for review.', time: '10 min ago', color: '#45b99a', read: false },
    { id: 2, initials: 'JL', title: 'Jordan assigned you a task', message: 'Review API contract', time: '32 min ago', color: '#5b7cfa', read: false },
    { id: 3, initials: 'PS', title: 'Priya left a comment', message: 'On Website redesign', time: '1 hour ago', color: '#9b70e7', read: false },
  ])

  const [profile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('projectflow-profile') || '{}') } catch { return {} }
  })

  useEffect(() => {
    const closeNotifications = (event) => {
      if (!notificationRef.current?.contains(event.target)) setNotificationOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setNotificationOpen(false)
    }
    document.addEventListener('pointerdown', closeNotifications)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeNotifications)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  useEffect(() => {
    const openTerms = () => setActive('Terms')
    window.addEventListener('open-terms', openTerms)
    return () => window.removeEventListener('open-terms', openTerms)
  }, [])

  const logout = () => {
    localStorage.removeItem('projectflow-authenticated')
    setAuthenticated(false)
  }

  if (!authenticated) return <LoginPage onLogin={() => setAuthenticated(true)} />

  let topProfile = profile
  try { topProfile = { ...profile, ...JSON.parse(localStorage.getItem('projectflow-profile') || '{}') } } catch { /* keep current profile */ }

  const renderView = () => {
    if (active === 'Overview') return <Dashboard setModal={setModal} />
    if (active === 'Projects') return <Projects setModal={setModal} />
    if (active === 'My tasks') return <Tasks />
    if (active === 'Profile') return <ProfileView />
    if (active === 'Sprint board') return <SprintView />
    if (active === 'Reports') return <ReportsView />
    if (active === 'Notifications') return <NotificationsView notifications={notifications} setNotifications={setNotifications} />
    if (active === 'Terms') return <TermsView />
    if (active === 'Settings') return <SettingsView setOnboardingOpen={setOnboardingOpen} />
    return <SimpleView title={active} description="Configure your workspace preferences." />
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><div><strong>ProjectFlow</strong><small>WORKSPACE / ACME</small></div></div>
        <nav>{navItems.map(([label, icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon name={icon} size={19} /><span>{label}</span></button>)}</nav>
        <div className="sidebar-footer">
          <button className="sidebar-profile-button" type="button" onClick={() => { setActive('Profile'); setMobileOpen(false) }}>
            {topProfile.image ? <img className="avatar sidebar-avatar-image" src={topProfile.image} alt="Profile" /> : <div className="avatar">{(topProfile.name || 'Alex Kim').split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</div>}
            <div><strong>{topProfile.name || 'Alex Kim'}</strong><span>{topProfile.title || 'Product Designer'}</span></div>
          </button>
          <button className="logout-button" type="button" onClick={logout}><span aria-hidden="true">↪</span><span>Log out</span></button>
        </div>
      </aside>
      {mobileOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)}>☰</button>
          <label className="search"><Icon name="search" size={18} /><input placeholder="Search projects, tasks…" /><kbd>⌘ K</kbd></label>
          <div className="topbar-actions">
            <ThemeSwitcher />
            <div className="notification-anchor" ref={notificationRef} onPointerDown={(event) => event.stopPropagation()}>
              <button className="topbar-bell" type="button" aria-label="Open notifications" aria-expanded={notificationOpen} onClick={() => setNotificationOpen(value => !value)}>
                <Icon name="bell" size={20} />{notifications.some(item => !item.read) && <i />}
              </button>
              {notificationOpen && <div className="notification-dropdown"><div className="notification-dropdown-heading"><strong>Notifications</strong><button type="button" onClick={() => setNotifications(items => items.map(item => ({ ...item, read: true })))}>Mark all read</button></div>{notifications.slice(0,3).map(item => <button type="button" key={item.id} className="notification-preview" onClick={() => { setNotifications(items => items.map(notification => notification.id === item.id ? { ...notification, read: true } : notification)); setNotificationOpen(false); setActive('Notifications') }}><div className="avatar small" style={{ background: item.color }}>{item.initials}</div><div><strong>{item.title}</strong><span>{item.message}</span></div></button>)}<button type="button" className="notification-view-all" onClick={() => { setNotificationOpen(false); setActive('Notifications') }}>View all notifications</button></div>}
            </div>
            <button className="top-avatar" type="button" aria-label={`Open ${(topProfile.name || 'Alex Kim')}'s profile`} onClick={() => setActive('Profile')}>{topProfile.image ? <img src={topProfile.image} alt="Profile" /> : ((topProfile.name || 'Alex Kim').split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase())}</button>
          </div>
        </header>
        <div className="content-wrap">{renderView()}</div>
      </main>
      {modal && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}><div className="modal"><div className="modal-heading"><div><h2>Create new project</h2><p>Add a project to your workspace.</p></div><button onClick={() => setModal(false)}>×</button></div><label>Project name<input autoFocus placeholder="e.g. Mobile redesign" /></label><label>Description<textarea placeholder="What is this project about?" /></label><div className="modal-row"><label>Owner<select><option>Alex Kim</option><option>Maya Chen</option><option>Jordan Lee</option></select></label><label>Due date<input type="date" /></label></div><div className="modal-actions"><button onClick={() => setModal(false)}>Cancel</button><button className="primary-button" onClick={() => setModal(false)}>Create project</button></div></div></div>}
      <Onboarding open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </div>
  )
}