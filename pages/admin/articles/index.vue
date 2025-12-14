<template>
  <div>
    <!-- Admin Header -->
    <AdminHeader />

    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Artikel</h1>
        <p class="text-gray-600 mt-1">Kelola semua artikel website</p>
      </div>
      <NuxtLink
        to="/admin/articles/create"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
        </svg>
        Tambah Artikel
      </NuxtLink>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-500">Loading...</p>
        </div>
        <div v-else-if="articles.length === 0" class="text-center py-8">
          <p class="text-gray-500">Belum ada artikel</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="article in articles" :key="article.article_id">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div v-if="article.image" class="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img :src="getImageUrl(article.image)" :alt="article.title" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ article.title }}</div>
                      <div class="text-sm text-gray-500">{{ truncate(article.subtitle, 60) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="article.is_highlight ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ article.is_highlight ? 'Highlight' : 'Normal' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(article.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink
                    :to="`/admin/articles/${article.id}`"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="confirmDelete(article)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="showDeleteModal = false"></div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Hapus Artikel
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus artikel "{{ articleToDelete?.title }}"? Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="deleteArticle"
              :disabled="deleting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{ deleting ? 'Menghapus...' : 'Hapus' }}
            </button>
            <button
              @click="showDeleteModal = false"
              :disabled="deleting"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const articles = ref([])
const loading = ref(true)
const showDeleteModal = ref(false)
const articleToDelete = ref(null)
const deleting = ref(false)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const truncate = (text, length) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const getImageUrl = (image) => {
  if (!image) return 'https://via.placeholder.com/400x300'
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const fetchArticles = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/article?limit=1000')
    if (response.success) {
      articles.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
  } finally {
    loading.value = false
  }
}

const confirmDelete = (article) => {
  articleToDelete.value = article
  showDeleteModal.value = true
}

const deleteArticle = async () => {
  if (!articleToDelete.value) return

  deleting.value = true
  try {
    const response = await $fetch(`/api/article/${articleToDelete.value.id}`, {
      method: 'DELETE'
    })

    if (response.success) {
      showDeleteModal.value = false
      articleToDelete.value = null
      await fetchArticles()
    }
  } catch (error) {
    console.error('Error deleting article:', error)
    alert('Gagal menghapus artikel')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchArticles()
})
</script>
