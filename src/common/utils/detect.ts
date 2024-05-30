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

export const checkIsSafariVersionLessThan17 = () => {
  const userAgent = navigator.userAgent
  const safariMatch = userAgent.match(/Version\/(\d+\.\d+)/)

  if (safariMatch && safariMatch[1]) {
    const safariVersion = parseFloat(safariMatch[1])
    return safariVersion < 17
  }

  return false
}
