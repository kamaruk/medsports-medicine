import { createStore } from 'vuex'
import user from './modules/user'
import cases from './modules/cases'
import achievements from './modules/achievements' 

export default createStore({
  modules: {
    user,
    cases,
    achievements,
  },
})
