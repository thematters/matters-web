import { IntlShape } from 'react-intl'

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
  MIN_USER_DISPLAY_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
  PAYMENT_CURRENCY,
  PAYMENT_MAXIMUM_CIRCLE_AMOUNT,
  PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT,
  PAYMENT_MINIMAL_CIRCLE_AMOUNT,
  RESERVED_CIRCLE_NAMES,
  RESERVED_NAMES,
} from '~/common/enums'
import {
  isValidEmail,
  isValidPassword,
  isValidPaymentPassword,
  ValidEmailOptions,
} from '~/common/utils'

import { hasUpperCase, isValidPaymentPointer } from '../validator'

const PUNCTUATION_CHINESE =
  '\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5'
const PUNCTUATION_ASCII = '\x00-\x2f\x3a-\x40\x5b-\x60\x7a-\x7f'
const REGEXP_ALL_PUNCTUATIONS = new RegExp(
  `^[${PUNCTUATION_CHINESE}${PUNCTUATION_ASCII}]*$`
)

/**
 * Tag
 */
export const validateTagName = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return intl.formatMessage({
      defaultMessage: 'Not support using punctuation marks alone.',
      id: 'yubNcI',
    })
  }
}

/**
 * User
 */
export const validateEmail = (
  value: string,
  intl: IntlShape,
  options: ValidEmailOptions
) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  } else if (!isValidEmail(value, options)) {
    return intl.formatMessage({
      defaultMessage: 'Please fill in a valid email address',
      id: 'EBEwaP',
    })
  }
}

export const validateCode = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }
}

export const validatePassword = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  } else if (!isValidPassword(value)) {
    return intl.formatMessage({
      defaultMessage:
        'Minimum 8 characters. Uppercase/lowercase letters, numbers and symbols are allowed',
      id: 'ml3SZN',
    })
  }
}

export const validateComparedPassword = (
  value: string,
  comparedValue: string,
  intl: IntlShape
) => {
  if (!comparedValue) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  } else if (comparedValue !== value) {
    return intl.formatMessage({
      defaultMessage:
        'The new password and confirmation password do not match.',
      id: 'kHMa3H',
    })
  }
}

export const validatePaymentPassword = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  } else if (!isValidPaymentPassword(value)) {
    return intl.formatMessage({
      defaultMessage: 'Enter a 6-digit payment password.',
      id: 'OpeFTV',
    })
  }
}

export const validatePaymentPointer = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  } else if (!isValidPaymentPointer(value)) {
    return intl.formatMessage({
      defaultMessage: 'The wallet address starts with "$".',
      id: 'i7cXnf',
    })
  }
}

export const validateUserName = (value: string, intl: IntlShape) => {
  if (value.length > MAX_USER_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `ID must be between {MIN_USER_NAME_LENGTH} and {MAX_USER_NAME_LENGTH} characters long`,
        id: 'CNMDU5',
      },
      {
        MAX_USER_NAME_LENGTH,
        MIN_USER_NAME_LENGTH,
      }
    )
  }

  if (hasUpperCase(value)) {
    return intl.formatMessage({
      defaultMessage:
        'ID can only contain lowercase letters, numbers and underscores',
      id: '6XIcxZ',
    })
  }
}

export const validateCollectionTitle = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  if (value.length < MIN_COLLECTION_TITLE_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_COLLECTION_TITLE_LENGTH}-{MAX_COLLECTION_TITLE_LENGTH} characters long.`,
        id: 'El+nq2',
      },
      {
        MAX_COLLECTION_TITLE_LENGTH,
        MIN_COLLECTION_TITLE_LENGTH,
      }
    )
  }

  if (value.length > MAX_COLLECTION_TITLE_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_COLLECTION_TITLE_LENGTH}-{MAX_COLLECTION_TITLE_LENGTH} characters long.`,
        id: 'El+nq2',
      },
      {
        MAX_COLLECTION_TITLE_LENGTH,
        MIN_COLLECTION_TITLE_LENGTH,
      }
    )
  }
}

export const validateDisplayName = (
  value: string,
  intl: IntlShape,
  isAdmin?: boolean
) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  if (value.length < MIN_USER_DISPLAY_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_USER_DISPLAY_NAME_LENGTH}-{MAX_USER_DISPLAY_NAME_LENGTH} characters long.`,
        id: 'ruZqtT',
      },
      {
        MIN_USER_DISPLAY_NAME_LENGTH,
        MAX_USER_DISPLAY_NAME_LENGTH,
      }
    )
  }

  if (value.length > MAX_USER_DISPLAY_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_USER_DISPLAY_NAME_LENGTH}-{MAX_USER_DISPLAY_NAME_LENGTH} characters long.`,
        id: 'ruZqtT',
      },
      {
        MIN_USER_DISPLAY_NAME_LENGTH,
        MAX_USER_DISPLAY_NAME_LENGTH,
      }
    )
  }

  const invalidNameIndex = RESERVED_NAMES.indexOf(value.toLowerCase())
  if (invalidNameIndex >= 0 && !isAdmin) {
    return intl.formatMessage(
      {
        defaultMessage: `"{name}" is invalid.`,
        id: 'i4OBEw',
      },
      {
        name: RESERVED_NAMES[invalidNameIndex],
      }
    )
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return intl.formatMessage({
      defaultMessage: 'Not support using punctuation marks alone.',
      id: 'yubNcI',
    })
  }
}

