import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ThemeSwitcher from './components/ThemeSwitcher.jsx'

async function fetchHealth() {
  const res = await fetch('/actuator/health')
  if (!res.ok) throw new Error('Backend not reachable')
  return res.json()
}

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
  ['Sprint board', 'board'], ['Reports', 'chart'], ['Notifications', 'bell'], ['Settings', 'settings'],
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

function SimpleView({ title, description }) {
  return <><div className="page-heading"><div><h1>{title}</h1><p>{description}</p></div></div><div className="empty-panel"><div className="empty-icon"><Icon name={title === 'Notifications' ? 'bell' : title === 'Reports' ? 'chart' : 'settings'} size={28} /></div><h2>{title} workspace</h2><p>This area is ready for your team’s {title.toLowerCase()} data.</p></div></>
}

function ProfileView() {
  const [editing, setEditing] = useState(false)

  return (
    <>
      <div className="page-heading">
        <div><h1>My profile</h1><p>View and manage your personal information.</p></div>
        <button className="primary-button" onClick={() => setEditing(!editing)}>{editing ? 'Save changes' : 'Edit profile'}</button>
      </div>

      <div className="profile-layout">
        <article className="panel profile-card">
          <div className="profile-cover"><span>ACME</span></div>
          <div className="profile-main">
            <div className="profile-avatar">AK</div>
            <h2>Alex Kim</h2>
            <p>Product Designer</p>
            <span className="profile-status">Available</span>
          </div>
          <div className="profile-stats">
            <div><strong>12</strong><span>Projects</span></div>
            <div><strong>48</strong><span>Tasks</span></div>
            <div><strong>31</strong><span>Completed</span></div>
          </div>
        </article>

        <article className="panel profile-details">
          <div className="panel-heading"><div><h2>Personal details</h2><p>Your account and contact information</p></div></div>
          <div className="profile-fields">
            <label><span>Full name</span><input defaultValue="Alex Kim" disabled={!editing} /></label>
            <label><span>Email address</span><input type="email" defaultValue="alex.kim@acme.com" disabled={!editing} /></label>
            <label><span>Phone number</span><input defaultValue="+1 (555) 123-4567" disabled={!editing} /></label>
            <label><span>Job title</span><input defaultValue="Product Designer" disabled={!editing} /></label>
            <label><span>Department</span><input defaultValue="Product & Design" disabled={!editing} /></label>
            <label><span>Location</span><input defaultValue="San Francisco, CA" disabled={!editing} /></label>
          </div>
        </article>

        <article className="panel profile-about">
          <div className="panel-heading"><div><h2>About</h2></div></div>
          <textarea defaultValue="Product designer focused on creating thoughtful, intuitive experiences. Working across design systems, mobile apps, and web platforms." disabled={!editing} />
        </article>

        <article className="panel profile-work">
          <div className="panel-heading"><div><h2>Workspace</h2></div></div>
          <div className="workspace-info"><div><span>Organization</span><strong>Acme Inc.</strong></div><div><span>Role</span><strong>Administrator</strong></div><div><span>Member since</span><strong>January 2024</strong></div></div>
        </article>
      </div>
    </>
  )
}

export default function App() {
  const [active, setActive] = useState('Overview')
  const [modal, setModal] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const renderView = () => {
    if (active === 'Overview') return <Dashboard setModal={setModal} />
    if (active === 'Projects') return <Projects setModal={setModal} />
    if (active === 'My tasks') return <Tasks />
    if (active === 'Profile') return <ProfileView />
    if (active === 'Sprint board') return <SimpleView title="Sprint board" description="Plan and track your team’s sprint." />
    if (active === 'Reports') return <SimpleView title="Reports" description="Measure progress and team performance." />
    if (active === 'Notifications') return <SimpleView title="Notifications" description="Review updates and mentions from your team." />
    return <SimpleView title="Settings" description="Configure your workspace preferences." />
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><div><strong>ProjectFlow</strong><small>WORKSPACE / ACME</small></div></div>
        <nav>{navItems.map(([label, icon]) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon name={icon} size={19} /><span>{label}</span>{label === 'Notifications' && <b>3</b>}</button>)}</nav>
        <div className="sidebar-user"><button className="sidebar-profile-button" type="button" onClick={() => setActive('Profile')}><div className="avatar">AK</div><div><strong>Alex Kim</strong><span>Product Designer</span></div></button><button className="icon-button sidebar-profile-menu" type="button" aria-label="Profile options"><Icon name="dots" size={18} /></button></div>
      </aside>
      {mobileOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-content">
        <header className="topbar"><button className="menu-button" onClick={() => setMobileOpen(true)}>☰</button><label className="search"><Icon name="search" size={18} /><input placeholder="Search projects, tasks…" /><kbd>⌘ K</kbd></label><ThemeSwitcher /><button className="topbar-bell"><Icon name="bell" size={20} /><i /></button><button className="top-avatar" type="button" aria-label="Open Alex Kim's profile" onClick={() => setActive('Profile')}>AK</button></header>
        <div className="content-wrap">{renderView()}</div>
      </main>
      {modal && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}><div className="modal"><div className="modal-heading"><div><h2>Create new project</h2><p>Add a project to your workspace.</p></div><button onClick={() => setModal(false)}>×</button></div><label>Project name<input autoFocus placeholder="e.g. Mobile redesign" /></label><label>Description<textarea placeholder="What is this project about?" /></label><div className="modal-row"><label>Owner<select><option>Alex Kim</option><option>Maya Chen</option><option>Jordan Lee</option></select></label><label>Due date<input type="date" /></label></div><div className="modal-actions"><button onClick={() => setModal(false)}>Cancel</button><button className="primary-button" onClick={() => setModal(false)}>Create project</button></div></div></div>}
    </div>
  )
}