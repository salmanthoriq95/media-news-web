<template>
  <div>
    <NuxtPage />
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

watchEffect(() => {
  if (config.value) {
    useHead({
      title: config.value.web_name || 'Media School Web',
      meta: [
        { name: 'description', content: 'Platform promosi dan informasi SMK' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: config.value.web_icon ? `/uploads/${config.value.web_icon}` : '/favicon.ico'
        }
      ]
    })
  } else {
    useHead({
      title: 'Media School Web',
      meta: [
        { name: 'description', content: 'Platform promosi dan informasi SMK' }
      ]
    })
  }
})
</script>
