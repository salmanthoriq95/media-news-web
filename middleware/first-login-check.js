export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth()

  // Skip if going to first-login page or login page
  if (to.path === '/first-login' || to.path === '/login') {
    return
  }

  // Check if user is first login (both boolean true and number 1 from MySQL)
  if (user.value && (user.value.isFirstLogin === true || user.value.isFirstLogin === 1)) {
    return navigateTo('/first-login')
  }
})
