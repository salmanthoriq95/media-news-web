<template>
  <div>
    <!-- Admin Header -->
    <AdminHeader />

    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <p class="text-gray-600 mt-1">Kelola semua pengguna sistem</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
        </svg>
        Tambah User
      </button>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-500">Loading...</p>
        </div>
        <div v-else-if="users.length === 0" class="text-center py-8">
          <p class="text-gray-500">Belum ada user</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Dibuat
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.user_id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center mr-3 flex-shrink-0">
                      <img
                        v-if="user.photo"
                        :src="getImageUrl(user.photo)"
                        :alt="user.name"
                        class="w-full h-full object-cover"
                      />
                      <span v-else class="text-white font-medium text-sm">{{ getInitials(user.name) }}</span>
                    </div>
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="user.is_first_login ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'"
                  >
                    {{ user.is_first_login ? 'First Login' : 'Active' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center gap-3">
                    <button
                      @click="openEditModal(user)"
                      class="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      v-if="users.length > 1"
                      @click="openDeleteModal(user)"
                      class="text-red-600 hover:text-red-900 font-medium"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeDeleteModal"></div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
                  Hapus User
                </h3>
                <div>
                  <p class="text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus user <strong>{{ deleteUser?.name }}</strong>? Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
            </div>

            <div v-if="deleteErrorMessage" class="mt-4 rounded-md bg-red-50 p-4">
              <p class="text-sm text-red-800">{{ deleteErrorMessage }}</p>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="confirmDelete"
              :disabled="deleting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{ deleting ? 'Menghapus...' : 'Hapus' }}
            </button>
            <button
              type="button"
              @click="closeDeleteModal"
              :disabled="deleting"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeEditModal"></div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="updateUser">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Edit User
              </h3>

              <div v-if="editErrorMessage" class="mb-4 rounded-md bg-red-50 p-4">
                <p class="text-sm text-red-800">{{ editErrorMessage }}</p>
              </div>

              <div class="space-y-4">
                <div>
                  <label for="edit_name" class="block text-sm font-medium text-gray-700 mb-2">
                    Nama <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="edit_name"
                    v-model="editForm.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama"
                  />
                </div>

                <div>
                  <label for="edit_email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="edit_email"
                    v-model="editForm.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Foto Profil
                  </label>
                  <ImageUpload v-model="editForm.photo" />
                </div>

                <div class="pt-4 border-t border-gray-200">
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Ubah Password
                    </label>
                    <button
                      type="button"
                      @click="showPasswordFields = !showPasswordFields"
                      class="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {{ showPasswordFields ? 'Batal ubah password' : 'Klik untuk ubah password' }}
                    </button>
                  </div>

                  <div v-if="showPasswordFields" class="space-y-4 mt-4">
                    <div>
                      <label for="edit_password" class="block text-sm font-medium text-gray-700 mb-2">
                        Password Baru
                      </label>
                      <div class="relative">
                        <input
                          id="edit_password"
                          v-model="editForm.password"
                          :type="showPassword ? 'text' : 'password'"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Masukkan password baru"
                        />
                        <button
                          type="button"
                          @click="showPassword = !showPassword"
                          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                          </svg>
                        </button>
                      </div>
                      <p class="mt-1 text-xs text-gray-500">
                        Minimal 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol
                      </p>
                    </div>

                    <div>
                      <label for="edit_password_confirm" class="block text-sm font-medium text-gray-700 mb-2">
                        Konfirmasi Password Baru
                      </label>
                      <div class="relative">
                        <input
                          id="edit_password_confirm"
                          v-model="editForm.passwordConfirm"
                          :type="showPasswordConfirm ? 'text' : 'password'"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Konfirmasi password baru"
                        />
                        <button
                          type="button"
                          @click="showPasswordConfirm = !showPasswordConfirm"
                          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          <svg v-if="showPasswordConfirm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                :disabled="updating"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ updating ? 'Menyimpan...' : 'Update' }}
              </button>
              <button
                type="button"
                @click="closeEditModal"
                :disabled="updating"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Create User Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeCreateModal"></div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="createUser">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Tambah User Baru
              </h3>

              <div v-if="createErrorMessage" class="mb-4 rounded-md bg-red-50 p-4">
                <p class="text-sm text-red-800">{{ createErrorMessage }}</p>
              </div>

              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Nama <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="createForm.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="createForm.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email"
                  />
                  <p class="mt-1 text-sm text-gray-500">Password akan digenerate otomatis dan dikirim via email</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                :disabled="creating"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ creating ? 'Menyimpan...' : 'Simpan' }}
              </button>
              <button
                type="button"
                @click="closeCreateModal"
                :disabled="creating"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Batal
              </button>
            </div>
          </form>
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

