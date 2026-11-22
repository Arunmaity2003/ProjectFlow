import { Navigate, Route, Routes, useOutletContext } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import LoginPage from './features/auth/pages/LoginPage.jsx'
import DashboardPage from './features/dashboard/pages/DashboardPage.jsx'
import ProjectsPage from './features/projects/pages/ProjectsPage.jsx'
import TasksPage from './features/tasks/pages/TasksPage.jsx'
import ProfilePage from './features/profile/pages/ProfilePage.jsx'
import SimplePage from './features/workspace/pages/SimplePage.jsx'

function DashboardRoute() {
  const { openProjectModal } = useOutletContext()
  return <DashboardPage onCreateProject={openProjectModal} />
}

function ProjectsRoute() {
  const { openProjectModal } = useOutletContext()
  return <ProjectsPage onCreateProject={openProjectModal} />
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<AppLayout />}>
      <Route index element={<DashboardRoute />} />
      <Route path="projects" element={<ProjectsRoute />} />
      <Route path="tasks" element={<TasksPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="board" element={<SimplePage title="Sprint board" description="Plan and track your team’s sprint." />} />
      <Route path="reports" element={<SimplePage title="Reports" description="Measure progress and team performance." />} />
      <Route path="notifications" element={<SimplePage title="Notifications" description="Review updates and mentions from your team." />} />
      <Route path="settings" element={<SimplePage title="Settings" description="Configure your workspace preferences." />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
