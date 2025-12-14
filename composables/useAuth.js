export const useAuth = () => {
  const user = useState('user', () => null)
  const loading = useState('auth-loading', () => false)

  const checkAuth = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/auth/session')
      if (response.success) {
        user.value = response.data
        return true
      }
      user.value = null
      return false
    } catch (error) {
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
      user.value = null
      await navigateTo('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const refreshUser = async () => {
    try {
      const response = await $fetch('/api/auth/session')
      if (response.success) {
        user.value = response.data
        return true
      }
      return false
    } catch (error) {
      console.error('Refresh user error:', error)
      return false
    }
  }

  return {
    user,
    loading,
    checkAuth,
    logout,
    refreshUser
  }
}
