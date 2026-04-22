import api from '@/api';

export default {
  namespaced: true,
  state: () => ({
    isAuthenticated: !!localStorage.getItem('token'),
    userData: null,
    authError: null
  }),
  mutations: {
    setUser(state, userData) {
      state.userData = userData;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    },
    setAuthError(state, error) {
      state.authError = error;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        commit('setUser', res.data.user);
        return true;
      } catch (err) {
        commit('setAuthError', err.response?.data?.message || 'Ошибка входа');
        return false;
      }
    },
    
    async register({ commit }, formData) {
      try {
        await api.post('/auth/register', formData);
        return { success: true };
      } catch (err) {
        
        const message = err.response?.data?.message || 'Ошибка регистрации';
        return { success: false, message };
      }
    },
    
    async fetchProfile({ commit }) {
      try {
        const res = await api.get('/user/profile');
        commit('setUser', res.data);
        localStorage.setItem('userData', JSON.stringify(res.data));
      } catch {
        commit('logout');
      }
    },

    
     async updateProfile({ dispatch }, formData) {
      try { 
        await api.put('/user/profile', formData);
        
        await dispatch('fetchProfile');
        
        return { success: true };
      } catch (err) {
        return { success: false, message: err.response?.data?.error || 'Ошибка сохранения' };
      }
    }
  }
}