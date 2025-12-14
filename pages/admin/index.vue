<template>
  <div>
    <!-- Admin Header -->
    <AdminHeader />

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Kelola konten dan pengaturan website Anda</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Total Articles -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-blue-100 text-sm font-medium">Total Artikel</p>
            <p class="text-4xl font-bold mt-2">{{ stats.totalArticles }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-lg">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
        <NuxtLink to="/admin/articles" class="text-blue-100 text-sm hover:text-white flex items-center">
          Lihat semua artikel
          <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </NuxtLink>
      </div>

      <!-- Highlighted Articles -->
      <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-yellow-100 text-sm font-medium">Artikel Highlight</p>
            <p class="text-4xl font-bold mt-2">{{ stats.highlightedArticles }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-lg">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>
        <NuxtLink to="/admin/articles" class="text-yellow-100 text-sm hover:text-white flex items-center">
          Kelola highlight
          <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </NuxtLink>
      </div>

      <!-- Total Users -->
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-green-100 text-sm font-medium">Total Users</p>
            <p class="text-4xl font-bold mt-2">{{ stats.totalUsers }}</p>
          </div>
          <div class="p-3 bg-white/20 rounded-lg">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
          </div>
        </div>
        <NuxtLink to="/admin/users" class="text-green-100 text-sm hover:text-white flex items-center">
          Kelola users
          <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Articles Management -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
            </svg>
            <h2 class="text-xl font-bold text-white">Kelola Artikel</h2>
          </div>
          <NuxtLink
            to="/admin/articles/create"
            class="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
            </svg>
            Tambah Baru
          </NuxtLink>
        </div>
        <div class="p-6">
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="recentArticles.length === 0" class="text-center py-8">
            <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-gray-500 mb-4">Belum ada artikel</p>
            <NuxtLink to="/admin/articles/create" class="text-blue-600 hover:text-blue-800 font-medium">
              Buat artikel pertama
            </NuxtLink>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="article in recentArticles"
              :key="article.article_id"
              class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <div class="flex items-start flex-1 min-w-0">
                <div v-if="article.image" class="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <img :src="getImageUrl(article.image)" :alt="article.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900 truncate">{{ article.title }}</h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span v-if="article.is_highlight" class="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Highlight
                    </span>
                    <span class="text-xs text-gray-500">{{ formatDate(article.created_at) }}</span>
                  </div>
                </div>
              </div>
              <NuxtLink
                :to="`/admin/articles/${article.id}`"
                class="ml-4 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all"
              >
                Edit
              </NuxtLink>
            </div>
          </div>
          <div v-if="recentArticles.length > 0" class="mt-4 pt-4 border-t border-gray-200">
            <NuxtLink to="/admin/articles" class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center">
              Lihat semua artikel ({{ stats.totalArticles }})
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Config Management -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
            </svg>
            <h2 class="text-xl font-bold text-white">Konfigurasi Website</h2>
          </div>
        </div>
        <div class="p-6">
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
          <div v-else-if="config" class="space-y-4">
            <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-600 mb-1">Nama Website</p>
              <p class="text-lg font-bold text-gray-900">{{ config.web_name }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-600 mb-1">Icon Website</p>
                <p class="text-sm font-semibold text-gray-900">{{ config.web_icon || '-' }}</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-600 mb-1">Logo Website</p>
                <p class="text-sm font-semibold text-gray-900">{{ config.web_logo || '-' }}</p>
              </div>
            </div>

            <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <div class="flex-1">
                  <p class="text-sm font-medium text-purple-900">Terakhir diupdate</p>
                  <p class="text-sm text-purple-700">{{ formatDate(config.updated_at) }}</p>
                </div>
              </div>
            </div>

            <NuxtLink
              to="/admin/config"
              class="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
              Edit Konfigurasi
            </NuxtLink>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500">Konfigurasi tidak ditemukan</p>
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

const stats = ref({
  totalArticles: 0,
  highlightedArticles: 0,
  totalUsers: 0
})

const recentArticles = ref([])
const config = ref(null)
const loading = ref(true)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getImageUrl = (image) => {
  if (!image) return 'https://via.placeholder.com/400x300'
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const fetchDashboardData = async () => {
  loading.value = true
  try {
    // Fetch config
    const configResponse = await $fetch('/api/config')
    if (configResponse.success) {
      config.value = configResponse.data
    }

    // Fetch articles
    const articlesResponse = await $fetch('/api/article?limit=100')
    if (articlesResponse.success) {
      const articles = articlesResponse.data.data
      stats.value.totalArticles = articlesResponse.data.pagination.total
      stats.value.highlightedArticles = articles.filter(a => a.is_highlight).length
      recentArticles.value = articles.slice(0, 5)
    }

    // Fetch users count
    try {
      const usersResponse = await $fetch('/api/user')
      if (usersResponse.success) {
        stats.value.totalUsers = usersResponse.data.length
      }
    } catch (error) {
      stats.value.totalUsers = 1
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>
