import type { User } from './User'
import type { Exif } from './Exif'
import type { Location } from './Location'
import type { PhotoTag } from './PhotoTag'
import type { PhotoUrls } from './PhotoUrls'
import type { PhotoLinks } from './PhotoLinks'
import type { Collection } from './Collection'

export interface Photo {
  id: string
  created_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  likes: number
  liked_by_user: boolean
  description: string
  user: User
  current_user_collections: Collection[]
  urls: PhotoUrls
  links: PhotoLinks
}

export interface PhotoById extends Photo {
  updated_at: string
  downloads: number
  public_domain: boolean
  exif: Exif
  location: Location
  tags: PhotoTag[]
}
