export { default as isUrl } from 'validator/lib/isURL'

import { URL_COLLECTION_DETAIL } from '../enums'

type Sorter = {
  [key: string]: string
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
  enableAnimation?: boolean
}

const changeExt = ({ key, ext }: { key: string; ext?: 'webp' }) => {
  const list = key.split('.')
  const hasExt = list.length > 1
  const newExt = ext || list.slice(-1)[0] || ''

  if (hasExt) {
    return key.replace(/\.[^.]+$/, `.${newExt}`)
  }

  return `${key}${ext ? '.' + ext : ''}`
}

export const toSizedImageURL = ({
  url = '',
  width,
  height,
  ext,
  enableAnimation,
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
  let postfix = height
    ? `w=${width},h=${height},fit=crop`
    : `w=${width},h=${width * 4},fit=scale-down`

  if (!enableAnimation) {
    postfix += ',anim=false'
  }

  return assetDomain + extedUrl + '/' + postfix
}

export const parseSorter = (sorterStr: string) => {
  const sorter: Sorter = {}
  if (sorterStr === '') {
    return sorter
  }
  const sorters = sorterStr.split(URL_COLLECTION_DETAIL.SORTER_SEPARATOR)
  sorters.map((s) => {
    let [key, value] = s.split(URL_COLLECTION_DETAIL.SORTER_TYPE_SEPARATOR)
    key = (key || '').trim()
    value = (value || '').trim()
    if (key) {
      sorter[key] = value
    }
  })
  return sorter
}

export const stringifySorter = (sorter: Sorter) => {
  let sorterStr = ''
  const keys = Object.keys(sorter)
  keys.map((key, index) => {
    sorterStr += `${key}${URL_COLLECTION_DETAIL.SORTER_TYPE_SEPARATOR}${sorter[
      key
    ].toString()}`
    if (index < keys.length - 1) {
      sorterStr += URL_COLLECTION_DETAIL.SORTER_SEPARATOR
    }
  })
  return sorterStr
}

export const parseCommentHash = () => {
  if (typeof window === 'undefined') {
    return { parentId: undefined, descendantId: undefined }
  }
  const fragment = window.location.hash.replace('#', '')
  const [parentId, descendantId] = fragment.split('-')
  return {
    fragment,
    parentId: parentId || undefined,
    descendantId: descendantId || undefined,
  }
}

export const extractShortHashFromUrl = (url: string) => {
  if (!url) return null

  const cleanUrl = url.trim()

  // Match exactly 12-character lowercase alphanumeric string
  // Use negative lookahead/lookbehind to ensure exactly 12 characters
  const shortHashPattern = /(?<![a-z0-9])[a-z0-9]{12}(?![a-z0-9])/
  const match = cleanUrl.match(shortHashPattern)

  return match ? match[0] : null
}
