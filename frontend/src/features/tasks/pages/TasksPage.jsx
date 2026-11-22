import { useState } from 'react'
import Icon from '../../../shared/components/Icon.jsx'

const tasks = [
  {title:'Review API contract',project:'Payments API',assignee:'Alex Kim',due:'Today',priority:'High',done:false,color:'#ef6464'},
  {title:'Prepare sprint demo',project:'Website redesign',assignee:'Maya Chen',due:'Tomorrow',priority:'Medium',done:false,color:'#f1a35b'},
  {title:'Update deployment guide',project:'Customer portal',assignee:'Jordan Lee',due:'Nov 28',priority:'Low',done:false,color:'#5b89ef'},
  {title:'Approve design changes',project:'Mobile app',assignee:'Priya Shah',due:'Nov 30',priority:'Medium',done:true,color:'#9b70e7'},
]

export default function TasksPage() {
  const [filter,setFilter] = useState('All')
  const visible = filter === 'All' ? tasks : filter === 'Completed' ? tasks.filter(task => task.done) : tasks.filter(task => !task.done)
  return <>
    <div className="page-heading"><div><h1>My tasks</h1><p>Stay on top of your work.</p></div><button className="primary-button"><Icon name="plus" size={18} />Add task</button></div>
    <div className="panel task-panel"><div className="task-toolbar"><div className="tabs">{['All','Active','Completed'].map(item => <button className={filter===item?'active':''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><button className="filter-button"><Icon name="calendar" size={17} />Due date</button></div><div className="task-table">{visible.map(task => <div className="task-row" key={task.title}><button className={`task-check ${task.done?'checked':''}`}>{task.done?'✓':''}</button><div className="task-name"><strong>{task.title}</strong><span>{task.project}</span></div><div className="task-assignee"><div className="avatar small">{task.assignee.split(' ').map(name => name[0]).join('')}</div><span>{task.assignee}</span></div><span className={`priority priority-${task.priority.toLowerCase()}`}><i style={{background:task.color}} />{task.priority}</span><time><Icon name="calendar" size={16} />{task.due}</time></div>)}</div></div>
  </>
}
