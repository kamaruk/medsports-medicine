import { createStore } from 'vuex'
import user from './modules/user'
import cases from './modules/cases'


export default createStore({
  modules: {
    user,
    cases,
  },
})
