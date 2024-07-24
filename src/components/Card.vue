<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type Width = 'full' | 'fit'
type Height = 'full' | 'fit' | 'auto'
type Rounded = 'none' | 'sm' | 'md' | 'lg'
type Padding = 'none' | 'sm' | 'md' | 'lg'

type Props = {
  width?: Width | string
  height?: Height | string
  rounded?: Rounded
  padding?: Padding
}

const $attrs = useAttrs()

const props = withDefaults(defineProps<Props>(), {
  width: 'fit' as Width,
  height: 'auto' as Height,
  rounded: 'md',
  padding: 'md'
})

const widthMap = { full: '100%', fit: 'fit-content' }
const heightMap = { full: '100%', fit: 'fit-content', auto: 'auto' }
const sizingMap = { none: '0', sm: '8px', md: '12px', lg: '24px' }

const cardStyle = computed(() => ({
  width: props.width.includes('px')
    ? props.width
    : widthMap[props.width as Width],
  height: props.height.includes('px')
    ? props.height
    : heightMap[props.height as Height],
  padding: sizingMap[props?.padding],
  borderRadius: sizingMap[props.rounded]
}))

const cursor = computed(() => (!!$attrs.onClick ? 'pointer' : 'default'))
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;

  padding: var(--sizing-12);

  width: v-bind('cardStyle.width');
  height: v-bind('cardStyle.height');
  padding: v-bind('cardStyle.padding');
  border-radius: v-bind('cardStyle.borderRadius');

  box-shadow: var(--shadow-primary);
  border: var(--border-primary);

  cursor: v-bind('cursor');

  &:hover {
    box-shadow: var(--shadow-dark-primary);
  }
}
</style>
