<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Ubah Password Anda</h1>
        <p class="text-gray-600">
          Ini adalah login pertama Anda. Untuk keamanan akun, silakan ubah password Anda terlebih dahulu.
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Password Baru <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="newPassword"
                v-model="form.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
            <div class="mt-2 text-xs text-gray-600 space-y-1">
              <p class="font-medium">Password harus mengandung:</p>
              <ul class="list-disc list-inside space-y-1 ml-2">
                <li :class="form.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'">Minimal 8 karakter</li>
                <li :class="/[a-z]/.test(form.newPassword) ? 'text-green-600' : 'text-gray-500'">Huruf kecil (a-z)</li>
                <li :class="/[A-Z]/.test(form.newPassword) ? 'text-green-600' : 'text-gray-500'">Huruf besar (A-Z)</li>
                <li :class="/[0-9]/.test(form.newPassword) ? 'text-green-600' : 'text-gray-500'">Angka (0-9)</li>
                <li :class="/[!@#$%^&*(),.?\":{}|<>]/.test(form.newPassword) ? 'text-green-600' : 'text-gray-500'">Simbol (!@#$%^&* dll)</li>
              </ul>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Konfirmasi password baru"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-colors"
          >
            {{ loading ? 'Menyimpan...' : 'Ubah Password & Lanjutkan' }}
          </button>
        </div>

        <div class="mt-6 text-center">
          <button
            type="button"
            @click="handleLogout"
            class="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false
})

const { refreshUser, logout } = useAuth()

const form = ref({
  newPassword: '',
  confirmPassword: ''
})

const loading = ref(false)
const errorMessage = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password minimal 8 karakter'
  }

  if (!/[a-z]/.test(password)) {
    return 'Password harus mengandung huruf kecil'
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password harus mengandung huruf besar'
  }

  if (!/[0-9]/.test(password)) {
    return 'Password harus mengandung angka'
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password harus mengandung simbol (!@#$%^&* dll)'
  }

  return null
}

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    // Validate password
    const passwordError = validatePassword(form.value.newPassword)
    if (passwordError) {
      errorMessage.value = passwordError
      loading.value = false
      return
    }

    // Check if passwords match
    if (form.value.newPassword !== form.value.confirmPassword) {
      errorMessage.value = 'Password tidak cocok'
      loading.value = false
      return
    }

    const response = await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: {
        newPassword: form.value.newPassword
      }
    })

    if (response.success) {
      // Refresh user session to update isFirstLogin status
      await refreshUser()

      // Redirect to dashboard
      await navigateTo('/admin')
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Gagal mengubah password'
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await logout()
}
</script>
