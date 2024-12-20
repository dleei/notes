import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(token) {
      this.token = token
    }
  },
  getters: {
    getToken() {
      return this.token
    }
  }
})
