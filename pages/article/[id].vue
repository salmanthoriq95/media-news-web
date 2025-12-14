<template>
  <div class="flex-grow bg-white pb-20 md:pb-8">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-500">Loading...</p>
      </div>
    </div>

    <div v-else-if="article" class="max-w-4xl mx-auto">
      <!-- Header with Back Button -->
      <div class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6 max-w-4xl mx-auto">
        <button @click="goBack" class="w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>

      <!-- Hero Image -->
      <div class="relative h-64 md:h-96 lg:h-[500px] bg-cover bg-center" :style="{ backgroundImage: `url(${getImageUrl(article.image)})` }">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>

      <!-- Article Content -->
      <div class="px-4 md:px-8 lg:px-12 -mt-16 md:-mt-20 relative z-10">
        <!-- Title -->
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{{ article.title }}</h1>

        <!-- Meta Info -->
        <div class="flex items-center gap-2 text-sm md:text-base text-gray-500 mb-8">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
          </svg>
          <span>{{ formatTimeAgo(article.created_at) }}</span>
        </div>

        <!-- Author Info -->
        <div class="flex items-center gap-4 pb-8 mb-8 border-b-2 border-gray-200">
          <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex-shrink-0 shadow-lg flex items-center justify-center">
            <img v-if="article.author_photo" :src="getImageUrl(article.author_photo)" alt="Author" class="w-full h-full object-cover" />
            <span v-else class="text-white font-bold text-xl">{{ article.created_by_name?.charAt(0).toUpperCase() || 'A' }}</span>
          </div>
          <div>
            <p class="font-bold text-gray-900 text-lg">{{ article.created_by_name }}</p>
            <p class="text-sm md:text-base text-gray-500">Author • {{ formatDate(article.created_at) }}</p>
          </div>
        </div>

        <!-- Subtitle -->
        <p v-if="article.subtitle" class="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium italic border-l-4 border-orange-500 pl-6 py-2">{{ article.subtitle }}</p>

        <!-- Article Content -->
        <div class="prose prose-lg md:prose-xl max-w-none mb-8">
          <div class="text-gray-800 leading-relaxed space-y-6 text-base md:text-lg">
            <div v-if="isJsonContent(article.content)">
              <p v-for="(paragraph, index) in parseJsonContent(article.content)" :key="index" class="mb-6">
                {{ paragraph }}
              </p>
            </div>
            <div v-else v-html="formatContent(article.content)" class="space-y-6"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center min-h-screen">
      <p class="text-gray-500">Artikel tidak ditemukan</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const article = ref(null)
const loading = ref(true)

const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Recently'

  const now = new Date()
  const past = new Date(dateString)

  // Check if date is valid
  if (isNaN(past.getTime())) return 'Recently'

  const diffInSeconds = Math.floor((now - past) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} sec ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return `${Math.floor(diffInSeconds / 2592000)} months ago`
}

const getImageUrl = (image) => {
  if (!image) return 'https://via.placeholder.com/800x600'
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const isJsonContent = (content) => {
  if (!content) return false
  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed)
  } catch {
    return false
  }
}

const parseJsonContent = (content) => {
  try {
    return JSON.parse(content)
  } catch {
    return []
  }
}

const formatContent = (content) => {
  if (!content) return ''
  // Convert newlines to paragraphs
  return content
    .split('\n\n')
    .map(p => `<p class="mb-6">${p}</p>`)
    .join('')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  window.history.back()
}

const fetchArticle = async () => {
  loading.value = true
  try {
    const response = await $fetch(`/api/article/${route.params.id}`)
    if (response.success) {
      article.value = response.data
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticle()
})
</script>
