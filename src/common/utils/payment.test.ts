import { describe, expect, it } from 'vitest'

import { calcMattersFee, formatAmount } from './payment'

describe('utils/payment/calcMattersFee', () => {
  it('should calculate fee correctly', () => {
    // int
    expect(calcMattersFee(0)).toEqual(0)
    expect(calcMattersFee(100)).toEqual(20)
    expect(calcMattersFee(104)).toEqual(20.8)

    // float
    expect(calcMattersFee(0.1)).toEqual(0.02)
    expect(calcMattersFee(0.12)).toEqual(0.02)
    expect(calcMattersFee(0.123)).toEqual(0.02)
    expect(calcMattersFee(100.1)).toEqual(20.02)
    expect(calcMattersFee(100.12)).toEqual(20.02)
    expect(calcMattersFee(100.123)).toEqual(20.02)
    expect(calcMattersFee(100.52)).toEqual(20.1)
  })
})

describe('utils/payment/formatAmount', () => {
  it('should format amount correctly', () => {
    expect(formatAmount(0)).toEqual('0.00')
    expect(formatAmount(0.1)).toEqual('0.10')
    expect(formatAmount(0.12)).toEqual('0.12')
    expect(formatAmount(0.123)).toEqual('0.12')
    expect(formatAmount(100)).toEqual('100.00')
    expect(formatAmount(100.1)).toEqual('100.10')
    expect(formatAmount(100.12)).toEqual('100.12')
    expect(formatAmount(100.123)).toEqual('100.12')
    expect(formatAmount(100.52)).toEqual('100.52')
    expect(formatAmount(100.523)).toEqual('100.52')
    expect(formatAmount(100.526)).toEqual('100.53')
  })
})
