import { useQuery } from '@tanstack/react-query'

async function fetchHealth() {
  const res = await fetch('/actuator/health')
  if (!res.ok) throw new Error('Backend not reachable')
  return res.json()
}

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">ProjectFlow</h1>
        <p className="mt-4 text-slate-600">
          Backend status:{' '}
          {isLoading && 'checking...'}
          {isError && <span className="text-red-600">unreachable</span>}
          {data && <span className="text-green-600">{data.status}</span>}
        </p>
      </div>
    </div>
  )
}