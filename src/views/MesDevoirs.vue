<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1 class="dashboard-title">Mes Devoirs</h1>
      <button @click="logout" class="logout-button">Déconnexion</button>
    </header>

    <div class="dashboard-grid">
      <div
        v-for="devoir in devoirs"
        :key="devoir._id"
        class="devoir-card"
      >
        <div class="devoir-header">
          <h2 class="devoir-title">{{ devoir.titre }}</h2>
          <span class="devoir-badge">
            Groupe {{ devoir.groupe }} - Année {{ devoir.annee }}
          </span>
        </div>

        <p class="devoir-description">{{ devoir.description || 'Pas de description fournie.' }}</p>

        <div class="devoir-footer">
          <span class="devoir-date">
            À rendre le : <strong>{{ formatDate(devoir.dateRendu) }}</strong>
          </span>
          <img
            :src="imageRandom(devoir.titre)"
            alt="illustration"
            class="devoir-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const API_URL = import.meta.env.VITE_API_URL
const auth = useAuthStore()
const router = useRouter()
const devoirs = ref([])

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

const imageRandom = (seed) => {
  return `https://source.unsplash.com/seed/${encodeURIComponent(seed)}/60x60`
}

const logout = () => {
  auth.logout()
  router.push('/login')
}

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/tasks/mes-devoirs`, {
      headers: {
        'Authorization': auth.token
      }
    })
    const data = await res.json()
    if (res.ok) {
      devoirs.value = data
    } else {
      alert(data.error || 'Erreur lors du chargement')
    }
  } catch (err) {
    alert('Erreur réseau')
  }
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #ebf8ff, #ffffff);
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2a4365;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c53030;
}

.dashboard-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.devoir-card {
  background-color: #ffffff;
  border: 1px solid #c3daf5;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.devoir-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.devoir-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.devoir-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c5282;
}

.devoir-badge {
  font-size: 0.75rem;
  background-color: #bee3f8;
  color: #2b6cb0;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.devoir-description {
  color: #4a5568;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.devoir-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #718096;
}

.devoir-date strong {
  color: #2d3748;
}

.devoir-image {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
}
</style>
