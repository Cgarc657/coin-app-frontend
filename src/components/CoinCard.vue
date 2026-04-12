<script setup>
defineProps({
  coin: Object,
})
</script>

<template>
  <div class="coin-card">
    <h2>{{ coin.name }}</h2>
    <p>{{ coin.symbol }}</p>
    <p>${{ coin.price }}</p>
    <p>{{ coin.change24h }}%</p>
  </div>
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
</style>
