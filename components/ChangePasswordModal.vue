<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Ubah Password</h2>
        <p class="text-gray-600">Ini adalah login pertama Anda. Silakan ubah password Anda untuk melanjutkan.</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-800">{{ errorMessage }}</p>
        </div>

        <div class="space-y-4">
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
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            <p class="mt-1 text-xs text-gray-500">
              Minimal 8 karakter, kombinasi huruf besar, huruf kecil, angka, dan simbol
            </p>
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
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Konfirmasi password baru"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

        <div class="mt-6">
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {{ loading ? 'Menyimpan...' : 'Ubah Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['success'])

const { refreshUser } = useAuth()

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

      // Emit success event
      emit('success')

      // Reset form
      form.value = {
        newPassword: '',
        confirmPassword: ''
      }
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Gagal mengubah password'
  } finally {
    loading.value = false
  }
}
</script>
