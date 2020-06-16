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

export const changeExt = ({ url, ext }: { url: string; ext?: 'webp' }) => {
  const list = url.split('.')
  const hasExt = list.length > 1
  const newExt = ext || list.slice(-1)[0] || ''

  if (hasExt) {
    return url.replace(/\.[^.]+$/, `.${newExt}`)
  }

  return `${url}.${ext || ''}`
}

export const toSizedImageURL = ({ url, size, ext }: ToSizedImageURLProps) => {
  const assetDomain = process.env.NEXT_PUBLIC_ASSET_DOMAIN

  if (!assetDomain) {
    return url
  }

  const extedUrl = changeExt({ url, ext })
  const prefix = size ? '/' + PROCESSED_PREFIX + '/' + size : ''

  return extedUrl.replace(assetDomain, `${assetDomain}${prefix}`)
}
