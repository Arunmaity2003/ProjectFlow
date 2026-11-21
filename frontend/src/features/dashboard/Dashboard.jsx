
const sidebarItems = [
  'Overview',
  'My tasks',
  'Projects',
  'Sprint board',
  'Reports',
  'Notifications',
  'Settings',
]

const summaryCards = [
  { label: 'Active projects', value: '12', accent: 'bg-[#4d7ef3]', tone: 'text-[#4d7ef3]' },
  { label: 'Open tasks', value: '48', accent: 'bg-[#8f5ae8]', tone: 'text-[#8f5ae8]' },
  { label: 'Overdue', value: '6', accent: 'bg-[#ef5a5a]', tone: 'text-[#ef5a5a]' },
  { label: 'Completed this week', value: '31', accent: 'bg-[#38c57f]', tone: 'text-[#38c57f]' },
]

const progressProjects = [
  { name: 'Website redesign', progress: 72, color: 'bg-[#4d7ef3]' },
  { name: 'Mobile app', progress: 48, color: 'bg-[#8f5ae8]' },
  { name: 'Payments API', progress: 86, color: 'bg-[#4aa2d8]' },
  { name: 'Customer portal', progress: 35, color: 'bg-[#2fb38d]' },
]

const priorities = [
  { title: 'Review API contract', due: 'Due Today', color: 'bg-[#f05a5a]' },
  { title: 'Prepare sprint demo', due: 'Due Tomorrow', color: 'bg-[#f4a259]' },
  { title: 'Update deployment guide', due: 'Due Oct 29', color: 'bg-[#5c8ef5]' },
  { title: 'Approve design changes', due: 'Due Oct 30', color: 'bg-[#a76ee6]' },
]

const recentActivity = [
  { person: 'Maya Chen', action: 'completed API integration test', time: '10 min ago', color: 'bg-[#2bbf98]' },
  { person: 'Jordan Lee', action: 'assigned you Review API contract', time: '32 min ago', color: 'bg-[#4f93f6]' },
  { person: 'Priya Shah', action: 'commented on Website redesign', time: '1 hour ago', color: 'bg-[#8b5cf6]' },
]

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800">
      <div className="flex min-h-screen">
        <aside className="w-[260px] shrink-0 bg-[#112a4e] px-5 py-7 text-slate-200">
          <div className="px-3 pb-8 pt-2">
            <h1 className="text-4xl font-black leading-none tracking-tight text-white">ProjectFlow</h1>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.26em] text-slate-400">
              Workspace / Acme
            </p>
          </div>

          <nav className="mt-3 space-y-2">
            {sidebarItems.map((item) => {
              const active = item === 'Overview'

              return (
                <button
                  key={item}
                  className={[
                    'flex w-full items-center rounded-xl px-4 py-3 text-left text-xl font-medium transition',
                    active
                      ? 'bg-white/10 text-white shadow-inner shadow-slate-900/10'
                      : 'text-slate-200/80 hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                  type="button"
                >
                  <span className="block w-full">{item}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <header className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-5xl font-semibold tracking-[-0.04em] text-slate-800">
                Good morning, Alex
              </h2>
              <p className="mt-2 text-[1.05rem] text-slate-500">
                Here’s what’s happening across your workspace.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <span className="mr-2 text-xl leading-none">+</span>
              Create project
            </button>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm ring-1 ring-slate-200/80"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[1.05rem] font-medium text-slate-600">{card.label}</div>
                  <div className={`h-7 w-7 rounded-lg ${card.accent}`} />
                </div>
                <div className={`mt-6 text-5xl font-semibold tracking-[-0.04em] ${card.tone}`}>
                  {card.value}
                </div>
              </div>
            ))}
          </section>

          <section className="mt-7 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm ring-1 ring-slate-200/80">
              <h3 className="text-4xl font-semibold tracking-[-0.04em] text-slate-800">Project progress</h3>
              <p className="mt-2 text-[0.95rem] text-slate-500">Completion across active projects</p>

              <div className="mt-7 space-y-6">
                {progressProjects.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[1.1rem] font-medium text-slate-700">{project.name}</span>
                      <span className="text-[1.1rem] font-semibold text-slate-700">{project.progress}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm ring-1 ring-slate-200/80">
              <h3 className="text-4xl font-semibold tracking-[-0.04em] text-slate-800">My priorities</h3>

              <div className="mt-6 space-y-5">
                {priorities.map((priority) => (
                  <div
                    key={priority.title}
                    className="flex items-center gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className={`h-5 w-5 shrink-0 rounded-md ${priority.color}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[1.15rem] font-semibold text-slate-700">{priority.title}</div>
                      <div className="mt-1 text-[0.95rem] text-slate-500">{priority.due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-7 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm ring-1 ring-slate-200/80">
            <h3 className="text-4xl font-semibold tracking-[-0.04em] text-slate-800">Recent activity</h3>

            <div className="mt-6 space-y-4">
              {recentActivity.map((item) => (
                <div key={item.person} className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={`h-6 w-6 rounded-full ${item.color}`} />
                    <div className="text-[1.08rem] text-slate-600">
                      <span className="font-semibold text-slate-800">{item.person}</span>{' '}
                      <span>{item.action}</span>
                    </div>
                  </div>
                  <div className="text-[0.95rem] text-slate-500">{item.time}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard