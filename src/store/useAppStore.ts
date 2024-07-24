import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Custom hook for managing the app store.
 *
 * @returns An object containing the `searchTerm` and `setSearchTerm` function.
 */
export const useAppStore = defineStore('app', () => {
  /**
   * Is loading app global
   */
  const loading = ref(false)

  /**
   * Search term from search input
   */
  const searchTerm = ref('')

  /**
   * Sets the search term value.
   *
   * @param value - The new value for the search term.
   */
  function setSearchTerm(value: string) {
    searchTerm.value = value
  }

  /**
   * Sets the loading value.
   *
   * @param value - The new value for the loading state.
   */
  function setLoading(value: boolean) {
    loading.value = value
  }

  return {
    loading,
    searchTerm,
    setLoading,
    setSearchTerm
  }
})
