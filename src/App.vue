<template>
  <div class="app-wrapper">
    <header class="app-header">
      <h1 class="app-title">🎓 Dashboard Étudiant</h1>
    </header>

    <main class="app-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Chargement...'
    }
  },
  async mounted() {
    const API_URL = import.meta.env.VITE_API_URL
    try {
      const res = await fetch(`${API_URL}/`)
      const text = await res.text()
      this.message = text
    } catch (err) {
      this.message = 'Erreur de connexion à l\u2019API'
      console.error(err)
    }
  }
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
  font-family: 'Inter', sans-serif;
  color: #2d3748;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2b6cb0;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.app-title {
  font-size: 1.8rem;
  margin: 0;
}

.app-status {
  font-size: 0.9rem;
  margin-top: 0.25rem;
  opacity: 0.85;
}

.app-content {
  flex: 1;
  padding: 2rem;
}
</style>