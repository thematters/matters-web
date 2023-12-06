import { numRound } from './number'

// https://stackoverflow.com/a/14428340/3786947
export const formatAmount = (
  num: number,
  decPlaces: number = 2,
  sections: number = 3
): string => {
  const re =
    '\\d(?=(\\d{' + sections + '})+' + (decPlaces > 0 ? '\\.' : '$') + ')'
  return num
    .toFixed(Math.max(0, ~~decPlaces))
    .replace(new RegExp(re, 'g'), '$&,')
}

const FEE_MATTERS = 0.2
export const calcMattersFee = (amount: number) => {
  return numRound(amount * FEE_MATTERS)
}
