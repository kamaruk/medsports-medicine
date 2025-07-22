
import { BADGES } from '@/data/badges.js'
const STORAGE_KEY = 'my-med-trainer-achievements'


function loadEarned() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}


const state = () => ({
  earned: loadEarned()
})

const getters = {
  allBadges: () => BADGES,
  earnedBadges:  state => state.earned.map(id => BADGES.find(b => b.id === id)).filter(Boolean)
}

const mutations = {
  earnBadge(state, badgeId) {
    if (!state.earned.includes(badgeId)) {
      state.earned.push(badgeId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.earned))
    }
  },
  resetAchievements(state) {
    state.earned = []
    localStorage.removeItem(STORAGE_KEY)
  }
}
//resetAchievements сделан для демонстрации работоспособности ачивок 

const actions = {
  checkAchievements({ commit, rootState }) {
    
    const completedCases = (rootState.user.userData.completedCases || []).filter(c => c.status === 'success')
    const completed = completedCases.length

    if (completed >= 1)  commit('earnBadge', 'first_case')
    if (completed >= 5)  commit('earnBadge', 'five_cases')
    if (completed >= 10) commit('earnBadge', 'ten_cases')

    
    const last = completedCases.slice(-1)[0]
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
