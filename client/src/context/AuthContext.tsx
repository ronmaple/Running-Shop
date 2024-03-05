import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const handleLogin = async (email, password) => {
    const payload = JSON.stringify({
      email,
      password,
    })
    try {
      // Todo make this a util
      const response = await (
        await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        })
      ).json()
      if (response.token) {
        setToken(response.token)
        localStorage.setItem('token', response.token)
        navigate('/account')
      }
    } catch (error) {
      console.log('error')
      console.error(error)
      setToken(null)
      // TODO something with error
      // need to generalize the error handling first
      // for validation errors + server errors
    }
  }

  const handleLogout = () => {
    setToken(null)
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
