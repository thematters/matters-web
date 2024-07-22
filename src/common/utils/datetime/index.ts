import absolute from './absolute'
import relative from './relative'

export const datetimeFormat = {
  absolute,
  relative,
}

export const isUTC8 = () => {
  const timezoneOffset = new Date().getTimezoneOffset()
  const utc8Offset = -480
  return timezoneOffset === utc8Offset
}
