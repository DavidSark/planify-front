<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Connexion</h1>
      <form @submit.prevent="login" class="login-form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Connexion</button>
        <p v-if="error" class="login-error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const API_URL = import.meta.env.VITE_API_URL
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  try {
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const data = await res.json()

    if (res.ok) {
      auth.login(data.token, data.role)
      if (data.role === 'eleve') {
        router.push('/mes-devoirs')
      } else {
        router.push('/admin')
      }
    } else {
      error.value = data.error || 'Erreur lors de la connexion'
    }
  } catch (err) {
    error.value = 'Erreur réseau'
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e0f2fe, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  width: 100%;
}

.login-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #1a365d;
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form input {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
}

.login-form button {
  padding: 0.75rem 1rem;
  background-color: #2b6cb0;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #2c5282;
}

.login-error {
  color: #e53e3e;
  font-size: 0.875rem;
  text-align: center;
}
</style>