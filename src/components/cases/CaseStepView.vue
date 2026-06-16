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
        
        <!-- ВОПРОС -->
        <template v-if="step.type === 'question'">
          <h2 class="text-h6 font-weight-bold mb-6">{{ step.question }}</h2>

          <!-- Варианты ответа -->
          <v-btn
            v-for="(option, idx) in step.options"
            :key="idx"
            block
            rounded
            size="large"
            class="mb-3 text-body-1 option-btn" 
            :color="selected === idx ? (isBranching ? 'secondary' : ((option.correct || option.isOptimal) ? 'success' : 'error')) : 'primary'"
            :disabled="selected !== null || timeOut"
            @click="selectOption(idx)"
          >
            {{ option.text }}
          </v-btn>

          <!-- Показываем алерт если выбрано или время вышло -->
          <v-alert
            v-if="selected !== null && !isBranching"
            :type="(step.options[selected]?.correct || step.options[selected]?.isOptimal) ? 'success' : 'error'"
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

          <!-- Кнопка для возврата при провале -->
          <div v-if="caseFailed" class="text-right mt-6">
            <v-btn color="primary" to="/cases" rounded size="large">
              Вернуться к кейсам
            </v-btn>
          </div>
        </template>

        <!-- ИНФОРМАЦИЯ -->
        <template v-else-if="step.type === 'info'">
          <v-icon color="primary" size="40">mdi-information-outline</v-icon>
          <p class="text-body-1 mt-3">{{ step.content }}</p>
        </template>

        <!-- РЕЗУЛЬТАТ (Финал ветвящегося кейса) -->
        <template v-else-if="step.type === 'result'">
          <div class="text-center">
            <v-icon :color="step.status === 'success' ? 'success' : 'error'" size="64">
              {{ step.status === 'success' ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline' }}
            </v-icon>
            <h2 class="mt-4 font-weight-bold">Кейс завершён!</h2>
            <p class="text-body-1 mt-4">{{ step.content }}</p>
            <p class="text-h5 font-weight-medium mt-4" :class="step.status === 'success' ? 'text-success' : 'text-error'">
              Итоговая точность: {{ step.accuracy }}%
            </p>
          </div>

          <!-- История ответов для ветвящегося кейса -->
          <div class="mt-6 text-left answers-scroll-container">
            <h3 class="text-h6 font-weight-bold mb-3">Ваши ответы:</h3>
            <v-list dense class="answers-list">
              <v-list-item
                v-for="(answer, i) in userAnswers"
                :key="i"
              >
                <v-list-item-title>{{ answer.question }}</v-list-item-title>
                <v-list-item-subtitle>
                  Вы выбрали: {{ answer.selectedOption }} — 
                  <strong>{{ answer.isCorrect ? '✅ Оптимально' : '❌ Не оптимально' }}</strong>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>

          <div class="text-center mt-6">
            <v-btn color="primary" to="/cases" rounded size="large">
              Вернуться к кейсам
            </v-btn>
          </div>
        </template>

        <!-- Кнопка "Следующий шаг" (скрывается, если это финальный результат) -->
        <div class="text-right mt-6" v-if="!caseFailed && step.type !== 'result'">
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

      <!-- Завершение ЛИНЕЙНОГО кейса (когда шаги закончились) -->
      <div v-else class="text-center py-10">
        <v-icon color="success" size="64">mdi-check-circle-outline</v-icon>
        <h2 class="mt-4 font-weight-bold">Кейс завершён!</h2>
        <p class="text-body-1 mb-2">Правильных ответов: {{ score }} из {{ totalQuestions }}</p>
        <p class="text-body-1 font-weight-medium mb-4">Точность: {{ accuracy }}%</p>
        
        <div class="mt-6 text-left answers-scroll-container">
          <h3 class="text-h6 font-weight-bold mb-3">Ваши ответы:</h3>
          <v-list dense class="answers-list">
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
  import api from '@/api' 

  const store = useStore()
  const route = useRoute()

  const isAuthenticated = computed(() => store.state.user.isAuthenticated)

  const caseId = Number(route.params.id)
  const caseData = computed(() =>
    store.getters['cases/allCases'].find(c => c.id === caseId)
  )

  // --- ПЕРЕМЕННЫЕ ДЛЯ НАВИГАЦИИ ---
  const currentStepIndex = ref(0) // Для линейных кейсов
  const currentStepId = ref(null)
  const branchingStepCounter = ref(1) 
  const lastSelectedOption = ref(null) // Запоминаем выбор для перехода
  const finalResultSaved = ref(false) // Защита от двойного сохранения
  const finalAccuracy = ref(null) // Для хранения оценки из финального узла

  const selected = ref(null)
  const score = ref(0) 
  const timer = ref(null)
  const timeOut = ref(false)
  const caseFailed = ref(false)
  const remainingTime = ref(10)

  const userAnswers = ref([])

  // --- ИЗВЛЕЧЕНИЕ МАССИВА ШАГОВ (РЕШЕНИЕ ОШИББКИ findIndex) ---
  // Умный геттер, который всегда возвращает массив шагов, независимо от формата кейса
  const stepsArray = computed(() => {
    if (!caseData.value) return []
    const stepsData = caseData.value.steps
    
    // Если старый формат (просто массив)
    if (Array.isArray(stepsData)) return stepsData
    
    // Если новый формат (объект с оберткой)
    if (stepsData?.steps && Array.isArray(stepsData.steps)) return stepsData.steps
    
    return []
  })

  // --- ОПРЕДЕЛЕНИЕ ТИПА КЕЙСА ---
  const isBranching = computed(() => {
    const stepsData = caseData.value?.steps
    if (!stepsData) return false
    if (Array.isArray(stepsData)) return false // Старый линейный формат
    return stepsData.caseType === 'branching' // Новый формат
  })

  // --- УМНЫЙ ВЫЧИСЛИТЕЛЬ ТЕКУЩЕГО ШАГА ---
  const step = computed(() => {
    if (!stepsArray.value.length) return null

    if (isBranching.value) {
      if (!currentStepId.value) return stepsArray.value[0]
      return stepsArray.value.find(s => s.id === currentStepId.value) || null
    } else {
      return stepsArray.value[currentStepIndex.value] || null
    }
  })

  const totalSteps = computed(() => stepsArray.value.length || 0)
  
  const currentStepDisplay = computed(() => {
  if (isBranching.value) return branchingStepCounter.value; // Показываем реальный номер шага (1, 2, 3)
  return Math.min(currentStepIndex.value + 1, totalSteps.value)
})

  const totalQuestions = computed(() =>
    stepsArray.value.filter(s => s.type === 'question').length || 0
  )
  
  const accuracy = computed(() => {
    if (finalAccuracy.value !== null) return finalAccuracy.value
    if (totalQuestions.value > 0) return Math.round((score.value / totalQuestions.value) * 100)
    return 0
  })

  // --- ОБРАБОТКА ВЫБОРА ОТВЕТА ---
    // --- ОБРАБОТКА ВЫБОРА ОТВЕТА ---
  function selectOption(index) {
    if (selected.value === null && !timeOut.value) {
      selected.value = index
      clearInterval(timer.value)
      
      const chosenOption = step.value.options[index]
      lastSelectedOption.value = chosenOption 

      const isCorrect = isBranching.value ? !!chosenOption.isOptimal : chosenOption.correct

      // Баллы начисляем только в линейных кейсах
      if (!isBranching.value && isCorrect) score.value++

      userAnswers.value.push({
        stepId: step.value.id,
        question: step.value.question,
        selectedOption: chosenOption.text,
        isCorrect
      })

      // Если кейс ветвящийся — делаем мгновенный переход без показа алертов
      if (isBranching.value) {
        setTimeout(() => {
          nextStep()
        }, 300) // Задержка 0.3 сек, чтобы пользователь увидел, что кнопка нажалась
      }
    }
  }

  // --- ПЕРЕХОД К СЛЕДУЮЩЕМУ ШАГУ ---
function nextStep() {
  if (caseFailed.value) return 
  
  if (isBranching.value) {
    let nextId = null;

    // 1. Приоритет: если мы выбрали ответ, идем по nextStepId из ответа
    if (lastSelectedOption.value?.nextStepId) {
      nextId = lastSelectedOption.value.nextStepId;
    } 
    // 2. Если это инфо-шаг, берем nextStepId из самого шага (как в вашем JSON)
    else if (step.value?.nextStepId) {
      nextId = step.value.nextStepId;
    }

    // Если нашли куда идти — идем
    if (nextId) {
      currentStepId.value = nextId;
      branchingStepCounter.value++; // Увеличиваем счетчик реальных шагов
    } else {
      // Если нигде нет указателя куда идти — значит это конец кейса
      currentStepId.value = null;
    }
  } else {
    // Старая логика для линейного кейса
    currentStepIndex.value++
  }

  // Сброс состояния интерфейса
  selected.value = null
  timeOut.value = false
  lastSelectedOption.value = null

  // Перезапуск таймера
  if (step.value && step.value.type !== 'result') {
    resetTimer()
  } else {
    clearInterval(timer.value)
  }
}

  // --- ОТПРАВКА РЕЗУЛЬТАТА НА СЕРВЕР ---
  async function saveResultToServer(status, accuracyScore, answers) {
    try {
      await api.post('/user/progress', {
        caseId: caseData.value.id,
        status: status,
        accuracy: accuracyScore,
        answers: answers
      });
      store.dispatch('user/fetchProfile');
    } catch (err) {
      console.error("Ошибка сохранения прогресса", err);
    }
  }

  // --- ТАЙМЕР ---
  function startTimer() {
    remainingTime.value = 10
    timer.value = setInterval(() => {
      remainingTime.value--
      if (remainingTime.value <= 0) {
        clearInterval(timer.value)
        if (selected.value === null) {
          timeOut.value = true
          caseFailed.value = true
          saveResultToServer('failed', 0, userAnswers.value);
        }
      }
    }, 1000)
  }

  function resetTimer() {
    if (step.value?.type === 'question') {
      clearInterval(timer.value)
      startTimer()
    } else {
      clearInterval(timer.value)
    }
  }

  // --- СЛЕЖЕНИЕ ЗА ИЗМЕНЕНИЯМИ ---
  onMounted(() => {
    if (isAuthenticated.value) {
      resetTimer()
    }
  })
  
  onBeforeUnmount(() => clearInterval(timer.value))
  
  watch(step, (newStep) => {
    if (newStep && newStep.type !== 'result') {
      resetTimer()
    }
  })

  watchEffect(() => {
    if (!caseData.value || !isAuthenticated.value) return

    // 1. Обработка окончания ЛИНЕЙНОГО кейса
    if (!isBranching.value && currentStepIndex.value >= stepsArray.value.length && currentStepIndex.value > 0) {
      if (!finalResultSaved.value) {
        finalResultSaved.value = true
        const isSuccess = accuracy.value >= 80;
        saveResultToServer(isSuccess ? 'success' : 'failed', accuracy.value, userAnswers.value);
      }
    }

    // 2. Обработка ФИНАЛЬНОГО УЗЛА в ВЕТВЯЩЕМСЯ кейсе
    if (isBranching.value && step.value?.type === 'result' && !finalResultSaved.value) {
      finalResultSaved.value = true 
      clearInterval(timer.value) 
      finalAccuracy.value = step.value.accuracy || 0
      saveResultToServer(step.value.status, step.value.accuracy, userAnswers.value)
    }
  })
</script>


<style scoped>
  .case-step-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  /* --- ИСПРАВЛЕНИЕ КНОПОК --- */
  
  /* Сама кнопка */
  :deep(.option-btn) {
    height: auto !important; /* Автоматическая высота */
    min-height: 48px;        /* Минимальная высота */
    white-space: normal !important; /* Разрешаем перенос текста */
    padding: 12px 20px !important;  /* Увеличиваем отступы */
    display: inline-flex !important;
  }

  /* Внутренний контент кнопки (где лежит текст) */
  :deep(.option-btn .v-btn__content) {
    white-space: normal !important;
    flex: 1 1 auto;
    line-height: 1.4;
  }

  /* --- ИСПРАВЛЕНИЕ СПИСКА ОТВЕТОВ --- */

  /* Контейнер списка ответов на мобильном */
  .answers-scroll-container {
    max-width: 100%;
    overflow-x: auto; /* Добавляем прокрутку, если очень длинный текст */
    padding-bottom: 10px;
  }

  /* Текст внутри пунктов списка */
  :deep(.answers-list .v-list-item-subtitle) {
    white-space: normal !important; /* Отменяем обрезание */
    overflow: visible !important;
    display: block;
    word-break: break-word; /* Перенос длинных слов */
  }

  :deep(.answers-list .v-list-item-title) {
    white-space: normal !important;
  }
  
  /* Остальные стили */
  .step-question {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0d47a1;
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