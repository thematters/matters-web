export const countDownToTime = (diff: number) => {
  const mins = Math.floor((diff / (60 * 1000)) * 1)
  const secs = Math.floor(((diff % (60 * 1000)) / 1000) * 1)
  return { mins, secs }
}
