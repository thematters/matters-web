export const toCurationVaultUID = (userId: string) => {
  return `matters:${userId}`
}

export const parseCurationVaultUID = (uid: string) => {
  const match = uid.match(/^matters:(\d+)$/)
  if (!match) {
    return null
  }
  return match[1]
}
