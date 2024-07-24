import type { Photo } from '../../models/Photo'

import { axiosInstance } from '../axios.setup'

/**
 * Retrieves a list of new photos.
 *
 * @returns A promise that resolves to an array of Photo objects.
 */
export async function getNewPhotos(perPage: number = 9): Promise<Photo[]> {
  const { data } = await axiosInstance.get<Photo[]>(`/photos/`, {
    params: {
      client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
      per_page: perPage.toString()
    }
  })

  return data
}
