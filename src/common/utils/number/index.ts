import abbr from './abbr'

export const numPrefix = (num: number | string) => {
  const parsedNum = parseFloat(num + '')
  return parsedNum > 0 ? `+${num}` : num
}

export const numAbbr = (num: number, decPlaces: number = 2) =>
  abbr(num, decPlaces)

export const numFormat = (num: number, decPlaces: number = 2) => {
  return parseFloat(num.toFixed(decPlaces))
}
