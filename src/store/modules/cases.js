import med1 from '@/assets/images/med1.jpg'
import med2 from '@/assets/images/med2.jpg'
import med3 from '@/assets/images/med3.jpg'

const state = () => ({
  cases: [
    {
      id: 1,
      title: 'Back pain',
      category: 'Emergency medicine',
      description: 'A real problem or a good reason to get sick leave?',
      image: med1,
      difficulty: 1,
      steps: [
        {
          id: 1,
          type: 'question',
          question: 'Пациент жалуется на боль в пояснице после подъема тяжестей. Что вы сделаете в первую очередь?',
          options: [
            { text: 'Назначить МРТ', correct: false },
            { text: 'Провести осмотр и собрать анамнез', correct: true },
            { text: 'Выписать анальгетики и отпустить домой', correct: false },
          ],
          explanation: 'Сначала необходимо провести клинический осмотр и собрать анамнез.',
        },
        {
          id: 2,
          type: 'info',
          content: 'После осмотра вы выявили симптомы радикулита. Пациент испытывает ограничение подвижности.',
        },
        {
          id: 3,
          type: 'question',
          question: 'Какое исследование наиболее уместно на этом этапе?',
          options: [
            { text: 'Рентген позвоночника', correct: true },
            { text: 'КТ головы', correct: false },
            { text: 'Анализ крови на сахар', correct: false },
          ],
          explanation: 'Рентген может показать дегенеративные изменения или травму.',
        },
        {
          id: 4,
          type: 'info',
          content: 'Рентген показал наличие остеохондроза поясничного отдела.',
        },
        {
          id: 5,
          type: 'question',
          question: 'Какое лечение вы предложите в первую очередь?',
          options: [
            { text: 'Оперативное вмешательство', correct: false },
            { text: 'Консервативное лечение: НПВС, ЛФК', correct: true },
            { text: 'Иглоукалывание', correct: false },
          ],
          explanation: 'На начальном этапе показано консервативное лечение.',
        },
      ]
    },

    {
      id: 2,
      title: 'Polydipsia in a teenager',
      category: 'Endocrinology',
      description: 'Excessive thirst in a 15-year-old boy: what could be wrong?',
      image: med2,
      difficulty: 2,
      steps: [
        {
          id: 1,
          type: 'question',
          question: 'Что может быть причиной жажды у подростка?',
          options: [
            { text: 'Сахарный диабет', correct: true },
            { text: 'Артериальная гипертензия', correct: false },
            { text: 'ОРВИ', correct: false },
          ],
          explanation: 'Полидипсия — частый симптом диабета 1 типа.',
        },
        {
          id: 2,
          type: 'question',
          question: 'Какое обследование назначите в первую очередь?',
          options: [
            { text: 'Общий анализ крови', correct: false },
            { text: 'Уровень глюкозы в крови', correct: true },
            { text: 'ЭКГ', correct: false },
          ],
          explanation: 'Измерение сахара крови — базовый тест при подозрении на диабет.',
        },
        {
          id: 3,
          type: 'info',
          content: 'Глюкоза натощак — 14 ммоль/л. Подтверждён диагноз СД 1 типа.',
        },
        {
          id: 4,
          type: 'question',
          question: 'Какое лечение необходимо начать немедленно?',
          options: [
            { text: 'Инсулинотерапия', correct: true },
            { text: 'Диета без сахара', correct: false },
            { text: 'Глюкокортикоиды', correct: false },
          ],
          explanation: 'Инсулин — основа лечения СД 1 типа.',
        },
      ]
    },

    {
      id: 3,
      title: 'Shortness of breath in elderly',
      category: 'Cardiology',
      description: 'What to do when your 74-year-old patient can’t breathe properly?',
      image: med3,
      difficulty: 3,
      steps: [
        {
          id: 1,
          type: 'question',
          question: 'У пациента одышка в покое. Что вы заподозрите?',
          options: [
            { text: 'Хроническая сердечная недостаточность', correct: true },
            { text: 'Гастрит', correct: false },
            { text: 'Невралгия', correct: false },
          ],
          explanation: 'ХСН — частая причина одышки у пожилых.',
        },
        {
          id: 2,
          type: 'question',
          question: 'Какое исследование подтвердит диагноз?',
          options: [
            { text: 'ЭКГ и ЭхоКГ', correct: true },
            { text: 'МРТ головного мозга', correct: false },
            { text: 'Анализ мочи', correct: false },
          ],
          explanation: 'ЭхоКГ покажет снижение ФВ и дилатацию камер сердца.',
        },
        {
          id: 3,
          type: 'info',
          content: 'ЭхоКГ выявило ФВ 35%, дилатация ЛЖ. Диагноз подтверждён.',
        },
        {
          id: 4,
          type: 'question',
          question: 'Что входит в базовую терапию ХСН?',
          options: [
            { text: 'Ингибиторы АПФ, бета-блокаторы, диуретики', correct: true },
            { text: 'Антибиотики', correct: false },
            { text: 'Аспирин и омега-3', correct: false },
          ],
          explanation: 'Это стандартное лечение ХСН с пониженной ФВ.',
        },
      ]
    },

    {
      id: 4,
      title: 'Severe abdominal pain',
      category: 'Surgery',
      description: 'Acute abdomen in a young adult. Emergency or not?',
      image: 'https://source.unsplash.com/featured/?surgery,hospital',
      difficulty: 2,
      steps: [
        {
          id: 1,
          type: 'question',
          question: 'Сильная боль в правом нижнем квадранте. Что подозреваете?',
          options: [
            { text: 'Аппендицит', correct: true },
            { text: 'Холецистит', correct: false },
            { text: 'Панкреатит', correct: false },
          ],
          explanation: 'Типичная локализация при аппендиците.',
        },
        {
          id: 2,
          type: 'info',
          content: 'У пациента температура 38.3°C, болезненность при пальпации, симптом Щёткина-Блюмберга.',
        },
        {
          id: 3,
          type: 'question',
          question: 'Следующее диагностическое действие?',
          options: [
            { text: 'УЗИ брюшной полости', correct: true },
            { text: 'ФГДС', correct: false },
            { text: 'Рентген грудной клетки', correct: false },
          ],
          explanation: 'УЗИ помогает визуализировать воспалённый аппендикс.',
        },
        {
          id: 4,
          type: 'question',
          question: 'Следующее действие?',
          options: [
            { text: 'Госпитализация и подготовка к операции', correct: true },
            { text: 'Домашнее наблюдение', correct: false },
            { text: 'Обезболивание и выписка', correct: false },
          ],
          explanation: 'Аппендицит требует хирургического вмешательства.',
        },
      ]
    },

    {
      id: 5,
      title: 'Head trauma after fall',
      category: 'Neurology',
      description: 'Elderly patient, falls at home, develops confusion.',
      image: 'https://source.unsplash.com/featured/?neurology',
      difficulty: 2,
      steps: [
        {
          id: 1,
          type: 'question',
          question: 'Что делать при подозрении на ЧМТ?',
          options: [
            { text: 'Срочная КТ головы', correct: true },
            { text: 'Рентген таза', correct: false },
            { text: 'Анализ крови', correct: false },
          ],
          explanation: 'КТ головы — золотой стандарт диагностики при ЧМТ.',
        },
        {
          id: 2,
          type: 'info',
          content: 'КТ показывает субдуральную гематому.',
        },
        {
          id: 3,
          type: 'question',
          question: 'Что делать при обнаружении гематомы?',
          options: [
            { text: 'Консультация нейрохирурга', correct: true },
            { text: 'УЗИ сердца', correct: false },
            { text: 'Назначить парацетамол', correct: false },
          ],
          explanation: 'Требуется срочное решение о вмешательстве.',
        },
      ]
    },

    {
      id: 6,
      title: 'Persistent fever in child',
      category: 'Pediatrics',
      description: 'Fever for 6 days, rash, red lips — what is going on?',
      image: 'https://source.unsplash.com/featured/?pediatrics,child',
      difficulty: 3,
      steps: [
        {
          id: 1,
          type: 'question',
          question: 'Какой синдром наиболее вероятен?',
          options: [
            { text: 'Синдром Кавасаки', correct: true },
            { text: 'ОРВИ', correct: false },
            { text: 'Аллергия', correct: false },
          ],
          explanation: 'Классическая триада: лихорадка, сыпь, слизистые.',
        },
        {
          id: 2,
          type: 'info',
          content: 'Также наблюдаются шелушение пальцев и лимфаденопатия.',
        },
        {
          id: 3,
          type: 'question',
          question: 'Лечение Кавасаки включает:',
          options: [
            { text: 'Иммуноглобулины и аспирин', correct: true },
            { text: 'Антибиотики', correct: false },
            { text: 'Гормоны', correct: false },
          ],
          explanation: 'IVIG и аспирин — стандарт лечения.',
        },
      ]
    },
    
  ]
})

const getters = {
  allCases: (state) => state.cases,

  categories: (state) => {
    const map = new Map()
    for (const c of state.cases) {
      map.set(c.category, (map.get(c.category) || 0) + 1)
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }
}

export default {
  namespaced: true,
  state,
  getters,
}