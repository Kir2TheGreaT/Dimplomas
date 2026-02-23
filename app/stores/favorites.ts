import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavorites = defineStore('favorites', () => {
  const favoritesIds = ref<number[]>([])
  function toggleFavorite(id: number) {
    const index = favoritesIds.value.indexOf(id)
    if (index === -1) {
      favoritesIds.value.push(id)
    } else {
      favoritesIds.value.splice(index, 1)
    }
  }
  const isFavorite = computed(() => (id: number) => {
    return favoritesIds.value.includes(id)
  })
  const count = computed(() => favoritesIds.value.length)
  return {
    favoritesIds,
    toggleFavorite,
    isFavorite,
    count
  }
}, {
  persist: true
})