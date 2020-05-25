import { numRound } from './number'

// https://stackoverflow.com/a/14428340/3786947
export const toAmountString = (
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

/**
 * Calculate Stripe Fee by a given amount based on their pricing model:
 *
 * @see {@url https://stripe.com/en-hk/pricing}
 * @see {@url https://support.stripe.com/questions/passing-the-stripe-fee-on-to-customers}
 */
const FEE_FIXED = 2.35
const FEE_PERCENT = 0.034

export const calcStripeFee = (amount: number) => {
  const charge = (amount + FEE_FIXED) / (1 - FEE_PERCENT)
  const fee = charge - amount
  return numRound(fee)
}

const FEE_MATTERS = 0.15
export const calcMattersFee = (amount: number) => {
  return numRound(amount * FEE_MATTERS)
}
