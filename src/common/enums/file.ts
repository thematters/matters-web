export const UPLOAD_IMAGE_SIZE_LIMIT: number = 5 * 1024 * 1024

export const UPLOAD_AUDIO_SIZE_LIMIT: number = 100 * 1024 * 1024

export const UPLOAD_MIGRATION_SIZE_LIMIT: number = 1 * 1024 * 1024

export const UPLOAD_FILE_COUNT_LIMIT: number = 50

export const ACCEPTED_UPLOAD_IMAGE_TYPES: string[] = [
  'image/gif',
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
}

export enum ASSET_TYPE {
  avatar = 'avatar',
  cover = 'cover',
  embed = 'embed',
  embedaudio = 'embedaudio',
  profileCover = 'profileCover',
  tagCover = 'tagCover',
}
