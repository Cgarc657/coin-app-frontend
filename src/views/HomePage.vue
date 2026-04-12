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
  <main class="min-h-screen bg-white p-8">
    <h1 class="mb-6 text-3xl font-bold">CoinHub Dashboard</h1>

    <input
      v-model="search"
      type="text"
      placeholder="Search coins..."
      class="mb-6 w-full rounded-lg border p-3"
    />

    <p v-if="loading">Loading coins...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="space-y-4">
      <CoinCard v-for="(coin, index) in filteredCoins" :key="coin.id" :coin="coin" :index="index" />
    </div>
  </main>
</template>
