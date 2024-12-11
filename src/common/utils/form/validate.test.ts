import { createIntl } from 'react-intl'
import { describe, expect, it } from 'vitest'

import {
  MAX_CIRCLE_DISPLAY_NAME_LENGTH,
  MAX_CIRCLE_NAME_LENGTH,
  MAX_COLLECTION_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_USER_DISPLAY_NAME_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_CIRCLE_DISPLAY_NAME_LENGTH,
  MIN_CIRCLE_NAME_LENGTH,
  MIN_COLLECTION_TITLE_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USER_DISPLAY_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
  PAYMENT_CURRENCY,
  PAYMENT_MAXIMUM_CIRCLE_AMOUNT,
  PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT,
  PAYMENT_MINIMAL_CIRCLE_AMOUNT,
  PAYMENT_PASSSWORD_LENGTH,
  RESERVED_NAMES,
} from '~/common/enums'

import {
  validateAmount,
  validateCircleAmount,
  validateCircleDisplayName,
  validateCircleName,
  validateCode,
  validateCollectionTitle,
  validateComparedPassword,
  validateCurrency,
  validateDescription,
  validateDisplayName,
  validateDonationAmount,
  validateEmail,
  validatePassword,
  validatePaymentPassword,
  validatePayoutAmount,
  validateTagName,
  validateUserName,
} from './validate'

const intl = createIntl({
  locale: 'en',
  messages: {},
})

describe('utils/form/validate/validateAmount', () => {
  it('should validate amount correctly', () => {
    expect(validateAmount(0, intl)).toBe('Required')
    expect(
      validateAmount(PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD - 1, intl)
    ).toBe(`Minimum amount is HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`)
    expect(validateAmount(-1, intl)).toBe(
      `Minimum amount is HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`
    )
    expect(
      validateAmount(PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD, intl)
    ).toBeUndefined()
    expect(
      validateAmount(PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD + 1, intl)
    ).toBeUndefined()
  })
})

describe('utils/form/validate/validateCircleAmount', () => {
  it('should validate circle amount correctly', () => {
    expect(validateCircleAmount(0, intl)).toBe('Required')

    // min
    expect(
      validateCircleAmount(PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD - 1, intl)
    ).toBe(`Minimum amount is HKD ${PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}`)
    expect(
      validateCircleAmount(PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD + 1, intl)
    ).toBeUndefined()
    expect(
      validateCircleAmount(PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD, intl)
    ).toBeUndefined()

    // max
    expect(
      validateCircleAmount(PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD + 1, intl)
    ).toBe(`Maximum amount is HKD ${PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}`)
    expect(
      validateCircleAmount(PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD - 1, intl)
    ).toBeUndefined()
    expect(
      validateCircleAmount(PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD, intl)
    ).toBeUndefined()
  })
})

describe('utils/form/validate/validateCircleDisplayName', () => {
  it('should validate circle display name correctly', () => {
    expect(validateCircleDisplayName('', intl)).toBe('Required')
    expect(validateCircleDisplayName('1234567890', intl)).toBeUndefined()
    expect(validateCircleDisplayName('你好世界🌍', intl)).toBeUndefined()

    // length
    expect(
      validateCircleDisplayName(
        '123456789012345678901234567890123456789012345678901',
        intl
      )
    ).toBe(
      `Must be between ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} characters long.`
    )

    // reserved
    expect(validateCircleDisplayName(RESERVED_NAMES[0], intl)).toBe(
      `"${RESERVED_NAMES[0]}" is invalid.`
    )

    // punctuation
    expect(validateCircleDisplayName('1234567890!', intl)).toBeUndefined()
    expect(validateCircleDisplayName('!?@', intl)).toBe(
      'Not support using punctuation marks alone.'
    )
    expect(validateCircleDisplayName('？！', intl)).toBe(
      'Not support using punctuation marks alone.'
    )
  })
})

