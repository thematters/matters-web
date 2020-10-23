export const getCookie = (cookie: string, name: string) => {
  const regexp = new RegExp(`${name}=([^;]*);`)
  const match = cookie.match(regexp)

  return match ? match[1] : ''
}
