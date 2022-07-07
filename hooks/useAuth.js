import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'database'

export function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  })

  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, user =>
      setAuthState({ user, pending: false, isSignedIn: !!user })
    )
    return () => checkAuth()
  }, [])

  return { ...authState }
}