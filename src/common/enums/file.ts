export const UPLOAD_IMAGE_SIZE_LIMIT: number = 10 * 1024 * 1024 // 10MB
export const UPLOAD_GIF_AVATAR_SIZE_LIMIT: number = 1 * 1024 * 1024 // 1MB
export const UPLOAD_IMAGE_DIMENSION_LIMIT: number = 12e3 // 12,000 pixels
export const UPLOAD_IMAGE_AREA_LIMIT: number = 10e3 * 10e3 // 100 megapixels
export const UPLOAD_IMAGE_METADATA_SIZE_LIMIT: number = 1024 // 1024 bytes
export const UPLOAD_COVER_MIN_DIMENSION_LIMIT: number = 120

export const UPLOAD_AUDIO_SIZE_LIMIT: number = 100 * 1024 * 1024

export const UPLOAD_MIGRATION_SIZE_LIMIT: number = 1 * 1024 * 1024

export const UPLOAD_FILE_COUNT_LIMIT: number = 50

export const UPLOAD_MOMENT_ASSET_COUNT_LIMIT: number = 3

export const ACCEPTED_UPLOAD_IMAGE_TYPES: string[] = [
  'image/gif',
  'image/png',
  'image/jpeg',
  'image/webp',
]

export const ACCEPTED_COVER_UPLOAD_IMAGE_TYPES: string[] = [
  'image/png',
  'image/jpeg',
  'image/webp',
]

export const ACCEPTED_MOMENT_ASSETS_UPLOAD_IMAGE_TYPES: string[] = [
  'image/png',
  'image/jpeg',
  'image/webp',
]

export const ACCEPTED_UPLOAD_AUDIO_TYPES: string[] = ['audio/mpeg', 'audio/aac']

export const ACCEPTED_UPLOAD_MIGRATION_TYPES: string[] = ['text/html']

export enum ENTITY_TYPE {
  article = 'article',
  draft = 'draft',
  tag = 'tag',
  user = 'user',
  circle = 'circle',
  collection = 'collection',
  moment = 'moment',
}

export enum ASSET_TYPE {
  avatar = 'avatar',
  cover = 'cover',
  embed = 'embed',
  embedaudio = 'embedaudio',
  profileCover = 'profileCover',
  tagCover = 'tagCover',
  circleAvatar = 'circleAvatar',
  circleCover = 'circleCover',
  collectionCover = 'collectionCover',
  moment = 'moment',
}
