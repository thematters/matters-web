export const deferTry = (fn: () => void, timesLeft = 10, defer = 2000) => {
  if (timesLeft > 0) {
    try {
      fn()
    } catch {
      setTimeout(() => deferTry(fn, timesLeft - 1, defer), defer)
    }
  }
  return
}

export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
