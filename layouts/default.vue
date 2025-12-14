<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <slot />

    <!-- Bottom Navigation for Mobile -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 shadow-lg">
      <div class="flex items-center justify-around h-16 px-4">
        <NuxtLink to="/" class="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors" :class="{ 'text-blue-600': $route.path === '/' }">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          <span class="text-xs font-medium">Home</span>
        </NuxtLink>

        <button class="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-xs font-medium">Search</span>
        </button>

        <NuxtLink to="/login" class="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors" :class="{ 'text-blue-600': $route.path === '/login' }">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-xs font-medium">Profile</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Top Navigation for Desktop -->
    <nav class="hidden md:block fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div v-if="config?.web_logo" class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden shadow-lg">
              <img :src="`/uploads/${config.web_logo}`" :alt="config.web_name" class="w-full h-full object-cover" />
            </div>
            <span class="text-xl font-bold text-gray-900">{{ config?.web_name || 'Blog' }}</span>
          </NuxtLink>

          <div class="flex items-center gap-6">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors" :class="{ 'text-blue-600': $route.path === '/' }">
              Home
            </NuxtLink>
            <button class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Categories
            </button>
            <button class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </button>
            <NuxtLink to="/login" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Spacer for fixed nav on desktop -->
    <div class="hidden md:block h-16"></div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-4 mt-auto mb-16 md:mb-0">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm md:text-base">
          &copy; {{ new Date().getFullYear() }} Copyright by Salman. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const config = ref(null)

const fetchConfig = async () => {
  try {
    const response = await $fetch('/api/config')
    if (response.success) {
      config.value = response.data
    }
  } catch (error) {
    console.error('Error fetching config:', error)
  }
}

onMounted(() => {
  fetchConfig()
})
</script>
