import { createContext, useContext, useMemo, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user] = useState({
    id: 'demo-student',
    name: 'React Student',
    avatar: 'https://i.pravatar.cc/100?img=15',
    role: 'Community Learner',
  })

  const value = useMemo(() => ({ user }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context.user
}
