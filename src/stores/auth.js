import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
  }),
  actions: {
    login(token, role) {
      this.token = token
      this.role = role
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    },
    logout() {
      this.token = null
      this.role = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => ['superadmin', 'delegue', 'prof'].includes(state.role)
  }
})
