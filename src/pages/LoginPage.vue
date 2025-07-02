<template>
  <div class="login-page">
    <div class="background-overlay" />

    <v-container class="login-container">
      <transition name="slide-fade">
        <v-card class="login-card" elevation="10">
          <v-card-title class="text-center mb-6">
            <h2 class="font-weight-bold">Вход в аккаунт</h2>
            <p class="text-subtitle-2 text-grey-darken-1">Рады видеть вас снова!</p>
          </v-card-title>

          <v-form ref="form" v-model="valid" @submit.prevent="onLogin">
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
            />
            <v-text-field
              v-model="password"
              label="Пароль"
              type="password"
              :rules="[rules.required]"
              required
            />
            <v-btn
              color="primary"
              :disabled="!valid"
              type="submit"
            >
              Войти
            </v-btn>
          </v-form>


          <div class="my-6 text-center divider">
            <span>ИЛИ</span>
          </div>

          <v-btn
            color="red darken-1"
            class="mb-3 rounded-pill"
            block
            @click="loginWith('Google')"
            prepend-icon="mdi-google"
          >
            Войти через Google
          </v-btn>

          <v-btn
            color="blue darken-4"
            class="rounded-pill"
            block
            @click="loginWith('Facebook')"
            prepend-icon="mdi-facebook"
          >
            Войти через Facebook
          </v-btn>

          <div class="mt-6 text-center">
            Нет аккаунта?
            <RouterLink to="/register" class="register-link">
              Зарегистрируйтесь
            </RouterLink>
          </div>
        </v-card>
      </transition>
    </v-container>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const email = ref('')
  const password = ref('')
  const valid = ref(false)
  const form = ref(null)

  const router = useRouter()
  const store = useStore()

  const onLogin = () => {
    store.dispatch('user/login', { email: email.value, password: password.value })
    router.push('/')
  }

  const rules = {
    required: v => !!v || 'Обязательное поле',
    email: v => /^\S+@\S+\.\S+$/.test(v) || 'Некорректный email',
  }

  const loginWith = (provider) => {
    alert(`Вход через ${provider} пока не реализован`)
  }
</script>

<style scoped>

.login-page {
  position: relative;
  min-height: calc(100vh - 64px); 
  background: linear-gradient(to right, #e3f2fd, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}


.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 30%, rgba(25, 118, 210, 0.1), transparent 60%);
  z-index: 0;
  pointer-events: none;
}


.login-container {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
}


.login-card {
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  border-radius: 16px;
  background-color: white;
  animation: drop-in 0.6s ease;
}


.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}


.divider {
  position: relative;
  color: #999;
  font-size: 0.9rem;
}
.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #ccc;
}
.divider::before {
  left: 0;
}
.divider::after {
  right: 0;
}


.register-link {
  color: #1976d2;
  font-weight: 500;
  text-decoration: none;
}
.register-link:hover {
  text-decoration: underline;
}
</style>