describe('utils/form/validate/validateCircleName', () => {
  it('should validate circle name correctly', () => {
    expect(validateCircleName('', intl)).toBe('Required')
    expect(validateCircleName('1234567890', intl)).toBeUndefined()

    // length
    expect(
      validateCircleName(
        '123456789012345678901234567890123456789012345678901',
        intl
      )
    ).toBe(
      `Must be between ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} characters long.`
    )

    // reserved
    expect(validateCircleName(RESERVED_NAMES[0], intl)).toBe(
      `"${RESERVED_NAMES[0]}" is invalid.`
    )

    // non-alphanumeric
    const error =
      'Must be between 2-20 characters long. Only letters letters, numbers and underline are allowed.'
    expect(validateCircleName('你好世界🌍', intl)).toBe(error)
    expect(validateCircleName('1234567890!', intl)).toBe(error)
    expect(validateCircleName('!?@', intl)).toBe(error)
    expect(validateCircleName('？！', intl)).toBe(error)
  })
})

describe('utils/form/validate/validateCode', () => {
  it('should validate code correctly', () => {
    expect(validateCode('', intl)).toBe('Required')
    expect(validateCode('1234567890', intl)).toBeUndefined()
    expect(validateCode('你好世界🌍', intl)).toBeUndefined()
  })
})

describe('utils/form/validate/validateCollectionTitle', () => {
  it('should validate collection title correctly', () => {
    expect(validateCollectionTitle('', intl)).toBe('Required')
    expect(validateCollectionTitle('1234567890', intl)).toBeUndefined()
    expect(validateCollectionTitle('你好世界🌍', intl)).toBeUndefined()
    expect(
      validateCollectionTitle(
        '123456789012345678901234567890123456789012345678901',
        intl
      )
    ).toBe(
      `Must be between ${MIN_COLLECTION_TITLE_LENGTH}-${MAX_COLLECTION_TITLE_LENGTH} characters long.`
    )
  })
})

describe('utils/form/validate/validateComparedPassword', () => {
  it('should validate compared password correctly', () => {
    expect(validateComparedPassword('', '', intl)).toBe('Required')
    expect(
      validateComparedPassword('1234567890', '1234567890', intl)
    ).toBeUndefined()
    expect(
      validateComparedPassword('你好世界🌍', '你好世界🌍', intl)
    ).toBeUndefined()

    // not match
    expect(validateComparedPassword('1234567890', '0987654321', intl)).toBe(
      'The new password and confirmation password do not match.'
    )
  })
})

describe('utils/form/validate/validateCurrency', () => {
  it('should validate currency correctly', () => {
    expect(validateCurrency('', intl)).toBe('Please select a currency')
    expect(validateCurrency('THB', intl)).toBe('Please select a currency')
    expect(validateCurrency(PAYMENT_CURRENCY.HKD, intl)).toBeUndefined()
  })
})

describe('utils/form/validate/validateDescription', () => {
  it('should validate description correctly', () => {
    expect(validateDescription('', intl)).toBe('Required')
    expect(validateDescription('1234567890', intl)).toBeUndefined()
    expect(validateDescription('你好世界🌍', intl)).toBeUndefined()

    // length
    const description = 'a'.repeat(MAX_DESCRIPTION_LENGTH + 1)
    expect(validateDescription(description, intl)).toBe(
      `Maximum ${MAX_DESCRIPTION_LENGTH} characters, current ${description.length} characters.`
    )
  })
})

describe('utils/form/validate/validateDisplayName', () => {
  it('should validate display name correctly', () => {
    expect(validateDisplayName('', intl)).toBe('Required')
    expect(validateDisplayName('1234567890', intl)).toBeUndefined()
    expect(validateDisplayName('你好世界🌍', intl)).toBeUndefined()

    // length
    expect(
      validateDisplayName(
        '123456789012345678901234567890123456789012345678901',
        intl
      )
    ).toBe(
      `Must be between ${MIN_USER_DISPLAY_NAME_LENGTH}-${MAX_USER_DISPLAY_NAME_LENGTH} characters long.`
    )

    // punctuation
    expect(validateDisplayName('1234567890!', intl)).toBeUndefined()
    expect(validateDisplayName('!?@', intl)).toBe(
      'Not support using punctuation marks alone.'
    )
    expect(validateDisplayName('？！', intl)).toBe(
      'Not support using punctuation marks alone.'
    )

    // reserved
    expect(validateDisplayName(RESERVED_NAMES[0], intl)).toBe(
      `"${RESERVED_NAMES[0]}" is invalid.`
    )
  })
})

