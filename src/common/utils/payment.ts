/**
 * Calculate Stripe Fee by a given amount based on their pricing model:
 *
 * @see {@url https://stripe.com/en-hk/pricing}
 * @see {@url https://support.stripe.com/questions/passing-the-stripe-fee-on-to-customers}
 */
const FEE_FIXED = 2.35
const FEE_PERCENT = 0.034

export const calcStripeFee = (amount: number, decimal: number = 2) => {
  const charge = (amount + FEE_FIXED) / (1 - FEE_PERCENT)
  const fee = charge - amount
  return parseFloat(fee.toFixed(decimal))
}
