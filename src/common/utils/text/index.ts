export * from './article'
export * from './notice'
export * from './tag'
export * from './user'

// for Twitter and others which do not support non-English in URL
export const stripNonEnglishUrl = (url: string) => {
  // const frag = url.split('#', 2)?.[1] // anything after '#'
  const hash = url.match(/(#[\x21-\x7e]+)$/)?.[1] ?? ''
  // get the beginning portion of all printable ascii, and must ends with ASCII '\w'
  const turl = url.match(/^[\x21-\x7e]+[A-Za-z0-9]/)?.[0]
  return turl ? `${turl}${hash}` : url // fallback to full url
}

export const stripSpaces = (content: string | undefined | null) =>
  content?.replaceAll(/\s+/g, ' ').trim()

export const normalizeName = (name: string) => {
  // convert uppercase to lowercase
  const lower = name.toLowerCase()

  // remove non-English and numbers characters except '_'
  return lower.replace(/[^a-z0-9_]/g, '')
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// https://gist.github.com/demouth/3217440
// full-width char -> 2
// half-width char -> 1
export const countStrWidth = (str: string) => {
  var l = str.length
  var c = 0
  var length = 0
  for (var i = 0; i < l; i++) {
    c = str.charCodeAt(i)
    if (0x0000 <= c && c <= 0x0019) {
      length += 0
    } else if (0x0020 <= c && c <= 0x1fff) {
      length += 1
    } else if (0x2000 <= c && c <= 0xff60) {
      length += 2
    } else if (0xff61 <= c && c <= 0xff9f) {
      length += 1
    } else if (0xffa0 <= c) {
      length += 2
    }
  }
  return length
}

export const truncate = (
  str: string,
  prefixLen: number = 8,
  suffixLen: number = 6
) => {
  return `${str.substring(0, prefixLen)}...${str.substring(
    str.length - suffixLen
  )}`
}
