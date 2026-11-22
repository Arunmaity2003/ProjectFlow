import { useState } from 'react'

export default function ProfilePage() {
  const [editing,setEditing] = useState(false)
  return <>
    <div className="page-heading"><div><h1>My profile</h1><p>View and manage your personal information.</p></div><button className="primary-button" onClick={() => setEditing(value=>!value)}>{editing?'Save changes':'Edit profile'}</button></div>
    <div className="profile-layout"><article className="panel profile-card"><div className="profile-cover"><span>ACME</span></div><div className="profile-main"><div className="profile-avatar">AK</div><h2>Alex Kim</h2><p>Product Designer</p><span className="profile-status">Available</span></div><div className="profile-stats"><div><strong>12</strong><span>Projects</span></div><div><strong>48</strong><span>Tasks</span></div><div><strong>31</strong><span>Completed</span></div></div></article>
    <article className="panel profile-details"><div className="panel-heading"><div><h2>Personal details</h2><p>Your account and contact information</p></div></div><div className="profile-fields">{[['Full name','Alex Kim','text'],['Email address','alex.kim@acme.com','email'],['Phone number','+1 (555) 123-4567','text'],['Job title','Product Designer','text'],['Department','Product & Design','text'],['Location','San Francisco, CA','text']].map(([label,value,type])=> <label key={label}><span>{label}</span><input type={type} defaultValue={value} disabled={!editing} /></label>)}</div></article>
    <article className="panel profile-about"><div className="panel-heading"><h2>About</h2></div><textarea defaultValue="Product designer focused on creating thoughtful, intuitive experiences. Working across design systems, mobile apps, and web platforms." disabled={!editing} /></article>
    <article className="panel profile-work"><div className="panel-heading"><h2>Workspace</h2></div><div className="workspace-info"><div><span>Organization</span><strong>Acme Inc.</strong></div><div><span>Role</span><strong>Administrator</strong></div><div><span>Member since</span><strong>January 2024</strong></div></div></article></div>
  </>
}
