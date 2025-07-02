<template>
  <div class="register-page">
    <div class="background-overlay" />

    <v-container class="auth-container">
      <transition name="fade-slide">
        <v-card class="auth-card" elevation="10">
          <v-card-title class="text-center mb-4">
            <h2 class="font-weight-bold">Создайте аккаунт</h2>
            <p class="text-subtitle-2 text-grey-darken-1">Регистрация за минуту!</p>
          </v-card-title>

          <v-form ref="form" v-model="valid" @submit.prevent="onRegister">
            <v-text-field
              v-model="name"
              label="Имя"
              :rules="[rules.required]"
              required
            />
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
              :rules="[rules.required, rules.minLength]"
              required
            />
            <v-text-field
              v-model="passwordConfirm"
              label="Повторите пароль"
              type="password"
              :rules="[rules.passwordMatch]"
              required
            />

            <v-radio-group
              v-model="role"
              row
              class="mt-4"
            >
              <label class="text-caption mb-1">Выберите роль:</label>
              <v-radio label="Студент" value="student" color="primary" />
              <v-radio label="Преподаватель" value="teacher" color="primary" />
            </v-radio-group>

            <v-btn
              color="primary"
              type="submit"
              class="mt-4 rounded-pill"
              :disabled="!valid"
              block
            >
              Зарегистрироваться
            </v-btn>
          </v-form>

          <div class="mt-4 text-center">
            Уже есть аккаунт?
            <RouterLink to="/login" class="login-link">Войти</RouterLink>
          </div>
        </v-card>
      </transition>
    </v-container>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const valid = ref(false)
  const registerForm = ref(null)
  const role = ref('student')

  const store = useStore()
  const router = useRouter()

  
 const rules = {
    required: v => !!v || 'Обязательное поле',
    email: v => /^\S+@\S+\.\S+$/.test(v) || 'Некорректный email',
    minLength: v => v.length >= 6 || 'Мин. 6 символов',
    passwordMatch: v => v === password.value || 'Пароли не совпадают',
  }

  const onRegister = () => {
    if (!valid.value) return

    const userData = {
      name: name.value,
      email: email.value,
      role: role.value,
      avatar: null,
      completedCases: []
    }

    store.commit('user/setUser', userData)
    router.push('/profile') 
  }
</script>

<style scoped>
  .register-page {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(to right, #e3f2fd, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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

  .auth-container {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    border-radius: 16px;
    background: white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    animation: drop-in 0.6s ease-out;
  }

  .fade-slide-enter-active {
    transition: all 0.6s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(40px);
  }

  .login-link {
    color: #1976d2;
    font-weight: 500;
    text-decoration: none;
  }
  .login-link:hover {
    text-decoration: underline;
  }
</style>
