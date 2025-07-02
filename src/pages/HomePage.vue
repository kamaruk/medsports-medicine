<template>
  <v-container fluid class="py-0" style="padding-left: 0; padding-right: 0;">
    <!-- Приветственный блок -->
    <section class="video-hero">
      <video autoplay muted loop class="video-bg">
        <source src="/videos/1.mp4" type="video/mp4" />
      </video>

      <div class="video-overlay">
        <div class="video-center-content">
          <h1 class="video-title">Добро пожаловать в My Med Trainer</h1>
          <p class="video-subtitle">
            Обучающая платформа для врачей, студентов и клинических специалистов. Погрузись в реальные медицинские кейсы!
          </p>
          <div class="video-btns">
            <v-btn color="primary" class="rounded-pill" to="/cases">
              Перейти к кейсам
            </v-btn>

            <v-btn
              v-if="!isAuthenticated"
              color="secondary"
              class="rounded-pill"
              to="/login"
            >
              Войти
            </v-btn>

            <v-btn
              v-else
              color="secondary"
              class="rounded-pill"
              to="/profile"
            >
              Профиль
            </v-btn>
          </div>
        </div>
      </div>
    </section>

    <!-- Декоративный разделитель между блоками -->
    <div class="divider-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"
          fill="#f5f5f5"
        />
      </svg>
      
    </div>

    <!-- блок почему мы -->
    <v-row class="why-choose-row" justify="center" align="center" >
      <v-col cols="12" class="text-center mb-8">
        <h2 class="why-title">Почему именно наш сайт?</h2>
        <p class="why-subtitle">
          Мы предлагаем уникальный опыт обучения с реальными медицинскими кейсами, современным UI и поддержкой сообщества.
        </p>
      </v-col>

      <v-col
        v-for="(item, index) in reasons"
        :key="index"
        cols="12" sm="4"
        class="text-center"
      >
        <v-icon
          color="primary"
          size="64"
          class="mb-4"
        >
          {{ item.icon }}
        </v-icon>
        <h3 class="reason-title">{{ item.title }}</h3>
        <p class="reason-desc">{{ item.desc }}</p>
      </v-col>
    </v-row>

    <!-- Декоративный разделитель между блоками(обратная) -->
    <div class="divider-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d="M1440,100 C960,0 480,100 0,0 L0,100 L1440,100 Z"
          fill="#f5f5f5"
        />
      </svg>
    </div>

    <!-- Декоративный разделитель между блоками -->
    <div class="divider-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d="M0,0 C480,100 960,0 1440,100 L1440,00 L0,0 Z"
          fill="#f5f5f5"
        />
      </svg>
    </div>

    <!-- Блок "Как это работает" -->
    <v-container class="how-it-works py-10">
      <h2 class="text-center mb-8 why-title">Как это работает</h2>
      <v-row justify="center" align="stretch">
        <v-col
          cols="12"
          sm="3"
          v-for="(step, index) in steps"
          :key="index"
        >
          <v-card class="pa-5 text-center step-card" elevation="2">
            <v-icon size="40" color="primary" class="mb-4">{{ step.icon }}</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ step.title }}</h3>
            <p class="text-body-2">{{ step.desc }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA блок -->
    <v-container class="cta-block text-center py-10">
      <h2 class="text-h5 mb-4 font-weight-bold">Готовы начать?</h2>
      <p class="text-body-1 mb-6">Присоединяйтесь к My Med Trainer и улучшайте свои навыки вместе с профессионалами.</p>
      <v-btn color="white" text class="cta-btn rounded-pill" to="/register">
        Зарегистрироваться
      </v-btn>
    </v-container>

  </v-container>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  const store = useStore()
  const isAuthenticated = computed(() => store.state.user.isAuthenticated)

  const reasons = [
  {
    icon: 'mdi-stethoscope',
    title: 'Реальные кейсы',
    desc: 'Обучение на основе тщательно подобранных медицинских ситуаций.',
  },
  {
    icon: 'mdi-lightbulb-on-outline',
    title: 'Интерактивность',
    desc: 'Интерактивные задания и обратная связь для лучшего понимания.',
  },
  {
    icon: 'mdi-account-group-outline',
    title: 'Поддержка сообщества',
    desc: 'Общайся и обменивайся опытом с профессионалами и студентами.',
  },
  ]

  const steps = [
  { icon: 'mdi-account-plus', title: 'Зарегистрируйтесь', desc: 'Создайте аккаунт за минуту.' },
  { icon: 'mdi-clipboard-check-outline', title: 'Выберите кейс', desc: 'Найдите подходящий клинический случай.' },
  { icon: 'mdi-school-outline', title: 'Пройдите обучение', desc: 'Решайте вопросы и получайте знания.' },
  { icon: 'mdi-certificate-outline', title: 'Получите результат', desc: 'Соберите баллы и улучшайте свои навыки.' },
  ]
</script>

<style scoped>
  .video-hero {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .video-overlay {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.35);
    padding: 1rem 2rem;
    text-align: center;
  }

  .video-content {
    max-width: 800px;
  }

  .video-title {
    font-size: 3.5rem;
    color: white;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  .video-subtitle {
    color: white;
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
  }

  .video-btns {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .divider-wave {
    height: 100px;
    overflow: hidden;
    line-height: 0;
    margin-top: -1px;
  }

  .divider-wave svg {
    display: block;
    width: 100%;
    height: 100px;
  }

  .why-choose-row {
    margin-top: 6rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    gap: 3rem;
  }

  .why-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #0d47a1;
    margin-bottom: 0.5rem;
  }

  .why-subtitle {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .reason-title {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: rgb(14, 161, 197);
  }

  .reason-desc {
    color: #666;
    font-size: 1rem;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

 

  .step-card {
    border-radius: 12px;
    transition: transform 0.3s ease;
  }

  .step-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

 .cta-block {
  background: linear-gradient(to right, #0d47a1, #1976d2);
  color: white;
  border-radius: 24px; 
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .cta-block h2,
  .cta-block p {
    color: white;
  }

  .cta-btn {
    background: white;
    color: #0d47a1;
    font-weight: 600;
    text-transform: none;
  }

  .cta-btn:hover {
    background: #e3f2fd;
    color: #0d47a1;
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