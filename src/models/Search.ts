import type { Photo } from './Photo'

export interface Search {
  total: number
  total_pages: number
  results: Photo[]
}
