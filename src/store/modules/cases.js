import cases from '@/data/cases.js'

const state = () => ({
  cases
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