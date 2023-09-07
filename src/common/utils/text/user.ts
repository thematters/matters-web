export const normalizeUserName = (userName: string) => {
  return userName
    .split('')
    .filter((c) => /^[a-zA-Z0-9_]*$/.test(c))
    .join('')
}

export const normalizePassowrd = (password: string) => {
  return password
    .split('')
    .filter((c) => /^[\x00-\x7F]*$/.test(c))
    .join('')
}
