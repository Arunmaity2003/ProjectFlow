import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('alex.kim@acme.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password.')
      return
    }
    localStorage.setItem('projectflow-authenticated', 'true')
    onLogin()
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand"><div className="brand-mark"><span /><span /><span /></div><strong>ProjectFlow</strong></div>
        <div className="login-brand-copy"><span>WORKSPACE</span><h1>Plan better.<br />Deliver together.</h1><p>Keep your projects, tasks, and team in one focused place.</p></div>
        <div className="login-dots"><i /><i /><i /></div>
      </section>
      <section className="login-form-panel">
        <form className="login-form" onSubmit={submit}>
          <div className="login-mobile-brand"><div className="brand-mark"><span /><span /><span /></div><strong>ProjectFlow</strong></div>
          <h2>Welcome back</h2>
          <p>Sign in to continue to your workspace.</p>
          <label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@company.com" /></label>
          <label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
          <div className="login-options"><label><input type="checkbox" /> Remember me</label><button type="button">Forgot password?</button></div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-submit" type="submit">Sign in</button>
          <small>Protected by ProjectFlow Workspace Security</small>
        </form>
      </section>
    </main>
  )
}
