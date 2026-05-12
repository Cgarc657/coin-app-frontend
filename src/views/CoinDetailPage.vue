<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { currentUser } = useAuth()

const route = useRoute()

const coin = ref(null)
const loading = ref(false)
const error = ref('')

const favoriteMessage = ref('')
const favoriteError = ref('')

const fetchCoin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(
      `https://coin-hub-app.expense-splitter-vue.workers.dev/api/coins/${route.params.id}`,
    )

    const data = await response.json()

    coin.value = data.data
  } catch {
    error.value = 'Could not load coin.'
  } finally {
    loading.value = false
  }
}

const saveFavorite = async () => {
  favoriteMessage.value = ''
  favoriteError.value = ''

  try {
    const response = await fetch(
      'https://coin-hub-app.expense-splitter-vue.workers.dev/api/favorites',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.value.id,
          coinId: coin.value.id,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      favoriteError.value = data.error.message
      return
    }

    favoriteMessage.value = 'Coin added to favorites.'
  } catch {
    favoriteError.value = 'Could not save favorite.'
  }
}

onMounted(fetchCoin)
</script>

<template>
  <div class="coin-detail-page">
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="coin" class="coin-detail-card">
      <h1>{{ coin.name }}</h1>

      <p>{{ coin.symbol }}</p>

      <p>${{ coin.price }}</p>

      <p :class="coin.change24h >= 0 ? 'up' : 'down'">
        {{ coin.change24h >= 0 ? '▲' : '▼' }}
        {{ coin.change24h }}%
      </p>

      <button @click="saveFavorite">Save Favorite</button>

      <p v-if="favoriteMessage">
        {{ favoriteMessage }}
      </p>

      <p v-if="favoriteError">
        {{ favoriteError }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.coin-detail-page {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.coin-detail-card {
  width: 400px;
  padding: 2rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

button {
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.up {
  color: green;
  font-weight: bold;
}

.down {
  color: red;
  font-weight: bold;
}
</style>
