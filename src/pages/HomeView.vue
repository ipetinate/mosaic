<script setup lang="ts">
import type { Photo } from '../models/Photo'

import { computed, watch } from 'vue'

import { getNewPhotos, searchPhotos } from '../api'

import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAppStore } from '../store/useAppStore'

import Card from '../components/Card.vue'

const router = useRouter()

const appStore = useAppStore()

const {
  data: newsPhotos,
  isLoading: isLoadingNewsPhotos,
  isFetching: isFetchingNewsPhotos
} = useQuery({
  queryKey: ['photos'],
  queryFn: async () => await getNewPhotos(15)
})

const {
  data: searchedData,
  refetch: dispatchSearchPhotos,
  isLoading: isLoadingSearch,
  isFetching: isFetchingSearch
} = useQuery({
  queryKey: ['searchedPhotos', appStore.searchTerm],
  queryFn: async () =>
    await searchPhotos({
      query: appStore.searchTerm,
      per_page: '15'
    }),
  enabled: false
})

const hasSearchTerm = computed(() => !!appStore.searchTerm)
const photos = computed(() => {
  return hasSearchTerm.value ? searchedData.value?.results : newsPhotos.value
})

function goToPicture(id: Photo['id'], hash: string) {
  const params = { id: id.toString() }

  router.push({
    name: 'PhotoView',
    params,
    query: { hash }
  })
}

watch(
  () => appStore.searchTerm,
  () => dispatchSearchPhotos()
)

watch(
  () => [
    isLoadingSearch.value,
    isFetchingSearch.value,
    isLoadingNewsPhotos.value,
    isFetchingNewsPhotos.value
  ],
  ([searcLoading, fetchingSearch, newsPhotosLoading, newsPhotosFetching]) => {
    appStore.setLoading(
      searcLoading || fetchingSearch || newsPhotosLoading || newsPhotosFetching
    )
  }
)
</script>

<template>
  <div class="home">
    <div class="home__content">
      <Card
        v-for="photo in photos"
        :key="photo?.id"
        padding="none"
        rounded="none"
        width="388px"
        height="256px"
        @click="goToPicture(photo?.id, photo?.blur_hash)"
      >
        <img
          class="home__content-img"
          :src="photo?.urls?.regular"
          :alt="photo?.description"
        />
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--sizing-16);

    padding: var(--sizing-256) var(--sizing-128) var(--sizing-128);

    &-img {
      overflow: hidden;
      object-fit: cover;
      width: 100%;
      height: auto;
    }
  }
}
</style>