describe('utils/form/validate/validateDonationAmount', () => {
  it('should validate donation amount correctly', () => {
    const balance = 100
    expect(validateDonationAmount(0, balance, intl)).toBe(
      'Please select or enter amount'
    )
    expect(validateDonationAmount(1, balance, intl)).toBeUndefined()
    expect(validateDonationAmount(100, balance, intl)).toBeUndefined()
  })
})

describe('utils/form/validate/validateEmail', () => {
  it('should validate email correctly', () => {
    const options = { allowPlusSign: false }
    expect(validateEmail('', intl, options)).toBe('Required')
    expect(validateEmail('1234567890', intl, options)).toBe(
      'Please fill in a valid email address'
    )
    expect(validateEmail('hi@example.com', intl, options)).toBeUndefined()
  })
})

describe('utils/form/validate/validatePassword', () => {
  it('should validate password correctly', () => {
    expect(validatePassword('', intl)).toBe('Required')
    expect(validatePassword('1234567890', intl)).toBeUndefined()
    expect(validatePassword('abcdefghij', intl)).toBeUndefined()

    const error = `Minimum ${MIN_PASSWORD_LENGTH} characters. Uppercase/lowercase letters, numbers and symbols are allowed`
    expect(validatePassword('你好世界🌍', intl)).toBe(error)
    expect(validatePassword('1234', intl)).toBe(error)
  })
})

describe('utils/form/validate/validatePaymentPassword', () => {
  it('should validate payment password correctly', () => {
    expect(validatePaymentPassword('', intl)).toBe('Required')
    expect(validatePaymentPassword('123456', intl)).toBeUndefined()

    const error = `Enter a ${PAYMENT_PASSSWORD_LENGTH}-digit payment password.`
    expect(validatePaymentPassword('你好世界🌍', intl)).toBe(error)
    expect(validatePaymentPassword('1234', intl)).toBe(error)
    expect(validatePaymentPassword('abcd', intl)).toBe(error)
  })
})

describe('utils/form/validate/validatePayoutAmount', () => {
  it('should validate payout amount correctly', () => {
    const min = 100
    const max = 5000

    expect(validatePayoutAmount({ min, max, value: 0, intl })).toBe(
      `Minimum amount is HKD ${min}`
    )
    expect(validatePayoutAmount({ min, max, value: 150, intl })).toBeUndefined()
    expect(validatePayoutAmount({ min, max, value: 5001, intl })).toBe(
      `Maximum amount is HKD ${max}`
    )
  })
})

describe('utils/form/validate/validateTagName', () => {
  it('should validate tag name correctly', () => {
    expect(validateTagName('', intl)).toBe('Required')
    expect(validateTagName('1234567890', intl)).toBeUndefined()
    expect(validateTagName('你好世界🌍', intl)).toBeUndefined()

    // punctuation
    expect(validateTagName('1234567890!', intl)).toBeUndefined()
    expect(validateTagName('!?@', intl)).toBe(
      'Not support using punctuation marks alone.'
    )
    expect(validateTagName('？！', intl)).toBe(
      'Not support using punctuation marks alone.'
    )
  })
})

describe('utils/form/validate/validateUserName', () => {
  it('should validate user name correctly', () => {
    expect(validateUserName('1234567890', intl)).toBeUndefined()

    // length
    expect(
      validateUserName(
        '123456789012345678901234567890123456789012345678901',
        intl
      )
    ).toBe(
      `ID must be between ${MIN_USER_NAME_LENGTH} and ${MAX_USER_NAME_LENGTH} characters long`
    )
  })
})
