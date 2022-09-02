export const getCookie = (cookie: string, name: string) => {
  if (!cookie) {
    return ''
  }

  const regexp = new RegExp(`(^| )${name}=([^;]+)`)
  const match = cookie.match(regexp)

  return match ? match[2] : ''
}
