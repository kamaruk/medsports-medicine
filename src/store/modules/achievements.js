

const STORAGE_KEY = 'my-med-trainer-achievements'


function loadEarned() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const BADGES = [
  { id: 'first_case',     title: 'Первый кейс',       description: 'Поздравляем с первым пройденным кейсом!' },
  { id: 'five_cases',     title: '5 кейсов',          description: 'Пройдено 5 кейсов' },
  { id: 'ten_cases',      title: '10 кейсов',         description: 'Пройдено 10 кейсов' },
  { id: 'high_accuracy',  title: 'Точность 100%',     description: 'Кейс пройден с идеальной точностью' },
  
]

const state = () => ({
  earned: loadEarned()
})

const getters = {
  allBadges:     () => BADGES,
  earnedBadges:  state => state.earned.map(id => BADGES.find(b => b.id === id)).filter(Boolean)
}

const mutations = {
  earnBadge(state, badgeId) {
    if (!state.earned.includes(badgeId)) {
      state.earned.push(badgeId)
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.earned))
    }
  }
}

const actions = {
  checkAchievements({ commit, rootState }) {
    const completed = (rootState.user.userData.completedCases || []).length

    if (completed >= 1)  commit('earnBadge', 'first_case')
    if (completed >= 5)  commit('earnBadge', 'five_cases')
    if (completed >= 10) commit('earnBadge', 'ten_cases')

    const last = rootState.user.userData.completedCases.slice(-1)[0]
    if (last?.accuracy === 100) {
      commit('earnBadge', 'high_accuracy')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
