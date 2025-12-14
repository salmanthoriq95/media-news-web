<template>
  <div class="flex-grow bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="py-6 md:py-8 flex items-center justify-between">
        <div>
          <p class="text-orange-500 text-xs md:text-sm uppercase tracking-wide">{{ currentDate }}</p>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-1">{{ config?.web_name || 'Blog' }}</h1>
        </div>
        <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden shadow-lg">
          <img v-if="config?.web_logo" :src="`/uploads/${config.web_logo}`" :alt="config.web_name" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Featured Article (Highlighted Articles Carousel) -->
      <div v-if="featuredArticle" class="mb-8 md:mb-12 relative">
        <NuxtLink :to="`/article/${featuredArticle.id}`">
          <div class="relative rounded-3xl overflow-hidden bg-cover bg-center h-80 md:h-96 lg:h-[500px] shadow-2xl hover:shadow-3xl transition-all duration-500" :style="{ backgroundImage: `url(${getImageUrl(featuredArticle.image)})` }">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <!-- Highlight Badge -->
            <div class="absolute top-4 left-4 md:top-6 md:left-6">
              <span class="px-4 py-2 bg-yellow-500 text-white text-xs md:text-sm font-bold uppercase rounded-full shadow-lg flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                Highlight
              </span>
            </div>

            <!-- Article Info -->
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
              <h2 class="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">{{ featuredArticle.title }}</h2>
              <p v-if="featuredArticle.subtitle" class="text-white/80 text-sm md:text-base mb-4 hidden md:block">{{ featuredArticle.subtitle }}</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img v-if="featuredArticle.author_photo" :src="getImageUrl(featuredArticle.author_photo)" alt="Author" class="w-full h-full object-cover" />
                  <span v-else class="text-white font-medium text-sm">{{ featuredArticle.created_by_name?.charAt(0).toUpperCase() || 'A' }}</span>
                </div>
                <div class="text-white/90 text-sm md:text-base">
                  <p class="font-medium">{{ featuredArticle.created_by_name }}</p>
                  <p class="text-xs md:text-sm">{{ formatTimeAgo(featuredArticle.created_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Carousel Indicators (only show if more than 1 highlighted article) -->
        <div v-if="highlightedArticles.length > 1" class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          <button
            v-for="(article, index) in highlightedArticles"
            :key="article.article_id"
            @click.prevent="goToHighlight(index)"
            class="h-2 rounded-full transition-all duration-300"
            :class="currentHighlightIndex === index ? 'w-8 bg-blue-600' : 'w-2 bg-gray-400 hover:bg-gray-600'"
          ></button>
        </div>

        <!-- Navigation Arrows (only show if more than 1 highlighted article) -->
        <div v-if="highlightedArticles.length > 1" class="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
          <button
            @click.prevent="goToHighlight((currentHighlightIndex - 1 + highlightedArticles.length) % highlightedArticles.length)"
            class="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            @click.prevent="goToHighlight((currentHighlightIndex + 1) % highlightedArticles.length)"
            class="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Popular Section -->
      <div>
        <div class="mb-6">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Popular</h2>
        </div>

        <!-- Popular Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="article in paginatedArticles"
            :key="article.article_id"
            :to="`/article/${article.id}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="relative h-48 md:h-56 overflow-hidden">
              <img :src="getImageUrl(article.image)" :alt="article.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="p-5">
              <h3 class="text-gray-900 font-bold text-base md:text-lg line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">{{ article.title }}</h3>
              <div class="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                <span>{{ formatTimeAgo(article.created_at) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div class="flex gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="w-10 h-10 rounded-lg font-medium transition-colors"
              :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const config = ref(null)
const featuredArticle = ref(null)
const highlightedArticles = ref([])
const popularArticles = ref([])
const currentHighlightIndex = ref(0)
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 6

const currentDate = computed(() => {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

  const now = new Date()
  const day = days[now.getDay()]
  const date = now.getDate()
  const month = months[now.getMonth()]

  return `${day} ${date}, ${month}`
})

const paginatedArticles = computed(() => {
  return popularArticles.value
})

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
  if (!image) return 'https://via.placeholder.com/400x300'
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const fetchArticles = async (page = 1) => {
  try {
    // Fetch non-highlighted articles with pagination
    const response = await $fetch('/api/article/popular', {
      params: {
        page,
        limit: itemsPerPage
      }
    })

    if (response.success) {
      popularArticles.value = response.data.data
      totalPages.value = response.data.pagination.totalPages
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

const fetchData = async () => {
  try {
    // Fetch config
    const configResponse = await $fetch('/api/config')
    if (configResponse.success) {
      config.value = configResponse.data
    }

    // Fetch highlighted articles for hero section
    const highlightedResponse = await $fetch('/api/article/highlighted')
    if (highlightedResponse.success && highlightedResponse.data.length > 0) {
      highlightedArticles.value = highlightedResponse.data
      featuredArticle.value = highlightedResponse.data[0]
    }

    // Fetch articles for popular section
    await fetchArticles(currentPage.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Watch for page changes
watch(currentPage, (newPage) => {
  fetchArticles(newPage)
})

// Auto rotate highlighted articles every 5 seconds
let rotationInterval = null

const startRotation = () => {
  if (highlightedArticles.value.length > 1) {
    rotationInterval = setInterval(() => {
      currentHighlightIndex.value = (currentHighlightIndex.value + 1) % highlightedArticles.value.length
      featuredArticle.value = highlightedArticles.value[currentHighlightIndex.value]
    }, 5000)
  }
}

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
    rotationInterval = null
  }
}

const goToHighlight = (index) => {
  currentHighlightIndex.value = index
  featuredArticle.value = highlightedArticles.value[index]
  stopRotation()
  startRotation()
}

onMounted(() => {
  fetchData().then(() => {
    startRotation()
  })
})

onUnmounted(() => {
  stopRotation()
})
</script>
