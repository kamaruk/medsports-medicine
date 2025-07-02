import defaultAvatar from '@/assets/images/default-avatar.png'

const savedUser = JSON.parse(localStorage.getItem('userData'))
const savedAuth = localStorage.getItem('isAuthenticated') === 'true'
const savedCompleted = JSON.parse(localStorage.getItem('completedCases') || '[]')

export default {
  namespaced: true,
  state: () => ({
    isAuthenticated: savedAuth,
    userData: savedUser || {
      name: 'Новый пользователь',
      email: '',
      role: 'student',
      avatar: null,
      completedCases: []
    }
  }),

  
   mutations: {
   setUser(state, userData) {
    state.userData = {
      name: userData.name || 'Новый пользователь',
      email: userData.email || '',
      role: userData.role || 'student',
      avatar: userData.avatar || null,
      completedCases: userData.completedCases || []
    }
    state.isAuthenticated = true
    localStorage.setItem('userData', JSON.stringify(state.userData))
    localStorage.setItem('isAuthenticated', 'true')
  },

    logout(state) {
      state.userData = {
        name: '',
        email: '',
        role: '',
        avatar: null,
        completedCases: []
      }
      state.isAuthenticated = false
      localStorage.removeItem('userData')
      localStorage.removeItem('isAuthenticated')
    },

    saveCompletedCase(state, caseResult) {
      const exists = state.userData.completedCases?.find(c => c.id === caseResult.id)
      if (!exists) {
        state.userData.completedCases = [
          ...(state.userData.completedCases || []),
          caseResult
        ]
      } else {
        state.userData.completedCases = state.userData.completedCases.map(c =>
          c.id === caseResult.id ? caseResult : c
        )
      }
      localStorage.setItem('userData', JSON.stringify(state.userData))
    }
  },

  actions: {
    login({ commit }) {
      const demoUser = {
        name: 'Demo Doctor',
        email: 'demo@example.com',
        role: 'student',
        avatar: defaultAvatar,
        completedCases: []
      }
      commit('setUser', demoUser)
    }
  }
}
