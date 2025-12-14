<template>
  <div>
    <!-- Admin Header -->
    <AdminHeader />

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Konfigurasi Website</h1>
      <p class="text-gray-600 mt-1">Kelola pengaturan website Anda</p>
    </div>

    <div v-if="loading" class="bg-white rounded-lg shadow p-6">
      <p class="text-center text-gray-500">Loading...</p>
    </div>

    <form v-else-if="config" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
      <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 p-4">
        <p class="text-sm text-red-800">{{ errorMessage }}</p>
      </div>

      <div v-if="successMessage" class="mb-4 rounded-md bg-green-50 p-4">
        <p class="text-sm text-green-800">{{ successMessage }}</p>
      </div>

      <div class="space-y-6">
        <div>
          <label for="web_name" class="block text-sm font-medium text-gray-700 mb-2">
            Nama Website <span class="text-red-500">*</span>
          </label>
          <input
            id="web_name"
            v-model="form.web_name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama website"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Icon Website (Favicon)
          </label>
          <ImageUpload v-model="form.web_icon" />
          <p class="mt-1 text-sm text-gray-500">Upload icon website (favicon) - recommended size 32x32px atau 64x64px</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Logo Website
          </label>
          <ImageUpload v-model="form.web_logo" />
          <p class="mt-1 text-sm text-gray-500">Upload logo website - recommended format PNG dengan background transparan</p>
        </div>

        <div class="pt-4 border-t border-gray-200">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-600">Terakhir diupdate:</p>
              <p class="font-medium text-gray-900">{{ formatDate(config.updated_at) }}</p>
            </div>
            <div v-if="config.updated_by">
              <p class="text-gray-600">Diupdate oleh:</p>
              <p class="font-medium text-gray-900">User ID: {{ config.updated_by }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <button
          type="submit"
          :disabled="saving"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </form>

    <div v-else class="bg-white rounded-lg shadow p-6">
      <p class="text-center text-gray-500">Konfigurasi tidak ditemukan</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const config = ref(null)
const form = ref({
  web_name: '',
  web_icon: '',
  web_logo: ''
})

const loading = ref(true)
const saving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchConfig = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/config')
    if (response.success) {
      config.value = response.data
      form.value = {
        web_name: config.value.web_name,
        web_icon: config.value.web_icon || '',
        web_logo: config.value.web_logo || ''
      }
    }
  } catch (error) {
    console.error('Error fetching config:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await $fetch('/api/config/update', {
      method: 'PUT',
      body: {
        web_name: form.value.web_name,
        web_icon: form.value.web_icon || null,
        web_logo: form.value.web_logo || null
      }
    })

    if (response.success) {
      successMessage.value = 'Konfigurasi berhasil diupdate'
      await fetchConfig()

      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Gagal menyimpan konfigurasi'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>
