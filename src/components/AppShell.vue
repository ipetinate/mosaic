<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useRoute } from 'vue-router'
import { useDebounce } from '../hooks/useDebounce'
import { useAppStore } from '../store/useAppStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const appStore = useAppStore()

const { loading } = storeToRefs(appStore)

const searchTerm = ref('')

const searchTermDebounced = useDebounce(searchTerm, 800)

const showSearchField = computed(() => route.name === 'HomeView')

watch(searchTermDebounced, appStore.setSearchTerm)
</script>

<template>
  <div class="app_shell">
    <div class="app_shell__header">
      <img class="app_shell__header-logo" src="/logo.png" alt="Mosaic logo" />

      <input
        v-if="showSearchField"
        v-model="searchTerm"
        placeholder="Buscar imagem"
        class="app_shell__header-search"
      />

      <div class="">
        {{ loading ? 'Carregando...' : '' }}
      </div>

      <div class="app_shell__header-logo_container" v-if="loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="app_shell__header-logo_container__loading spinner"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.app_shell {
  display: flex;

  width: 100vw;
  height: 100vh;

  &__header {
    top: 0;
    position: fixed;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: fit-content;
    padding-top: 128px;
    gap: var(--sizing-24);

    &-search {
      width: 100%;
      max-width: 512px;
      height: var(--sizing-64);

      padding: var(--sizing-8) var(--sizing-16);

      border: 1px solid #333;

      font-size: var(--sizing-20);
    }

    &-logo {
      position: fixed;
      left: var(--sizing-24);
      top: var(--sizing-24);

      width: var(--sizing-72);

      z-index: 999;
      transition: width 800ms ease-in-out;

      &:hover {
        cursor: pointer;
        width: var(--sizing-128);
        transition: width 800ms ease-in-out;
      }
    }

    &-loading_container {
      position: fixed;

      right: var(--sizing-24);
      top: var(--sizing-24);

      &__loading {
        width: var(--sizing-24);
        height: var(--sizing-24);
      }
    }
  }
}
</style>
