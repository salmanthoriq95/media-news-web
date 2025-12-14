<template>
  <footer class="bg-gray-900 text-white py-4 mt-auto mb-16 md:mb-0">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <p class="text-sm md:text-base">
        &copy; {{ currentYear }} Copyright by Salman. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
