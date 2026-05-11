<script setup>
defineProps({
  coin: Object,
})
</script>

<template>
  <RouterLink :to="`/coin/${coin.id}`" class="coin-link">
    <div class="coin-card">
      <h2>{{ coin.name }}</h2>
      <p>{{ coin.symbol }}</p>
      <p>${{ coin.price }}</p>
      <p :class="coin.change24h >= 0 ? 'up' : 'down'">
        {{ coin.change24h >= 0 ? '▲' : '▼' }}
        {{ coin.change24h }}%
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.coin-card {
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 20px;
  min-height: 180px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.coin-link {
  text-decoration: none;
  color: inherit;
}

.coin-card:hover {
  transform: translateY(-4px);
}

.symbol {
  color: gray;
  margin-bottom: 15px;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.up {
  color: green;
  font-weight: bold;
}

.down {
  color: red;
  font-weight: bold;
}

.down {
  color: red;
  font-weight: bold;
}
</style>
