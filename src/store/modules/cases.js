import api from '@/api';

export default {
  namespaced: true,
  state: () => ({
    cases: []
  }),
  getters: {
    allCases: (state) => state.cases,
    categories: (state) => {
        const map = {};
        state.cases.forEach(c => {
            map[c.category] = (map[c.category] || 0) + 1;
        });
        return Object.entries(map).map(([name, count]) => ({ name, count }));
    }
  },
  mutations: {
    SET_CASES(state, cases) {
        state.cases = cases;
    }
  },
  actions: {
    async fetchCases({ commit }) {
        try {
            const res = await api.get('/cases');
            
            const data = res.data.map(c => ({
                ...c,
                steps: typeof c.steps === 'string' ? JSON.parse(c.steps) : c.steps
            }));
            commit('SET_CASES', data);
        } catch (err) {
            console.error("Ошибка загрузки кейсов", err);
        }
    }
  }
}