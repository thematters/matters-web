export const getUserAgent = () =>
  ((navigator && navigator.userAgent) || '').toLowerCase()

export const isSafari = () => {
  const userAgent = getUserAgent()
  const match = userAgent.match(/version\/(\d+).+?safari/)
  return match !== null
}

export const isMobile = () => {
  const userAgent = getUserAgent()
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  )
}

const getSafariVersion = (userAgent: string): string | null => {
  const userAgentRegex =
    /^Mozilla\/5\.0 \(Macintosh; (Intel|Apple) Mac OS X \d+_\d+(?:_\d+)?\) AppleWebKit\/\d+(?:\.\d+)* \(KHTML, like Gecko\) Version\/(\d+\.\d+(?:\.\d+)*) Safari\/\d+(?:\.\d+)*$/
  const match = userAgent.match(userAgentRegex)
  return match ? match[2] : null // The capturing group for the version number
}

export const checkIsSafariVersionLessThan17 = () => {
  const userAgent = navigator.userAgent
  const version = getSafariVersion(userAgent)
  if (version) {
    const majorVersion = parseInt(version.split('.')[0], 10)
    return majorVersion < 17
  }
  return false
}
