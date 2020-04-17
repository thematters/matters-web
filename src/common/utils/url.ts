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
