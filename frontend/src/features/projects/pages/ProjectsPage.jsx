import Icon from '../../../shared/components/Icon.jsx'
import { projectData } from '../projectData.js'

export default function ProjectsPage({ onCreateProject }) {
  return <>
    <div className="page-heading"><div><h1>Projects</h1><p>Manage projects across your workspace.</p></div><button className="primary-button" onClick={onCreateProject}><Icon name="plus" size={18} />New project</button></div>
    <div className="project-grid">{projectData.concat([{name:'Customer portal',code:'PORT',progress:35,status:'At risk',color:'#34ae91',owner:'AK',due:'Dec 04'}]).map(project => <article className="project-card" key={project.name}><div className="project-card-top"><div className="project-mark" style={{background:project.color}}>{project.code.slice(0,2)}</div><button className="icon-button"><Icon name="dots" /></button></div><h2>{project.name}</h2><span className={`status ${project.status==='At risk'?'risk':''}`}>{project.status}</span><div className="project-progress-row"><span>Progress</span><strong>{project.progress}%</strong></div><div className="progress-track"><i style={{width:`${project.progress}%`,background:project.color}} /></div><footer><div className="avatar small">{project.owner}</div><span>Due {project.due}</span></footer></article>)}</div>
  </>
}
