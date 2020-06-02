export const deferTry = (fn: () => any, timesLeft = 10, defer = 2000) => {
  if (timesLeft > 0) {
    try {
      fn()
    } catch (err) {
      console.log(err)
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

export const timeout = (ms: number, promise: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, ms)
    promise.then(resolve, reject)
  })
}
