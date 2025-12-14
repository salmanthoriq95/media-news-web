export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuth, user } = useAuth()

  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return navigateTo('/login')
  }

  // After authentication, check if user needs to change password
  // Skip check if already on first-login page
  if (to.path !== '/first-login') {
    // Check if user is first login (both boolean true and number 1 from MySQL)
    if (user.value && (user.value.isFirstLogin === true || user.value.isFirstLogin === 1)) {
      return navigateTo('/first-login')
    }
  }
})
