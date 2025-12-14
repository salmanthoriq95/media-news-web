<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <!-- Profile Photo -->
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden shadow-lg flex-shrink-0">
          <img
            v-if="user?.photo"
            :src="getImageUrl(user.photo)"
            :alt="user.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            {{ userInitial }}
          </div>
        </div>

        <!-- Welcome Message -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            Selamat datang, {{ user?.name || 'Admin' }}! 👋
          </h2>
          <p class="text-gray-600 mt-1">
            {{ greeting }} Semoga harimu menyenangkan.
          </p>
        </div>
      </div>

      <!-- Current Date -->
      <div class="hidden md:block text-right">
        <p class="text-sm text-gray-500">{{ currentDate }}</p>
        <p class="text-lg font-semibold text-gray-900 mt-1">{{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()

const getImageUrl = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const userInitial = computed(() => {
  if (!user.value?.name) return 'A'
  return user.value.name.charAt(0).toUpperCase()
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat pagi!'
  if (hour < 15) return 'Selamat siang!'
  if (hour < 18) return 'Selamat sore!'
  return 'Selamat malam!'
})

const currentDate = computed(() => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  const now = new Date()
  const day = days[now.getDay()]
  const date = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()

  return `${day}, ${date} ${month} ${year}`
})

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>
