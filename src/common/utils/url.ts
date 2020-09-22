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
export type ToSizedImageURLSize = '144w' | '360w' | '540w' | '1080w'

interface ToSizedImageURLProps {
  url: string
  size?: ToSizedImageURLSize
  ext?: 'webp'
}

const PROCESSED_PREFIX = 'processed'

export const changeExt = ({ key, ext }: { key: string; ext?: 'webp' }) => {
  const list = key.split('.')
  const hasExt = list.length > 1
  const newExt = ext || list.slice(-1)[0] || ''

  if (hasExt) {
    return key.replace(/\.[^.]+$/, `.${newExt}`)
  }

  return `${key}${ext ? '.' + ext : ''}`
}

export const toSizedImageURL = ({ url, size, ext }: ToSizedImageURLProps) => {
  const assetDomain = process.env.NEXT_PUBLIC_ASSET_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_ASSET_DOMAIN}`
    : ''
  const isOutsideLink = url.indexOf(assetDomain) < 0
  const isGIF = /gif/i.test(url)

  if (!assetDomain || isOutsideLink || isGIF) {
    return url
  }

  const key = url.replace(assetDomain, ``)
  const extedUrl = changeExt({ key, ext })
  const prefix = size ? '/' + PROCESSED_PREFIX + '/' + size : ''

  return assetDomain + prefix + extedUrl
}
