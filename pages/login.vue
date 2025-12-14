<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login Admin
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Media School Web - Administrator
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ errorMessage }}
              </h3>
            </div>
          </div>
        </div>

        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
    </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-4 mt-auto">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm md:text-base">
          &copy; {{ new Date().getFullYear() }} Copyright by Salman. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    })

    if (response.success) {
      // Redirect to admin dashboard
      await navigateTo('/admin')
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Login gagal. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>
