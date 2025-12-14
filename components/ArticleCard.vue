<template>
  <div
    class="flex items-start p-5 bg-white rounded-2xl hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
    :class="isLarge ? 'space-x-5' : 'space-x-4'"
    @click="$emit('click')"
  >
    <!-- Thumbnail with date badge -->
    <div
      class="flex-shrink-0 rounded-xl overflow-hidden relative"
      :class="isLarge ? 'w-40 h-40' : 'w-20 h-20'"
      style="background: linear-gradient(135deg, #007EA7, #003459);"
    >
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <svg :class="isLarge ? 'w-16 h-16' : 'w-8 h-8'" class="text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <!-- Date badge -->
      <div class="absolute top-2 right-2 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-bold" style="color: #003459;">
        {{ formatDateShort(article.created_at) }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <h4
        class="font-bold text-gray-900 mb-2 line-clamp-2 transition-colors"
        :class="isLarge ? 'text-xl' : 'text-base'"
        style="line-height: 1.4;"
        :style="{ color: isHovered ? '#007EA7' : '#111827' }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        {{ article.title }}
      </h4>
      <p v-if="showSubtitle" class="text-sm text-gray-600 mb-2 line-clamp-1">
        {{ article.subtitle }}
      </p>
      <p v-if="showContent" class="text-sm text-gray-500 mb-3 line-clamp-2">
        {{ getContentPreview(article.content) }}
      </p>
      <p class="text-xs font-medium" style="color: #007EA7;">
        {{ article.created_by_name || 'Administrator' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  article: {
    type: Object,
    required: true
  },
  showSubtitle: {
    type: Boolean,
    default: false
  },
  showContent: {
    type: Boolean,
    default: false
  },
  isLarge: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const isHovered = ref(false)

const formatDateShort = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short'
  })
}

const getContentPreview = (content) => {
  if (!content) return ''
  try {
    const contentArray = JSON.parse(content)
    if (Array.isArray(contentArray) && contentArray.length > 0) {
      const text = contentArray[0]
      return text.length > 160 ? text.substring(0, 160) + '...' : text
    }
    return ''
  } catch (error) {
    return content.length > 160 ? content.substring(0, 160) + '...' : content
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
