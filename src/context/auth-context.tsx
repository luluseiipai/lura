import { createContext, ReactNode, useContext, useEffect } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    isLoading,
    error,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>()

  // point free  (user) => setUser(user)  ---->  setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useEffect(() => {
    run(bootstrapUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider children={children} value={{ login, register, logout, user }} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }
  return context
}
