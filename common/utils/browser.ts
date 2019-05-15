export const getUserAgent = () =>
  ((navigator && navigator.userAgent) || '').toLowerCase()

export const isSafari = () => {
  const userAgent = getUserAgent()
  const match = userAgent.match(/version\/(\d+).+?safari/)
  return match !== null
}
