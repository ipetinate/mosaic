import type { Search } from '../../models/Search'

import { axiosInstance } from '../axios.setup'

/**
 * Searches for photos based on the provided query.
 *
 * @param query The search query. Format: ?query=example&per_page=10&page=1
 * @returns A promise that resolves to a Search object.
 */
export async function searchPhotos(
  queries: Record<string, string>
): Promise<Search> {
  const { data } = await axiosInstance.get<Search>('/search/photos', {
    params: { client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, ...queries }
  })

  return data
}
