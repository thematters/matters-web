import NP from 'number-precision'

import abbr from './abbr'

NP.enableBoundaryChecking(false)

export const numPrefix = (num: number | string) => {
  const parsedNum = parseFloat(num + '')
  return parsedNum > 0 ? `+${num}` : num
}

export const numAbbr = (num: number, decPlaces: number = 2) =>
  abbr(num, decPlaces)

export const numRound = (num: number, decPlaces: number = 2) => {
  return NP.round(num, decPlaces)
}
