import { ref, computed } from 'vue'

export function useCoins() {
  const coins = ref([])
  const loading = ref(false)
  const error = ref('')
  const search = ref('')

  const fetchCoins = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(
        'https://coin-hub-app.expense-splitter-vue.workers.dev/api/coins',
      )

      const data = await response.json()
      coins.value = data.data
    } catch {
      error.value = 'Could not load coins.'
    } finally {
      loading.value = false
    }
  }

  const filteredCoins = computed(() => {
    const searchValue = search.value.trim().toLowerCase()

    if (!searchValue) {
      return coins.value.slice(0, 5)
    }

    return coins.value.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchValue) ||
        coin.symbol.toLowerCase().includes(searchValue),
    )
  })

  return {
    loading,
    error,
    search,
    filteredCoins,
    fetchCoins,
  }
}
