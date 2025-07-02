<template>
  <v-card class="profile-card" elevation="4">
    <v-row no-gutters>
      <!-- Аватар -->
      <v-col cols="12" md="4" class="avatar-section">
        <div class="avatar-wrapper" @click="triggerFileInput">
          <v-avatar size="120" class="shadow-avatar">
            <v-img :src="safeAvatar" cover />
          </v-avatar>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handleFileUpload"
          />
          <p class="change-avatar-hint">Сменить фото</p>
        </div>
      </v-col>

      <!-- Данные -->
      <v-col cols="12" md="8" class="info-section">
        <h2 class="text-h6 font-weight-bold mb-2">👨‍⚕️ {{ user.name }}</h2>
        <p class="mb-1">
          <v-icon start color="primary">mdi-email-outline</v-icon>
          {{ user.email }}
        </p>
        <p>
          <v-icon start color="primary">mdi-badge-account-outline</v-icon>
          {{ user.role || 'Пользователь' }}
        </p>
        <v-btn
          color="primary"
          class="mt-4 rounded-pill"
          @click="$emit('edit')"
        >
          ✏️ Редактировать профиль
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import defaultAvatar from '@/assets/images/default-avatar.png'

const store = useStore()
const user = computed(() => store.state.user.userData || {})

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      const updatedUser = {
        ...user.value,
        avatar: reader.result,
      }
      store.commit('user/setUser', updatedUser)
    }
    reader.readAsDataURL(file)
  }
}


const safeAvatar = computed(() => {
  if (user.value.avatar && user.value.avatar.trim() !== '') {
    return user.value.avatar
  } else {
    return defaultAvatar
  }
})

</script>

<style scoped>
.profile-card {
  background: linear-gradient(135deg, #e3f2fd, #ffffff);
  padding: 24px;
  border-radius: 16px;
  animation: fadeIn 0.5s ease;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 12px;
}

.shadow-avatar {
  border: 3px solid #90caf9;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
  transition: transform 0.2s;
}

.shadow-avatar:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.change-avatar-hint {
  font-size: 0.75rem;
  color: #607d8b;
  margin-top: 8px;
  margin-left: 16px;
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.d-none {
  display: none;
}
</style>
