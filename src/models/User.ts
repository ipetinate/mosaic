import type { UserLinks } from './UserLinks'
import type { ProfileImage } from './ProfileImage'

export interface User {
  id: string
  username: string
  name: string
  first_name: string
  last_name: string
  instagram_username: string
  twitter_username: string
  portfolio_url: string
  profile_image: ProfileImage
  links: UserLinks
}
