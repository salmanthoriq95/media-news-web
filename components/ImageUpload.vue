<template>
  <div class="space-y-4">
    <!-- Preview Image -->
    <div v-if="previewUrl || modelValue" class="relative w-full max-w-md">
      <img
        :src="previewUrl || getImageUrl(modelValue)"
        alt="Preview"
        class="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
      />
      <button
        v-if="previewUrl || modelValue"
        @click="clearImage"
        type="button"
        class="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>

    <!-- Upload Button and URL Input -->
    <div class="flex gap-3">
      <!-- File Upload Button -->
      <div class="flex-1">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          class="hidden"
        />
        <button
          @click="$refs.fileInput.click()"
          type="button"
          :disabled="uploading"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          <svg v-if="!uploading" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span v-if="uploading" class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          {{ uploading ? 'Uploading...' : 'Upload Image' }}
        </button>
      </div>

      <!-- URL Input (optional) -->
      <div class="flex-1">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          placeholder="Or paste image URL"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

    <!-- Help Text -->
    <p class="text-sm text-gray-500">
      Upload gambar dari komputer Anda (max 5MB) atau masukkan URL gambar
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const previewUrl = ref(null)
const uploading = ref(false)
const error = ref('')

const getImageUrl = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file'
    return
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'File size must not exceed 5MB'
    return
  }

  error.value = ''

  // Show preview
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)

  // Upload file
  await uploadFile(file)
}

const uploadFile = async (file) => {
  uploading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/upload/image', {
      method: 'POST',
      body: formData
    })

    if (response.success) {
      emit('update:modelValue', response.data.filename)
    } else {
      error.value = response.message || 'Upload failed'
      previewUrl.value = null
    }
  } catch (err) {
    error.value = err.data?.message || 'Upload failed. Please try again.'
    previewUrl.value = null
  } finally {
    uploading.value = false
  }
}

const clearImage = () => {
  previewUrl.value = null
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