export const validateDescription = (
  value: string,
  intl: IntlShape,
  max?: number
) => {
  const maxLength = max || MAX_DESCRIPTION_LENGTH

  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  } else if (value.length > maxLength) {
    return intl.formatMessage(
      {
        defaultMessage: `Maximum {maxLength} characters, current {current} characters.`,
        id: 'j8oldW',
      },
      {
        maxLength,
        current: value.length,
      }
    )
  }
}

/**
 * Circle
 */
export const validateCircleName = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  // 2-20 characters, only accept alphabet, number and _.
  if (value.length < MIN_CIRCLE_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_CIRCLE_NAME_LENGTH}-{MAX_CIRCLE_NAME_LENGTH} characters long.`,
        id: 'U4+4Rb',
      },
      {
        MIN_CIRCLE_NAME_LENGTH,
        MAX_CIRCLE_NAME_LENGTH,
      }
    )
  }

  if (value.length > MAX_CIRCLE_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_CIRCLE_NAME_LENGTH}-{MAX_CIRCLE_NAME_LENGTH} characters long.`,
        id: 'U4+4Rb',
      },
      {
        MIN_CIRCLE_NAME_LENGTH,
        MAX_CIRCLE_NAME_LENGTH,
      }
    )
  }

  const invalidNameIndex = RESERVED_CIRCLE_NAMES.indexOf(value.toLowerCase())
  if (invalidNameIndex >= 0) {
    return intl.formatMessage(
      {
        defaultMessage: `"{name}" is invalid.`,
        id: 'i4OBEw',
      },
      {
        name: RESERVED_CIRCLE_NAMES[invalidNameIndex],
      }
    )
  }

  if (!/^[a-zA-Z0-9_]*$/.test(value)) {
    return intl.formatMessage({
      defaultMessage:
        'Must be between 2-20 characters long. Only letters letters, numbers and underline are allowed.',
      id: 'XlfiKR',
    })
  }
}

export const validateCircleDisplayName = (value: string, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  if (value.length < MIN_CIRCLE_DISPLAY_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_CIRCLE_DISPLAY_NAME_LENGTH}-{MAX_CIRCLE_DISPLAY_NAME_LENGTH} characters long.`,
        id: 'OwtCWk',
      },
      {
        MIN_CIRCLE_DISPLAY_NAME_LENGTH,
        MAX_CIRCLE_DISPLAY_NAME_LENGTH,
      }
    )
  }

  if (value.length > MAX_CIRCLE_DISPLAY_NAME_LENGTH) {
    return intl.formatMessage(
      {
        defaultMessage: `Must be between {MIN_CIRCLE_DISPLAY_NAME_LENGTH}-{MAX_CIRCLE_DISPLAY_NAME_LENGTH} characters long.`,
        id: 'OwtCWk',
      },
      {
        MIN_CIRCLE_DISPLAY_NAME_LENGTH,
        MAX_CIRCLE_DISPLAY_NAME_LENGTH,
      }
    )
  }

  const invalidNameIndex = RESERVED_NAMES.indexOf(value.toLowerCase())
  if (invalidNameIndex >= 0) {
    return intl.formatMessage(
      {
        defaultMessage: `"{name}" is invalid.`,
        id: 'i4OBEw',
      },
      {
        name: RESERVED_NAMES[invalidNameIndex],
      }
    )
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return intl.formatMessage({
      defaultMessage: 'Not support using punctuation marks alone.',
      id: 'yubNcI',
    })
  }
}

export const validateCircleAmount = (value: number, intl: IntlShape) => {
  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  if (value < PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD) {
    return intl.formatMessage(
      {
        defaultMessage: `Minimum amount is HKD {min}`,
        id: '3yQyYm',
      },
      {
        min: PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD,
      }
    )
  }

  if (value > PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD) {
    return intl.formatMessage(
      {
        defaultMessage: `Maximum amount is HKD {max}`,
        id: 'qBOEDo',
      },
      {
        max: PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD,
      }
    )
  }
}

/**
 * Payment
 */
export const validateAmount = (value: number, intl: IntlShape) => {
  // TODO: multi-currency support

  if (!value) {
    return intl.formatMessage({
      defaultMessage: 'Required',
      id: 'Seanpx',
    })
  }

  if (value < PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD) {
    return intl.formatMessage(
      {
        defaultMessage: `Minimum amount is HKD {min}`,
        id: '3yQyYm',
      },
      {
        min: PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD,
      }
    )
  }
}

export const validateDonationAmount = (
  value: number,
  balance: number,
  intl: IntlShape
) => {
  if (value === 0) {
    return intl.formatMessage({
      defaultMessage: 'Please select or enter amount',
      id: '6CQaLH',
    })
  }
}

export const validatePayoutAmount = ({
  min,
  max,
  value,
  intl,
}: {
  min: number
  max: number
  value: number
  intl: IntlShape
}) => {
  if (value < min) {
    return intl.formatMessage(
      {
        defaultMessage: `Minimum amount is HKD {min}`,
        id: '3yQyYm',
      },
      {
        min,
      }
    )
  }

  if (value > max) {
    return intl.formatMessage(
      {
        defaultMessage: `Maximum amount is HKD {max}`,
        id: 'qBOEDo',
      },
      {
        max,
      }
    )
  }
}

export const validateCurrency = (value: string, intl: IntlShape) => {
  if (!PAYMENT_CURRENCY[value as keyof typeof PAYMENT_CURRENCY]) {
    return intl.formatMessage({
      defaultMessage: 'Please select a currency',
      id: 'OxGicx',
    })
  }
}
