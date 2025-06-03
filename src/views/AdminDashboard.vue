<template>
  <div class="dashboard-admin">
    <header class="admin-header">
      <h2>🎯 Espace Administration</h2>
      <button @click="logout" class="logout-button">Déconnexion</button>
    </header>

    <form @submit.prevent="creerUtilisateur" class="admin-form">
      <h3 class="form-title">Créer un nouvel utilisateur</h3>

      <div class="form-grid">
        <input v-model="form.nom" placeholder="Nom" required />
        <input v-model="form.prenom" placeholder="Prénom" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Mot de passe" required />

        <select v-model="form.role" required>
          <option disabled value="">Choisir un rôle</option>
          <option value="eleve">Élève</option>
          <option value="delegue">Délégué</option>
          <option value="prof">Professeur</option>
        </select>

        <select v-model="form.groupe" required>
          <option value="A">Groupe A</option>
          <option value="B">Groupe B</option>
        </select>

        <select v-model="form.annee" required>
          <option value="1">Année 1</option>
          <option value="2">Année 2</option>
          <option value="3">Année 3</option>
        </select>
      </div>

      <button type="submit" class="submit-button">Créer l'utilisateur</button>
      <p v-if="message" class="success-message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  role: '',
  groupe: 'A',
  annee: 1
})

const message = ref('')

const creerUtilisateur = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth.token
      },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()
    if (res.ok) {
      message.value = 'Utilisateur créé avec succès'
      form.value = {
        nom: '', prenom: '', email: '', password: '', role: '', groupe: 'A', annee: 1
      }
    } else {
      message.value = data.error
    }
  } catch (err) {
    message.value = 'Erreur serveur'
  }
}

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-admin {
  padding: 2rem;
  background: linear-gradient(to bottom right, #f0f8ff, #ffffff);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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

.admin-form {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: 0 auto;
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2a4365;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

input, select {
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.submit-button {
  background-color: #2b6cb0;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2c5282;
}

.success-message {
  margin-top: 1rem;
  color: #38a169;
  font-weight: 500;
}
</style>