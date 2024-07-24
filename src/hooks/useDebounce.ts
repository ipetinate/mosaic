import { ref, onBeforeUnmount, UnwrapRef, Ref, watch } from 'vue'

/**
 * Use debounce on a reactive value
 *
 * @param state - Reactive value to be debounced
 * @param delay - Delay to debounce value in milliseconds
 *
 * @example
 *
 * <script setup lang="ts">
 * const searchTerm = ref('')
 *
 * const searchTermDebounced = useDebounce(searchTerm, 800)
 *
 * async function handleSearch (term: string) {
 *  const { data } = await axios.get("endpoint", {
 *    params: { term }
 *  })
 * }
 *
 * watch(searchTermDebounced, handleSearch)
 * </script>

 * <template>
 *   <input v-model="searchTerm" placeholder="Search" />
 * </template>
 *
 * @returns {Ref<UnwrapRef<T>>} Debounced value ref
 */
export function useDebounce<T>(
  state: Ref<T>,
  delay: number
): Ref<UnwrapRef<T>> {
  /**
   * Debounced value updated after delay time
   */
  const debouncedValue = ref(state.value)

  /**
   * Timeout id to clear after unmount
   */
  let timeoutId: NodeJS.Timeout | null = null

  /**
   * Debounce function that update values after delay
   */
  function debounce() {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      debouncedValue.value = state.value as UnwrapRef<T>
    }, delay)
  }

  watch(state, debounce)

  onBeforeUnmount(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })

  return debouncedValue
}
