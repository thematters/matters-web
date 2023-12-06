import { describe, expect, it } from 'vitest'

import {
  MAX_ARTICLE_SUPPORT_LENGTH,
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
  validatePaymentPointer,
  validatePayoutAmount,
  validateSupportWords,
  validateTagName,
  validateUserName,
} from './validate'

describe('utils/form/validate/validateAmount', () => {
  it('should validate amount correctly', () => {
    expect(validateAmount(0, 'en')).toBe('Required')
    expect(
      validateAmount(PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD - 1, 'en')
    ).toBe(`Minimum amount is HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`)
    expect(validateAmount(-1, 'en')).toBe(
      `Minimum amount is HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`
    )
    expect(
      validateAmount(PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD, 'en')
    ).toBeUndefined()
    expect(
      validateAmount(PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD + 1, 'en')
    ).toBeUndefined()
  })
})

describe('utils/form/validate/validateCircleAmount', () => {
  it('should validate circle amount correctly', () => {
    expect(validateCircleAmount(0, 'en')).toBe('Required')

    // min
    expect(
      validateCircleAmount(PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD - 1, 'en')
    ).toBe(`Minimum amount is HKD ${PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}`)
    expect(
      validateCircleAmount(PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD + 1, 'en')
    ).toBeUndefined()
    expect(
      validateCircleAmount(PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD, 'en')
    ).toBeUndefined()

    // max
    expect(
      validateCircleAmount(PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD + 1, 'en')
    ).toBe(`Maximum amount is HKD ${PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}`)
    expect(
      validateCircleAmount(PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD - 1, 'en')
    ).toBeUndefined()
    expect(
      validateCircleAmount(PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD, 'en')
    ).toBeUndefined()
  })
})

describe('utils/form/validate/validateCircleDisplayName', () => {
  it('should validate circle display name correctly', () => {
    expect(validateCircleDisplayName('', 'en')).toBe('Required')
    expect(validateCircleDisplayName('1234567890', 'en')).toBeUndefined()
    expect(validateCircleDisplayName('你好世界🌍', 'en')).toBeUndefined()

    // length
    expect(
      validateCircleDisplayName(
        '123456789012345678901234567890123456789012345678901',
        'en'
      )
    ).toBe(
      `Must be between ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} characters long.`
    )

    // reserved
    expect(validateCircleDisplayName(RESERVED_NAMES[0], 'en')).toBe(
      `"${RESERVED_NAMES[0]}" is invalid.`
    )

    // punctuation
    expect(validateCircleDisplayName('1234567890!', 'en')).toBeUndefined()
    expect(validateCircleDisplayName('!?@', 'en')).toBe(
      'Not support using punctuation marks alone.'
    )
    expect(validateCircleDisplayName('？！', 'en')).toBe(
      'Not support using punctuation marks alone.'
    )
  })
})

describe('utils/form/validate/validateCircleName', () => {
  it('should validate circle name correctly', () => {
    expect(validateCircleName('', 'en')).toBe('Required')
    expect(validateCircleName('1234567890', 'en')).toBeUndefined()

    // length
    expect(
      validateCircleName(
        '123456789012345678901234567890123456789012345678901',
        'en'
      )
    ).toBe(
      `Must be between ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} characters long.`
    )

    // reserved
    expect(validateCircleName(RESERVED_NAMES[0], 'en')).toBe(
      `"${RESERVED_NAMES[0]}" is invalid.`
    )

    // non-alphanumeric
    const error =
      'Must be between 2-20 characters long. Only letters letters, numbers and underline are allowed.'
    expect(validateCircleName('你好世界🌍', 'en')).toBe(error)
    expect(validateCircleName('1234567890!', 'en')).toBe(error)
    expect(validateCircleName('!?@', 'en')).toBe(error)
    expect(validateCircleName('？！', 'en')).toBe(error)
  })
})

describe('utils/form/validate/validateCode', () => {
  it('should validate code correctly', () => {
    expect(validateCode('', 'en')).toBe('Required')
    expect(validateCode('1234567890', 'en')).toBeUndefined()
    expect(validateCode('你好世界🌍', 'en')).toBeUndefined()
  })
})

