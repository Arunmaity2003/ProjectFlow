import Icon from '../../../shared/components/Icon.jsx'
import { projectData as projects } from '../../projects/projectData.js'

export default function DashboardPage({ onCreateProject }) {
  const cards = [['Active projects', '12', '#5b7cfa'], ['Open tasks', '48', '#9668ed'], ['Overdue', '6', '#ed6262'], ['Completed this week', '31', '#38b989']]
  const tasks = [['Review API contract','Today','#ef6464'],['Prepare sprint demo','Tomorrow','#f1a35b'],['Update deployment guide','Nov 28','#5b89ef'],['Approve design changes','Nov 30','#9b70e7']]
  return <>
    <div className="page-heading"><div><h1>Good morning, Alex</h1><p>Here’s what’s happening across your workspace.</p></div><button className="primary-button" onClick={onCreateProject}><Icon name="plus" size={18} />Create project</button></div>
    <section className="summary-grid">{cards.map(([label,value,color]) => <article className="summary-card" key={label}><div className="summary-label"><span>{label}</span><i style={{background:color}} /></div><strong style={{color}}>{value}</strong></article>)}</section>
    <section className="dashboard-grid">
      <article className="panel project-progress"><div className="panel-heading"><div><h2>Project progress</h2><p>Completion across active projects</p></div><button className="icon-button"><Icon name="dots" /></button></div><div className="progress-list">{projects.map(project => <div className="progress-item" key={project.name}><div className="progress-meta"><span>{project.name}</span><strong>{project.progress}%</strong></div><div className="progress-track"><i style={{width:`${project.progress}%`,background:project.color}} /></div></div>)}</div></article>
      <article className="panel priorities"><div className="panel-heading"><h2>My priorities</h2></div><div className="priority-list">{tasks.map(([title,due,color]) => <div className="priority-item" key={title}><i style={{background:color}} /><div><strong>{title}</strong><span>{due}</span></div></div>)}</div></article>
    </section>
    <article className="panel activity-panel"><div className="panel-heading"><h2>Recent activity</h2><button className="text-button">View all</button></div><div className="activity-list">{[['MC','Maya Chen','completed API integration test','10 min ago','#45b99a'],['JL','Jordan Lee','assigned you Review API contract','32 min ago','#5b7cfa'],['PS','Priya Shah','commented on Website redesign','1 hour ago','#9b70e7']].map(([initials,name,action,time,color]) => <div className="activity-item" key={name}><div className="avatar" style={{background:color}}>{initials}</div><p><strong>{name}</strong> {action}</p><time>{time}</time></div>)}</div></article>
  </>
}
