export * from './article'
export * from './tag'

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
