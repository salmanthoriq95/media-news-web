<template>
  <div>
    <!-- Admin Header -->
    <AdminHeader />

    <div class="mb-6">
      <NuxtLink to="/admin/articles" class="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
        <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
        Kembali
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900 mt-2">Tambah Artikel</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
      <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 p-4">
        <p class="text-sm text-red-800">{{ errorMessage }}</p>
      </div>

      <div class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Judul <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan judul artikel"
          />
        </div>

        <div>
          <label for="subtitle" class="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            id="subtitle"
            v-model="form.subtitle"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan subtitle artikel"
          />
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
            Konten <span class="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            v-model="form.content"
            required
            rows="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan konten artikel"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Gambar Artikel
          </label>
          <ImageUpload v-model="form.image" />
        </div>

        <div class="flex items-center">
          <input
            id="is_highlight"
            v-model="form.is_highlight"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="is_highlight" class="ml-2 block text-sm text-gray-900">
            Jadikan artikel highlight
          </label>
        </div>
      </div>

      <div class="mt-6 flex gap-4">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan Artikel' }}
        </button>
        <NuxtLink
          to="/admin/articles"
          class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Batal
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const router = useRouter()

const form = ref({
  title: '',
  subtitle: '',
  content: '',
  image: '',
  is_highlight: false
})

const loading = ref(false)
const errorMessage = ref('')

const formatContentForSave = (content) => {
  if (!content) return ''
  // Split by double newlines to create paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  // Return as JSON array if multiple paragraphs, otherwise plain text
  return paragraphs.length > 1 ? JSON.stringify(paragraphs) : content
}

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const payload = {
      title: form.value.title,
      subtitle: form.value.subtitle || null,
      content: formatContentForSave(form.value.content),
      image: form.value.image || null,
      is_highlight: Boolean(form.value.is_highlight)
    }

    const response = await $fetch('/api/article/create', {
      method: 'POST',
      body: payload
    })

    if (response.success) {
      await router.push('/admin/articles')
    }
  } catch (error) {
    errorMessage.value = error.data?.message || 'Gagal menyimpan artikel'
  } finally {
    loading.value = false
  }
}
</script>
