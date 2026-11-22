import Icon from '../../../shared/components/Icon.jsx'

export default function SimplePage({ title, description }) {
  const icon = title === 'Notifications' ? 'bell' : title === 'Reports' ? 'chart' : title === 'Sprint board' ? 'board' : 'settings'
  return <><div className="page-heading"><div><h1>{title}</h1><p>{description}</p></div></div><div className="empty-panel"><div className="empty-icon"><Icon name={icon} size={28} /></div><h2>{title} workspace</h2><p>This area is ready for your team’s {title.toLowerCase()} data.</p></div></>
}
