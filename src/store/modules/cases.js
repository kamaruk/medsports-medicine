import med1 from '@/assets/images/med1.jpg'
import med2 from '@/assets/images/med2.jpg'
import med3 from '@/assets/images/med3.jpg'

const state = () => ({
  cases: [
    {
      id: 1,
      title: 'Боль в спине',
      category: 'Экстренная медицина',
      description: 'Реальная проблема или веская причина взять больничный?',
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
      title: 'Полидипсия у подростка',
      category: 'Эндокринология',
      description: 'Чрезмерная жажда у 15-летнего мальчика: что может быть не так?',
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
      title: 'Одышка у пожилых',
      category: 'Кардиология',
      description: 'Что делать, если ваш 74-летний пациент не может нормально дышать?',
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
      title: 'Сильная боль в животе',
      category: 'Хирургия',
      description: 'Острый живот у молодого человека. Экстренная помощь или нет?',
      image: '',
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
      title: 'Травма головы после падения',
      category: 'Неврология',
      description: 'Пожилой пациент, падает дома, развивается спутанность сознания',
      image: '',
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
      title: 'Постоянная лихорадка у ребенка',
      category: 'Педиатрия',
      description: 'Лихорадка в течение 6 дней, сыпь, красные губы — что происходит?',
      image: '',
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

    {
      id: 7,
      title: 'Сепсис после операции',
      category: 'Инфекционные болезни',
      description: 'Пациент через 3 дня после аппендэктомии поступил с лихорадкой и гипотонией.',
      image: '',
      difficulty: 4,
      steps: [
        { id: 1, type: 'question', 
          question: 'Какие первые обследования назначите?', 
          options: [
            { text: 'Общий анализ крови и лактат', correct: true },
            { text: 'ЭКГ', correct: false },
            { text: 'КТ тазобедренных суставов', correct: false },
          ], 
          explanation: 'Сепсис подтверждается лейкоцитозом и повышенным лактатом.' },
        { id: 2, 
          type: 'info', 
          content: 'Лейкоциты 18×10⁹/л, лактат — 4 ммоль/л.' },
        { id: 3, 
          type: 'question', 
          question: 'Какой антибактериальный препарат начнёте?', 
          options: [
            { text: 'Цефтриаксон + метронидазол', correct: true },
            { text: 'Амикацин', correct: false },
            { text: 'Клиндамицин', correct: false },
          ], 
          explanation: 'Широкий спектр: покрыть грам- и анаэробы.' },
        { id: 4, 
          type: 'info', 
          content: 'После старта антибактериальной терапии давление стабилизировалось.' },
        { id: 5, 
          type: 'question', 
          question: 'Что делать с инфузионной терапией?', 
          options: [
            { text: 'Коллоидные растворы + кристаллоиды', correct: true },
            { text: 'Только кристаллоиды', correct: false },
            { text: 'Только коллоиды', correct: false },
          ], 
          explanation: 'Комбинированная инфузия улучшает гемодинамику.' },
        { id: 6, 
          type: 'info', 
          content: 'Потребление кислорода стабильно, диурез 0.5 мл/кг/ч.' },
        { id: 7, 
          type: 'question', 
          question: 'Когда выполняете контрольные культуры?', 
          options: [
            { text: 'Через 48 часов после старта АБТ', correct: true },
            { text: 'Через 24 часа', correct: false },
            { text: 'Не требуется', correct: false },
          ], 
          explanation: 'Контроль через 48 часов оценит эффективность терапии.' },
        { id: 8, 
          type: 'info', 
          content: 'Культуры крови стерильны, состояние пациента улучшилось.' },
      ]
    },

    {
      id: 8,
      title: 'Психотический эпизод у подростка',
      category: 'Психиатрия',
      description: '16-летний парень привезён в психиатрическую клинику с галлюцинациями.',
      image: '',
      difficulty: 5,
      steps: [
        { id: 1, 
          type: 'question', 
          question: 'Первичная оценка состояния: что важно уточнить?', 
          options: [
            { text: 'Наличие суицидальных мыслей', correct: true },
            { text: 'Наличие зубной боли', correct: false },
            { text: 'Наличие сыпи на коже', correct: false },
          ], 
          explanation: 'Безопасность пациента и риск суицида в приоритете.' },
        { id: 2, 
          type: 'info', 
          content: 'Пациент отрицает суицидальные намерения, но агрессивен.' },
        { id: 3, 
          type: 'question', 
          question: 'Какие препараты назначить для седации?', 
          options: [
            { text: 'Рисперидон перорально', correct: false },
            { text: 'Лоразепам внутривенно', correct: true },
            { text: 'Циталопрам перорально', correct: false },
          ], 
          explanation: 'Бензодиазепин быстро успокоит пациента.' },
        { id: 4,
          type: 'info', 
          content: 'Пациент успокоился через 30 минут.' },
        { id: 5,
          type: 'question',
          question: 'Что важнее всего при сборе анамнеза?',
          options: [
            { text: 'Приём психотропных препаратов', correct: true },
            { text: 'Любимые хобби', correct: false },
            { text: 'Последние оценки в школе', correct: false },
          ],
          explanation: 'Лекарственная история поможет исключить абстинентный синдром.' },
        { id: 6, 
          type: 'info', 
          content: 'Выяснено, что неделю назад пациент бросил принимать сертралин.' },
        { id: 7, 
          type: 'question', 
          question: 'Ваш следующий шаг?', 
          options: [
            { text: 'Возобновить сертралин', correct: false },
            { text: 'Постепенно снизить дозу и переключить на другой СИОЗС', correct: true },
            { text: 'Немедленно провести ЭЭГ', correct: false },
          ], 
          explanation: 'Плавная смена СИОЗС минимизирует риск рецидива.' },
        { id: 8, 
          type: 'info', 
          content: 'Через 3 дня пациент стал менее агрессивным, смена терапии прошла без осложнений.' },
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