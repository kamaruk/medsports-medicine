<template>
  <v-container class="py-10 case-step-container">
    <!-- Если НЕ авторизован -->
    <div v-if="!isAuthenticated" class="text-center">
      <v-card class="pa-6 rounded-lg elevation-5">
        <v-icon color="primary" size="64">mdi-lock-outline</v-icon>
        <h2 class="mt-4 font-weight-bold">Доступ ограничен</h2>
        <p class="text-body-1 mb-4">
          Чтобы пройти кейс, пожалуйста, авторизуйтесь.
        </p>
        <v-btn color="primary" to="/login" rounded size="large">
          Войти
        </v-btn>
      </v-card>
    </div>

    <!-- Если авторизован — показываем шаги -->
    <div v-else>
      <div class="d-flex justify-end mb-4" v-if="caseData">
        <v-chip color="primary" variant="tonal" class="text-subtitle-2">
          Шаг {{ currentStepDisplay }} из {{ totalSteps }}
        </v-chip>
      </div>

      <!-- Таймер -->
      <div class="d-flex justify-end align-center mb-2" v-if="step?.type === 'question'">
        <v-icon color="grey" class="mr-2">mdi-timer-outline</v-icon>
        <span class="text-caption">{{ remainingTime }} сек.</span>
      </div>

      <!-- Контент шага -->
      <v-card v-if="step" class="pa-6 rounded-lg elevation-5">
        <template v-if="step.type === 'question'">
          <h2 class="text-h6 font-weight-bold mb-6">{{ step.question }}</h2>

          <!-- Варианты ответа -->
          <v-btn
            v-for="(option, idx) in step.options"
            :key="idx"
            block
            rounded
            size="large"
            class="mb-3 text-body-1"
            :color="selected === idx ? (option.correct ? 'success' : 'error') : 'primary'"
            :disabled="selected !== null || timeOut"
            @click="selectOption(idx)"
          >
            {{ option.text }}
          </v-btn>

          <!-- Показываем алерт если выбрано или время вышло -->
          <v-alert
            v-if="selected !== null"
            :type="step.options[selected]?.correct ? 'success' : 'error'"
            class="mt-4"
            variant="tonal"
          >
            {{ step.explanation }}
          </v-alert>

          <v-alert
            v-if="caseFailed"
            type="error"
            class="mt-4"
            variant="tonal"
          >
            Время вышло! Кейс не пройден. Попробуйте пройти его снова.
          </v-alert>

          <!-- Кнопка для возврата -->
          <div v-if="caseFailed" class="text-right mt-6">
            <v-btn color="primary" to="/cases" rounded size="large">
              Вернуться к кейсам
            </v-btn>
          </div>


        </template>

        <template v-else-if="step.type === 'info'">
          <v-icon color="primary" size="40">mdi-information-outline</v-icon>
          <p class="text-body-1 mt-3">{{ step.content }}</p>
        </template>

        <div class="text-right mt-6" v-if="!caseFailed">
          <v-btn
            color="primary"
            size="large"
            rounded
            @click="nextStep"
            :disabled="step.type === 'question' && selected === null && !timeOut"
          >
            Следующий шаг
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

      </v-card>

      <!-- Завершение кейса -->
      <div v-else class="text-center py-10">
        <v-icon color="success" size="64">mdi-check-circle-outline</v-icon>
        <h2 class="mt-4 font-weight-bold">Кейс завершён!</h2>
        <p class="text-body-1 mb-2">Правильных ответов: {{ score }} из {{ totalQuestions }}</p>
        <p class="text-body-1 font-weight-medium mb-4">Точность: {{ accuracy }}%</p>
        
        
        <div class="mt-6 text-left" style="max-width: 600px; margin: 0 auto;">
          <h3 class="text-h6 font-weight-bold mb-3">Ваши ответы:</h3>
          <v-list dense>
            <v-list-item
              v-for="answer in userAnswers"
              :key="answer.stepId"
            >
              
                <v-list-item-title>{{ answer.question }}</v-list-item-title>
                <v-list-item-subtitle>
                  Вы выбрали: {{ answer.selectedOption }} — 
                  <strong>{{ answer.isCorrect ? '✅ Верно' : '❌ Неверно' }}</strong>
                </v-list-item-subtitle>
              
            </v-list-item>
          </v-list>
        </div>
        
        <v-btn color="primary" to="/cases" rounded size="large">
          Вернуться к кейсам
        </v-btn>
        <p class="text-body-1 font-weight-medium mb-4">
          Статус: <strong>{{ accuracy >= 80 ? 'Успешно пройден' : 'Не пройден' }}</strong>
        </p>
      </div>
    </div>
  </v-container>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount, watch, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  const store = useStore()
  const route = useRoute()

  const isAuthenticated = computed(() => store.state.user.isAuthenticated)

  const caseId = Number(route.params.id)
  const caseData = computed(() =>
    store.getters['cases/allCases'].find(c => c.id === caseId)
  )

  const currentStepIndex = ref(0)
  const selected = ref(null)
  const score = ref(0)
  const timer = ref(null)
  const timeOut = ref(false)
  const caseFailed = ref(false)
  const remainingTime = ref(10)

  const userAnswers = ref([])

  const step = computed(() => caseData.value?.steps?.[currentStepIndex.value] || null)
  const totalSteps = computed(() => caseData.value?.steps?.length || 0)
  const currentStepDisplay = computed(() => {
    return Math.min(currentStepIndex.value + 1, totalSteps.value)
  })

  const totalQuestions = computed(() =>
    caseData.value?.steps?.filter(s => s.type === 'question').length || 0
  )
  const accuracy = computed(() =>
    totalQuestions.value > 0 ? Math.round((score.value / totalQuestions.value) * 100) : 0
  )

  function selectOption(index) {
    if (selected.value === null && !timeOut.value) {
      selected.value = index
      const isCorrect = step.value.options[index].correct
      if (isCorrect) score.value++
      userAnswers.value.push({
        stepId: step.value.id,
        question: step.value.question,
        selectedOption: step.value.options[index].text,
        isCorrect
      })
      clearInterval(timer.value)
    }
  }


  function nextStep() {
    if (caseFailed.value) return 
    selected.value = null
    timeOut.value = false
    currentStepIndex.value++
    if (currentStepIndex.value < totalSteps.value) {
      resetTimer()
    } else {
      clearInterval(timer.value)
    }
  }

  function startTimer() {
    remainingTime.value = 10
    timer.value = setInterval(() => {
      remainingTime.value--
      if (remainingTime.value <= 0) {
        clearInterval(timer.value)
        if (selected.value === null) {
          timeOut.value = true
          caseFailed.value = true
          
          finishCaseAsFailed()
        }
      }
    }, 1000)
  }

  function finishCaseAsFailed() {
    if (caseData.value && isAuthenticated.value) {
      store.commit('user/saveCompletedCase', {
        id: caseData.value.id,
        title: caseData.value.title,
        date: new Date().toISOString().split('T')[0],
        accuracy: 0,
        status: 'failed',
        answers: userAnswers.value
      })
      store.dispatch('achievements/checkAchievements')
    }
  }


  function resetTimer() {
    if (step.value?.type === 'question') {
      clearInterval(timer.value)
      startTimer()
    } else {
      clearInterval(timer.value)
    }
  }

  onMounted(() => {
    if (isAuthenticated.value) {
      resetTimer()
    }
  })
  onBeforeUnmount(() => clearInterval(timer.value))
  watch(step, resetTimer)

  watchEffect(() => {
    if (!step.value && caseData.value && isAuthenticated.value) {
      const isSuccess = accuracy.value >= 80
      store.commit('user/saveCompletedCase', {
        id: caseData.value.id,
        title: caseData.value.title,
        date: new Date().toISOString().split('T')[0],
        accuracy: accuracy.value,
        status: isSuccess ? 'success' : 'failed',
        answers: userAnswers.value
      })
      store.dispatch('achievements/checkAchievements')
    }
  })
</script>


<style scoped>  
    .case-step-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    }

    .step-question {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0d47a1;
    }

    .option-btn {
    font-weight: 500;
    letter-spacing: 0.5px;
    }

    .option-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

   .info-text {
    font-size: 1.1rem;
    color: #444;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    }

    .explanation-alert {
    font-size: 0.95rem;
    }

    .card-step {
    border: 1px solid #e0e0e0;
    background: #ffffff;
    }

    .finish-section {
    animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    }
</style>