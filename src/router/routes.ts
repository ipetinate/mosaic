import type { RouteRecordRaw } from 'vue-router'

import HomeView from '../pages/HomeView.vue'

const PhotoView = import('../pages/PhotoView.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/photo/:id',
    name: 'PhotoView',
    component: PhotoView
  }
]
