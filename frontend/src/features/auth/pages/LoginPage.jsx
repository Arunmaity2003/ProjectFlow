import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/')
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-brand">
          <div className="brand-mark"><span /><span /><span /></div>
          <strong>ProjectFlow</strong>
        </div>
        <div className="auth-heading">
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to continue to your workspace.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label><span>Email address</span><input type="email" name="email" placeholder="you@company.com" required /></label>
          <label><span>Password</span><div className="password-field"><input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
          <div className="auth-options"><label><input type="checkbox" />Remember me</label><button type="button">Forgot password?</button></div>
          <button className="auth-submit" type="submit">Sign in</button>
        </form>
      </section>
    </main>
  )
}
