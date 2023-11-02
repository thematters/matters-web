export const getUserAgent = () =>
  ((navigator && navigator.userAgent) || '').toLowerCase()

export const isMobile = () => {
  const userAgent = getUserAgent()
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  )
}
