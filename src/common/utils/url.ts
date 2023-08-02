const pattern = /^(:?\/\/|https?:\/\/)?([^/]*@)?(.+?)(:\d{2,5})?([/?].*)?$/

export const extractDomain = (url: string) => {
  const parts = url.match(pattern) || []
  return parts[3]
}

export const parseURL = (url: string) => {
  const parser = document.createElement('a')

  parser.href = url

  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash,
  }
}

/**
 * Responsive Image
 */
export type ToSizedImageURLSize = number

interface ToSizedImageURLProps {
  url: string
  width: ToSizedImageURLSize
  height?: ToSizedImageURLSize
  ext?: 'webp'
}

export const changeExt = ({ key, ext }: { key: string; ext?: 'webp' }) => {
  const list = key.split('.')
  const hasExt = list.length > 1
  const newExt = ext || list.slice(-1)[0] || ''

  if (hasExt) {
    return key.replace(/\.[^.]+$/, `.${newExt}`)
  }

  return `${key}${ext ? '.' + ext : ''}`
}

export const toSizedImageURL = ({
  url,
  width,
  height,
  ext,
}: ToSizedImageURLProps) => {
  const assetDomain = process.env.NEXT_PUBLIC_CF_IMAGE_URL
    ? `${process.env.NEXT_PUBLIC_CF_IMAGE_URL}`
    : ''
  let urlDomain = assetDomain
  let isOutsideLink = url.indexOf(assetDomain) < 0

  // fallback to check if it's legacy asset url
  // e.g. https://assets.matters.news/cover/63049798-ea19-4ba1-9325-d93ae4cc4857.jpeg
  if (isOutsideLink) {
    urlDomain = process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN}`
      : ''
    isOutsideLink =
      url.indexOf(`${process.env.NEXT_PUBLIC_EMBED_ASSET_DOMAIN}`) < 0
  }

  if (!assetDomain || isOutsideLink) {
    return url
  }

  const hostnameless = url.replace(urlDomain, ``)
  const key = hostnameless.replace('/public', '')
  const extedUrl = changeExt({ key, ext })
  const postfix = height
    ? `w=${width},h=${height},fit=crop`
    : `w=${width},h=${width * 4},fit=scale-down`

  return assetDomain + extedUrl + '/' + postfix
}

export const isUrl = (key: string) => {
  try {
    return Boolean(new URL(key))
  } catch (e) {
    return false
  }
}
