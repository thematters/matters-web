export const displayChannelName = (name: string) => {
  const parts = name.split('_')
  if (parts.length > 1) {
    return parts.slice(1).join('_')
  }
  return name
}
