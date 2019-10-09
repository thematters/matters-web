type DraftAssetUpload = (input: {
  file?: any
  url?: string
  type?: 'embed' | 'embedaudio'
}) => Promise<{
  id: string
  path: string
}>
