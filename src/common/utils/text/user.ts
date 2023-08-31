export const filterUserName = (userName: string) => {
  return userName
    .split('')
    .filter((c) => /^[a-zA-Z0-9_]*$/.test(c))
    .join('')
}
