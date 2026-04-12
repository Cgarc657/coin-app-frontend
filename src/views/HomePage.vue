<script setup>
import { onMounted } from 'vue'
import CoinCard from '@/components/CoinCard.vue'
import { useCoins } from '@/composables/useCoins'

const { loading, error, search, filteredCoins, fetchCoins } = useCoins()

onMounted(() => {
  fetchCoins()
})
</script>

<template>
  <main class="dashboard">
    <h1>CoinHub</h1>
    <p class="subtitle">Track top cryptocurrencies in real-time</p>

    <input v-model="search" type="text" placeholder="Search by name or symbol" class="search-box" />

    <p v-if="loading">Loading coins...</p>
    <p v-if="error">{{ error }}</p>

    <div class="coin-list">
      <CoinCard v-for="(coin, index) in filteredCoins" :key="coin.id" :coin="coin" :index="index" />
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: white;
  padding: 30px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 18px;
  color: gray;
  margin-bottom: 30px;
}

.search-box {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 30px;
}

.coin-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
