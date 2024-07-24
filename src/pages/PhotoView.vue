<script setup lang="ts">
import { decode } from 'blurhash'
import { computed, ref, onMounted } from 'vue'

import { getPhotoById } from '../api'

import { useQuery } from '@tanstack/vue-query'
import { useShareImage } from '../hooks/useShareImage'
import { useDownloadImage } from '../hooks/useDownloadImage'

import { RouterLink, useRoute } from 'vue-router'

import Card from '../components/Card.vue'

const route = useRoute()

const { isSharing, shareImage } = useShareImage()
const { isDownloading, downloadImage } = useDownloadImage()

const imageLoaded = ref(false)
const placeholderCanvas = ref<HTMLCanvasElement | null>(null)

const photoId = computed(() => route.params.id as string)

const { data: photo } = useQuery({
  queryKey: ['photo', photoId.value],
  queryFn: async () => await getPhotoById(photoId.value)
})

function handleDownload() {
  if (photo.value?.links?.download) {
    const filename = photo.value.description ?? photo.value.id

    downloadImage(photo.value?.urls.full, filename)
  }
}

async function handleShare() {
  if (!photo.value?.links?.download) return

  try {
    await shareImage(photo.value?.links?.download)
  } catch (error) {
    console.error('Sharing failed', error)
  }
}

function onImageLoad() {
  imageLoaded.value = true
}

onMounted(() => {
  if (route?.query?.hash && placeholderCanvas.value) {
    const canvas = placeholderCanvas?.value
    const ctx = canvas?.getContext('2d')

    const width = (canvas.width = 1000)
    const height = (canvas.height = 1000)

    const pixels = decode(route?.query?.hash.toString(), width, height)
    const imageData = new ImageData(
      new Uint8ClampedArray(pixels),
      width,
      height
    )

    ctx?.putImageData(imageData, 0, 0)
  }
})
</script>

<template>
  <div class="picture">
    <RouterLink to="/" class="picture__back_button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </RouterLink>

    <canvas v-show="!imageLoaded" ref="placeholderCanvas"></canvas>

    <Card v-show="imageLoaded" padding="none" rounded="none">
      <img
        :alt="photo?.description"
        :src="photo?.urls.full"
        @load="onImageLoad"
      />
    </Card>

    <div class="picture__actions">
      <button class="button" :disabled="isDownloading" @click="handleDownload">
        {{ isDownloading ? 'Downloading...' : 'Download' }}
      </button>

      <button class="button" :disabled="isSharing" @click="handleShare">
        {{ isSharing ? 'Sharing...' : 'Share' }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.picture {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: var(--sizing-16);

  width: 100%;
  height: 100%;

  & img,
  canvas {
    overflow: hidden;
    object-fit: cover;

    width: auto;
    height: 70vh;

    max-width: 70vw;
    max-height: auto;
  }

  &__back_button {
    position: absolute;
    top: var(--sizing-128);
    left: var(--sizing-80);
    z-index: 2;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    gap: var(--sizing-16);
  }
}

.image-placeholder {
  width: 100%;
  height: auto;
  background: #f0f0f0;
}
</style>
