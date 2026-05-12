<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { currentUser } = useAuth()

const favorites = ref([])
const loading = ref(false)
const error = ref('')

const fetchFavorites = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(
      `https://coin-hub-app.expense-splitter-vue.workers.dev/api/favorites?userId=${currentUser.value.id}`,
    )

    const data = await response.json()

    favorites.value = data.data
  } catch {
    error.value = 'Could not load favorites.'
  } finally {
    loading.value = false
  }
}

const removeFavorite = async (coinId) => {
  try {
    await fetch(
      `https://coin-hub-app.expense-splitter-vue.workers.dev/api/favorites/${coinId}?userId=${currentUser.value.id}`,
      {
        method: 'DELETE',
      },
    )

    favorites.value = favorites.value.filter((favorite) => favorite.id !== coinId)
  } catch {
    error.value = 'Could not remove favorite.'
  }
}

onMounted(fetchFavorites)
</script>

<template>
  <div class="favorites-page">
    <h1>Favorite Coins</h1>

    <div v-if="loading">Loading...</div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="favorites.length" class="favorites-grid">
      <div v-for="favorite in favorites" :key="favorite.id" class="favorite-card">
        <h2>{{ favorite.name }}</h2>

        <p>{{ favorite.symbol }}</p>

        <p>${{ favorite.price }}</p>

        <button @click="removeFavorite(favorite.id)">Remove Favorite</button>
      </div>
    </div>

    <p v-else>No favorites saved yet.</p>
  </div>
</template>

<style scoped>
.favorites-page {
  padding: 2rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.favorite-card {
  padding: 1rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
