export const randomString = (length = 9) =>
  Math.random().toString(36).substr(2, length)