describe('utils/form/validate/validateCollectionTitle', () => {
  it('should validate collection title correctly', () => {
    expect(validateCollectionTitle('', 'en')).toBe('Required')
    expect(validateCollectionTitle('1234567890', 'en')).toBeUndefined()
    expect(validateCollectionTitle('你好世界🌍', 'en')).toBeUndefined()
    expect(
      validateCollectionTitle(
        '123456789012345678901234567890123456789012345678901',
        'en'
      )
    ).toBe(
      `Must be between ${MIN_COLLECTION_TITLE_LENGTH}-${MAX_COLLECTION_TITLE_LENGTH} characters long.`
    )
  })
})

describe('utils/form/validate/validateComparedPassword', () => {
  it('should validate compared password correctly', () => {
    expect(validateComparedPassword('', '', 'en')).toBe('Required')
    expect(
      validateComparedPassword('1234567890', '1234567890', 'en')
    ).toBeUndefined()
    expect(
      validateComparedPassword('你好世界🌍', '你好世界🌍', 'en')
    ).toBeUndefined()

    // not match
    expect(validateComparedPassword('1234567890', '0987654321', 'en')).toBe(
      'The new password and confirmation password do not match.'
    )
  })
})

describe('utils/form/validate/validateCurrency', () => {
  it('should validate currency correctly', () => {
    expect(validateCurrency('', 'en')).toBe('Please select a currency')
    expect(validateCurrency('THB', 'en')).toBe('Please select a currency')
    expect(validateCurrency(PAYMENT_CURRENCY.HKD, 'en')).toBeUndefined()
  })
})

describe('utils/form/validate/validateDescription', () => {
  it('should validate description correctly', () => {
    expect(validateDescription('', 'en')).toBe('Required')
    expect(validateDescription('1234567890', 'en')).toBeUndefined()
    expect(validateDescription('你好世界🌍', 'en')).toBeUndefined()

    // length
    const description = 'a'.repeat(MAX_DESCRIPTION_LENGTH + 1)
    expect(validateDescription(description, 'en')).toBe(
      `Maximum ${MAX_DESCRIPTION_LENGTH} characters, current ${description.length} characters.`
    )
  })
})

describe('utils/form/validate/validateDisplayName', () => {
  it('should validate display name correctly', () => {
    expect(validateDisplayName('', 'en')).toBe('Required')
    expect(validateDisplayName('1234567890', 'en')).toBeUndefined()
    expect(validateDisplayName('你好世界🌍', 'en')).toBeUndefined()

    // length
    expect(
      validateDisplayName(
        '123456789012345678901234567890123456789012345678901',
        'en'
      )
    ).toBe(
      `Must be between ${MIN_USER_DISPLAY_NAME_LENGTH}-${MAX_USER_DISPLAY_NAME_LENGTH} characters long.`
    )

    // punctuation
    expect(validateDisplayName('1234567890!', 'en')).toBeUndefined()
    expect(validateDisplayName('!?@', 'en')).toBe(
      'Not support using punctuation marks alone.'
    )
    expect(validateDisplayName('？！', 'en')).toBe(
      'Not support using punctuation marks alone.'
    )

    // reserved
    expect(validateDisplayName(RESERVED_NAMES[0], 'en')).toBe(
      `"${RESERVED_NAMES[0]}" is invalid.`
    )
  })
})

describe('utils/form/validate/validateDonationAmount', () => {
  it('should validate donation amount correctly', () => {
    const balance = 100
    expect(validateDonationAmount(0, balance, 'en')).toBe(
      'Please select or enter amount'
    )
    expect(validateDonationAmount(1, balance, 'en')).toBeUndefined()
    expect(validateDonationAmount(100, balance, 'en')).toBeUndefined()
  })
})

describe('utils/form/validate/validateEmail', () => {
  it('should validate email correctly', () => {
    const options = { allowPlusSign: false }
    expect(validateEmail('', 'en', options)).toBe('Required')
    expect(validateEmail('1234567890', 'en', options)).toBe(
      'Please fill in a valid email address'
    )
    expect(validateEmail('hi@example.com', 'en', options)).toBeUndefined()
  })
})

