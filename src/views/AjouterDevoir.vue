<template>
  <div>
    <h2>Ajouter un devoir / examen</h2>
    <form @submit.prevent="ajouter">
      <input v-model="form.titre" placeholder="Titre" required />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <input v-model="form.dateRendu" type="date" required />
      <select v-model="form.groupe" required>
        <option value="A">Groupe A</option>
        <option value="B">Groupe B</option>
      </select>
      <select v-model="form.annee" required>
        <option value="1">Année 1</option>
        <option value="2">Année 2</option>
        <option value="3">Année 3</option>
      </select>
      <button type="submit">Créer</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        titre: '',
        description: '',
        dateRendu: '',
        groupe: 'A',
        annee: 1
      },
      message: ''
    }
  },
  methods: {
    async ajouter() {
        const API_URL = import.meta.env.VITE_API_URL
      try {
        const res = await fetch(`${API_URL}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(this.form)
        })
        const data = await res.json()
        if (res.ok) {
          this.message = 'Devoir ajouté avec succès'
        } else {
          this.message = data.error
        }
      } catch (err) {
        this.message = 'Erreur réseau'
      }
    }
  }
}
</script>