const { user: currentUser, refreshUser } = useAuth()

const users = ref([])
const loading = ref(true)
const showCreateModal = ref(false)
const creating = ref(false)
const createErrorMessage = ref('')
const showEditModal = ref(false)
const updating = ref(false)
const editErrorMessage = ref('')
const showDeleteModal = ref(false)
const deleteUser = ref(null)
const deleting = ref(false)
const deleteErrorMessage = ref('')

const createForm = ref({
  name: '',
  email: ''
})

const editForm = ref({
  user_id: null,
  name: '',
  email: '',
  photo: '',
  password: '',
  passwordConfirm: ''
})

const showPasswordFields = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const getImageUrl = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `/uploads/${image}`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/user')
    if (response.success) {
      users.value = response.data
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const closeCreateModal = () => {
  showCreateModal.value = false
  createForm.value = {
    name: '',
    email: ''
  }
  createErrorMessage.value = ''
}

const createUser = async () => {
  creating.value = true
  createErrorMessage.value = ''

  try {
    const response = await $fetch('/api/user/create', {
      method: 'POST',
      body: {
        name: createForm.value.name,
        email: createForm.value.email
      }
    })

    if (response.success) {
      closeCreateModal()
      await fetchUsers()
    }
  } catch (error) {
    createErrorMessage.value = error.data?.message || 'Gagal membuat user'
  } finally {
    creating.value = false
  }
}

const openEditModal = (user) => {
  editForm.value = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    photo: user.photo || '',
    password: '',
    passwordConfirm: ''
  }
  showPasswordFields.value = false
  showPassword.value = false
  showPasswordConfirm.value = false
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    user_id: null,
    name: '',
    email: '',
    photo: '',
    password: '',
    passwordConfirm: ''
  }
  showPasswordFields.value = false
  showPassword.value = false
  showPasswordConfirm.value = false
  editErrorMessage.value = ''
}

const validatePassword = (password) => {
  if (!password) return null

  if (password.length < 8) {
    return 'Password minimal 8 karakter'
  }
  if (!/[a-z]/.test(password)) {
    return 'Password harus mengandung huruf kecil'
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password harus mengandung huruf besar'
  }
  if (!/[0-9]/.test(password)) {
    return 'Password harus mengandung angka'
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password harus mengandung simbol (!@#$%^&* dll)'
  }
  return null
}

const updateUser = async () => {
  updating.value = true
  editErrorMessage.value = ''

  try {
    // Validate password if provided
    if (showPasswordFields.value && editForm.value.password) {
      const passwordError = validatePassword(editForm.value.password)
      if (passwordError) {
        editErrorMessage.value = passwordError
        updating.value = false
        return
      }

      if (editForm.value.password !== editForm.value.passwordConfirm) {
        editErrorMessage.value = 'Password tidak cocok'
        updating.value = false
        return
      }
    }

    const payload = {
      name: editForm.value.name,
      email: editForm.value.email,
      photo: editForm.value.photo
    }

    // Include password if provided
    if (showPasswordFields.value && editForm.value.password) {
      payload.password = editForm.value.password
    }

    const response = await $fetch(`/api/user/${editForm.value.user_id}`, {
      method: 'PUT',
      body: payload
    })

    if (response.success) {
      closeEditModal()
      await fetchUsers()

      // Refresh session if user edited themselves
      if (currentUser.value?.userId === editForm.value.user_id) {
        await refreshUser()
      }
    }
  } catch (error) {
    editErrorMessage.value = error.data?.message || 'Gagal mengupdate user'
  } finally {
    updating.value = false
  }
}

const openDeleteModal = (user) => {
  deleteUser.value = user
  deleteErrorMessage.value = ''
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteUser.value = null
  deleteErrorMessage.value = ''
}

const confirmDelete = async () => {
  if (!deleteUser.value) return

  deleting.value = true
  deleteErrorMessage.value = ''

  try {
    const response = await $fetch(`/api/user/${deleteUser.value.user_id}`, {
      method: 'DELETE'
    })

    if (response.success) {
      closeDeleteModal()
      await fetchUsers()
    }
  } catch (error) {
    deleteErrorMessage.value = error.data?.message || 'Gagal menghapus user'
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