describe('utils/form/validate/validatePassword', () => {
  it('should validate password correctly', () => {
    expect(validatePassword('', 'en')).toBe('Required')
    expect(validatePassword('1234567890', 'en')).toBeUndefined()
    expect(validatePassword('abcdefghij', 'en')).toBeUndefined()

    const error = `Minimum ${MIN_PASSWORD_LENGTH} characters. Uppercase/lowercase letters, numbers and symbols are allowed`
    expect(validatePassword('你好世界🌍', 'en')).toBe(error)
    expect(validatePassword('1234', 'en')).toBe(error)
  })
})

describe('utils/form/validate/validatePaymentPassword', () => {
  it('should validate payment password correctly', () => {
    expect(validatePaymentPassword('', 'en')).toBe('Required')
    expect(validatePaymentPassword('123456', 'en')).toBeUndefined()

    const error = `Enter a ${PAYMENT_PASSSWORD_LENGTH}-digit payment password.`
    expect(validatePaymentPassword('你好世界🌍', 'en')).toBe(error)
    expect(validatePaymentPassword('1234', 'en')).toBe(error)
    expect(validatePaymentPassword('abcd', 'en')).toBe(error)
  })
})

describe('utils/form/validate/validatePaymentPointer', () => {
  it('should validate payment pointer correctly', () => {
    expect(validatePaymentPointer('', 'en')).toBe('Required')
    expect(validatePaymentPointer('$123456', 'en')).toBeUndefined()

    const error = 'The wallet address starts with "$".'
    expect(validatePaymentPointer('你好世界🌍', 'en')).toBe(error)
    expect(validatePaymentPointer('1234', 'en')).toBe(error)
    expect(validatePaymentPointer('abcd', 'en')).toBe(error)
  })
})

describe('utils/form/validate/validatePayoutAmount', () => {
  it('should validate payout amount correctly', () => {
    const min = 100
    const max = 5000

    expect(validatePayoutAmount({ min, max, value: 0, lang: 'en' })).toBe(
      `Minimum amount is HKD ${min}`
    )
    expect(
      validatePayoutAmount({ min, max, value: 150, lang: 'en' })
    ).toBeUndefined()
    expect(validatePayoutAmount({ min, max, value: 5001, lang: 'en' })).toBe(
      `Maximum amount is HKD ${max}`
    )
  })
})

describe('utils/form/validate/validateSupportWords', () => {
  it('should validate support words correctly', () => {
    expect(validateSupportWords('', 'en')).toBeUndefined()
    expect(validateSupportWords('1234567890', 'en')).toBeUndefined()
    expect(validateSupportWords('你好世界🌍', 'en')).toBeUndefined()

    // length
    const value = 'a'.repeat(MAX_ARTICLE_SUPPORT_LENGTH + 1)
    expect(validateSupportWords(value, 'en')).toBe(
      `Maximum ${MAX_ARTICLE_SUPPORT_LENGTH} characters, current ${value.length} characters.`
    )
  })
})

describe('utils/form/validate/validateTagName', () => {
  it('should validate tag name correctly', () => {
    expect(validateTagName('', 'en')).toBe('Required')
    expect(validateTagName('1234567890', 'en')).toBeUndefined()
    expect(validateTagName('你好世界🌍', 'en')).toBeUndefined()

    // punctuation
    expect(validateTagName('1234567890!', 'en')).toBeUndefined()
    expect(validateTagName('!?@', 'en')).toBe(
      'Not support using punctuation marks alone.'
    )
    expect(validateTagName('？！', 'en')).toBe(
      'Not support using punctuation marks alone.'
    )
  })
})

describe('utils/form/validate/validateUserName', () => {
  it('should validate user name correctly', () => {
    expect(validateUserName('1234567890', 'en')).toBeUndefined()

    // length
    expect(
      validateUserName(
        '123456789012345678901234567890123456789012345678901',
        'en'
      )
    ).toBe(
      `ID must be between ${MIN_USER_NAME_LENGTH} and ${MAX_USER_NAME_LENGTH} characters long`
    )
  })
})
