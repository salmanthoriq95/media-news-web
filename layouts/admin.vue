<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800">
        <div class="mb-5 px-3 py-2">
          <h1 class="text-xl font-bold text-white">Media School Web</h1>
          <p class="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        <ul class="space-y-2 font-medium">
          <li>
            <NuxtLink
              to="/admin"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
              :class="{ 'bg-gray-700 text-white': $route.path === '/admin' }"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              <span class="ml-3">Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/articles"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
              :class="{ 'bg-gray-700 text-white': $route.path.startsWith('/admin/articles') }"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-3">Artikel</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/users"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
              :class="{ 'bg-gray-700 text-white': $route.path.startsWith('/admin/users') }"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <span class="ml-3">Users</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/config"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
              :class="{ 'bg-gray-700 text-white': $route.path.startsWith('/admin/config') }"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-3">Konfigurasi</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="sm:ml-64">
      <!-- Top Navigation -->
      <nav class="bg-white border-b border-gray-200">
        <div class="px-4 py-3 lg:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <button
                @click="sidebarOpen = !sidebarOpen"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-medium text-gray-900">{{ user?.name || 'Admin' }}</p>
                <p class="text-xs text-gray-500">{{ user?.email || '' }}</p>
              </div>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shadow-md hover:shadow-lg"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <main class="p-4 lg:p-6 flex-grow">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-4 mt-auto">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p class="text-sm md:text-base">
            &copy; {{ new Date().getFullYear() }} Copyright by Salman. All rights reserved.
          </p>
        </div>
      </footer>
    </div>

  </div>
</template>

<script setup>
const { user, logout } = useAuth()
const sidebarOpen = ref(false)

const handleLogout = async () => {
  await logout()
}
</script>
