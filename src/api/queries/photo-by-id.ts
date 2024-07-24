import type { PhotoById } from '../../models/Photo'

import { axiosInstance } from '../axios.setup'

export async function getPhotoById(id: string): Promise<PhotoById> {
  const { data } = await axiosInstance.get<PhotoById>(`/photos/${id}/`, {
    params: {
      client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }
  })

  return data
}
