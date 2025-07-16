<template>
  <v-app-bar :color="skyColor" app dark flat elevation="3">
    <!-- Мобильное меню и логотип -->
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
    <v-img :src="logo" alt="Логотип" max-height="36" max-width="36" class="mr-2" />

    <RouterLink to="/" class="d-flex align-center text-decoration-none mr-4">
      <span class="app-title">My Med Trainer</span>
    </RouterLink>

    <!-- Навигация для десктопа -->
    <div class="nav-center d-none d-md-flex">
      <v-btn variant="text" class="nav-btn" to="/">Главная</v-btn>
      <v-btn variant="text" class="nav-btn" to="/cases">Кейсы</v-btn>
      <v-btn variant="text" class="nav-btn" to="/contact">Связаться с нами</v-btn>
    </div>

    <v-spacer />

    <!-- Кнопки справа -->
    <div class="d-none d-md-flex align-center nav-right">
      <template v-if="!isAuthenticated">
        <v-btn variant="outlined" class="nav-btn-outlined" to="/login">Войти</v-btn>
        <v-btn variant="outlined" class="nav-btn-outlined" to="/register">Зарегистрироваться</v-btn>
      </template>
      <template v-else>
        <v-btn variant="text" class="nav-btn" to="/profile">Профиль</v-btn>
        <v-btn variant="outlined" class="nav-btn-outlined" @click="logout">Выйти</v-btn>
      </template>
    </div>
  </v-app-bar>

  <!-- Боковая панель для мобильных -->
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    class="d-md-none"
    disable-resize-watcher
  >
    <v-list>
      <v-list-item to="/" title="Главная" />
      <v-list-item to="/cases" title="Кейсы" />
      <v-list-item to="/contact" title="Связаться с нами" />
      <v-divider class="my-2" />
      <template v-if="!isAuthenticated">
        <v-list-item to="/login" title="Войти" />
        <v-list-item to="/register" title="Регистрация" />
      </template>
      <template v-else>
        <v-list-item to="/profile" title="Профиль" />
        <v-list-item @click="logout" title="Выйти" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import logo from '@/assets/logo.png'

  const drawer = ref(false)
  const store = useStore()
  const router = useRouter()

  const isAuthenticated = computed(() => store.state.user.isAuthenticated)
  const skyColor = '#87CEEB'

  const logout = () => {
    store.commit('user/logout')
    store.commit('achievements/resetAchievements')
    drawer.value = false
    router.push('/login')
  }
</script>

<style scoped>
.app-title {
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.nav-center > * + * {
  margin-left: 16px;
}

.nav-right > * + * {
  right: 12px;
  margin-left: 20px;
}

.nav-btn {
  color: white;
  font-weight: 500;
  text-transform: none;
  border-radius: 24px;
  
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-btn-outlined {
  color: white;
  border-color: white;
  font-weight: 500;
  text-transform: none;
  border-radius: 24px;
  
  transition: background-color 0.2s, color 0.2s;
}

.nav-btn-outlined:hover {
  background-color: white;
  color: #0077b6;
}

.text-decoration-none {
  text-decoration: none;
}

@media (max-width: 960px) {
  .home-row {
    flex-direction: column;
    gap: 3rem;
  }
  .home-text-col {
    align-items: center;
    text-align: center;
  }
  .text-subtitle-1 {
    max-width: 100%;
  }
  .btn-group {
    justify-content: center;
  }
  .custom-carousel {
    width: 100%;
    height: 300px !important;
  }
  .display-1 {
    font-size: 2.5rem;
  }
}
</style>