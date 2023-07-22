import {
  MAX_ARTICLE_SUPPORT_LENGTH,
  MAX_CIRCLE_DISPLAY_NAME_LENGTH,
  MAX_CIRCLE_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_CIRCLE_DISPLAY_NAME_LENGTH,
  MIN_CIRCLE_NAME_LENGTH,
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
  translate,
  ValidEmailOptions,
} from '~/common/utils'

import { isValidPaymentPointer } from '../validator'

const PUNCTUATION_CHINESE =
  '\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5'
const PUNCTUATION_ASCII = '\x00-\x2f\x3a-\x40\x5b-\x60\x7a-\x7f'
const REGEXP_ALL_PUNCTUATIONS = new RegExp(
  `^[${PUNCTUATION_CHINESE}${PUNCTUATION_ASCII}]*$`
)

/**
 * Tag
 */
export const validateTagName = (value: string, lang: Language) => {
  if (!value) {
    return translate({
      id: 'required',
      lang,
    })
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return translate({
      zh_hant: '不支持單獨使用標點符號',
      zh_hans: '不支持单独使用标点符号',
      en: 'Not support using punctuation marks alone.',
      lang,
    })
  }
}

/**
 * User
 */
export const validateEmail = (
  value: string,
  lang: Language,
  options: ValidEmailOptions
) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidEmail(value, options)) {
    return translate({ id: 'invalidEmail', lang })
  }
}

export const validateCode = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }
}

export const validatePassword = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidPassword(value)) {
    return translate({ id: 'hintPassword', lang })
  }
}

export const validateComparedPassword = (
  value: string,
  comparedValue: string,
  lang: Language
) => {
  if (!comparedValue) {
    return translate({ id: 'required', lang })
  } else if (comparedValue !== value) {
    return translate({ id: 'passwordNotMatch', lang })
  }
}

export const validatePaymentPassword = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidPaymentPassword(value)) {
    return translate({ id: 'hintPaymentPassword', lang })
  }
}

export const validatePaymentPointer = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidPaymentPointer(value)) {
    return translate({ id: 'hintPaymentPointer', lang })
  }
}

export const validateUserName = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }

  const en =
    'Must be between 4-15 characters long. Only lowercase letters, numbers and underline are accepted.'

  // 4-15 characters, only accept alphabet, number and _.
  if (value.length < 4) {
    return translate({
      zh_hant: '輸入字數過短，僅供輸入 4-15 個字元',
      zh_hans: '输入字数过短，仅供输入 4-15 个字符',
      en,
      lang,
    })
  }

  if (value.length > 15) {
    return translate({
      zh_hant: '輸入字數過長，僅供輸入 4-15 個字元',
      zh_hans: '输入字数过长，仅供输入 4-15 个字符',
      en,
      lang,
    })
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return translate({
      zh_hant: '不支持單獨使用標點符號',
      zh_hans: '不支持单独使用标点符号',
      en,
      lang,
    })
  }

  if (!/^[a-zA-Z0-9_]*$/.test(value)) {
    return translate({
      id: 'hintUserName',
      lang,
    })
  }
}

export const validateComparedUserName = (
  value: string,
  comparedValue: string,
  lang: Language
) => {
  if (!comparedValue) {
    return translate({ id: 'required', lang })
  } else if (comparedValue !== value) {
    return translate({ id: 'invalidUserName', lang })
  }
}

export const validateCollectionTitle = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }

  if (value.length < 1) {
    return translate({
      zh_hant: '輸入字數過短，僅供輸入 1-40 個字元',
      zh_hans: '输入字数过短，仅供输入 1-40 个字符',
      en: 'Must be between 1-40 characters long.',
      lang,
    })
  }

  if (value.length > 40) {
    return translate({
      zh_hant: '輸入字數過長，僅供輸入 1-40 個字元',
      zh_hans: '输入字数过长，仅供输入 1-40 个字符',
      en: 'Must be between 1-40 characters long.',
      lang,
    })
  }
}

export const validateDisplayName = (
  value: string,
  lang: Language,
  isAdmin?: boolean
) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }

  if (value.length < 2) {
    return translate({
      zh_hant: '輸入字數過短，僅供輸入 2-20 個字元',
      zh_hans: '输入字数过短，仅供输入 2-20 个字符',
      en: 'Must be between 2-20 characters long.',
      lang,
    })
  }

  if (value.length > 20) {
    return translate({
      zh_hant: '輸入字數過長，僅供輸入 2-20 個字元',
      zh_hans: '输入字数过长，仅供输入 2-20 个字符',
      en: 'Must be between 2-20 characters long.',
      lang,
    })
  }

  const invalidNameIndex = RESERVED_NAMES.indexOf(value.toLowerCase())
  if (invalidNameIndex >= 0 && !isAdmin) {
    return translate({
      zh_hant: `不能使用「${RESERVED_NAMES[invalidNameIndex]}」`,
      zh_hans: `不能使用 “${RESERVED_NAMES[invalidNameIndex]}”`,
      en: `Cannot use "${RESERVED_NAMES[invalidNameIndex]}"`,
      lang,
    })
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return translate({
      zh_hant: '不支持單獨使用標點符號',
      zh_hans: '不支持单独使用标点符号',
      en: 'Not support using punctuation marks alone.',
      lang,
    })
  }
}

export const validateDescription = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (value.length > MAX_DESCRIPTION_LENGTH) {
    return translate({
      zh_hant: `已超過 ${MAX_DESCRIPTION_LENGTH} 字，目前 ${value.length} 字`,
      zh_hans: `已超过 ${MAX_DESCRIPTION_LENGTH} 字，目前 ${value.length} 字`,
      en: `Maximum ${MAX_DESCRIPTION_LENGTH} characters, current ${value.length} characters.`,
      lang,
    })
  }
}

export const validateSupportWords = (value: string, lang: Language) => {
  if (!value) return
  if (value.length > MAX_ARTICLE_SUPPORT_LENGTH) {
    {
      return translate({
        zh_hant: `已超過 ${MAX_ARTICLE_SUPPORT_LENGTH} 字，目前 ${value.length} 字`,
        zh_hans: `已超过 ${MAX_ARTICLE_SUPPORT_LENGTH} 字，目前 ${value.length} 字`,
        en: `Maximum ${MAX_ARTICLE_SUPPORT_LENGTH} characters, current ${value.length} characters.`,
        lang,
      })
    }
  }
}

export const validateToS = (value: boolean, lang: Language) => {
  if (value === false) {
    return translate({
      zh_hant: '請勾選',
      zh_hans: '请勾选',
      en: 'Please check',
      lang,
    })
  }
}

export const validateAvatar = (value: string | null, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }
}

/**
 * Circle
 */
export const validateCircleName = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }

  // 2-20 characters, only accept alphabet, number and _.
  if (value.length < MIN_CIRCLE_NAME_LENGTH) {
    return translate({
      zh_hant: `輸入字數過短，僅供輸入 ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} 個字元`,
      zh_hans: `输入字数过短，仅供输入 ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} 个字符`,
      en: `Must be between ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} characters long.`,
      lang,
    })
  }

  if (value.length > MAX_CIRCLE_NAME_LENGTH) {
    return translate({
      zh_hant: `輸入字數過長，僅供輸入 ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} 個字元`,
      zh_hans: `输入字数过长，仅供输入 ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} 个字符`,
      en: `Must be between ${MIN_CIRCLE_NAME_LENGTH}-${MAX_CIRCLE_NAME_LENGTH} characters long.`,
      lang,
    })
  }

  const invalidNameIndex = RESERVED_CIRCLE_NAMES.indexOf(value.toLowerCase())
  if (invalidNameIndex >= 0) {
    return translate({
      zh_hant: `不能使用「${RESERVED_CIRCLE_NAMES[invalidNameIndex]}」`,
      zh_hans: `不能使用 “${RESERVED_CIRCLE_NAMES[invalidNameIndex]}”`,
      en: `"${RESERVED_CIRCLE_NAMES[invalidNameIndex]}" is invalid.`,
      lang,
    })
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return translate({
      zh_hant: '不支持單獨使用標點符號',
      zh_hans: '不支持单独使用标点符号',
      en: 'Not support using punctuation marks alone.',
      lang,
    })
  }

  if (!/^[a-zA-Z0-9_]*$/.test(value)) {
    return translate({
      id: 'hintCircleName',
      lang,
    })
  }
}

export const validateCircleDisplayName = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }

  if (value.length < MIN_CIRCLE_DISPLAY_NAME_LENGTH) {
    return translate({
      zh_hant: `輸入字數過短，僅供輸入 ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} 個字元`,
      zh_hans: `输入字数过短，仅供输入 ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} 個字符`,
      en: `Must be between ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} characters long.`,
      lang,
    })
  }

  if (value.length > MAX_CIRCLE_DISPLAY_NAME_LENGTH) {
    return translate({
      zh_hant: `輸入字數過長，僅供輸入 ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} 個字元`,
      zh_hans: `输入字数过长，仅供输入 ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} 個字符`,
      en: `Must be between ${MIN_CIRCLE_DISPLAY_NAME_LENGTH}-${MAX_CIRCLE_DISPLAY_NAME_LENGTH} characters long.`,
      lang,
    })
  }

  const invalidNameIndex = RESERVED_NAMES.indexOf(value.toLowerCase())
  if (invalidNameIndex >= 0) {
    return translate({
      zh_hant: `不能使用「${RESERVED_NAMES[invalidNameIndex]}」`,
      zh_hans: `不能使用 “${RESERVED_NAMES[invalidNameIndex]}”`,
      en: `"${RESERVED_NAMES[invalidNameIndex]}" is invalid.`,
      lang,
    })
  }

  if (REGEXP_ALL_PUNCTUATIONS.test(value)) {
    return translate({
      zh_hant: '不支持單獨使用標點符號',
      zh_hans: '不支持单独使用标点符号',
      en: 'Not support using punctuation marks alone.',
      lang,
    })
  }
}

export const validateCircleAmount = (value: number, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }

  if (value < PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD) {
    return translate({
      zh_hant: `最小金額爲 HKD ${PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}`,
      zh_hans: `最小金额为 HKD ${PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}`,
      en: `Minimum amount is HKD ${PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}`,
      lang,
    })
  }

  if (value > PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD) {
    return translate({
      zh_hant: `最大金額爲 HKD ${PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}`,
      zh_hans: `最大金额为 HKD ${PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}`,
      en: `Maximum amount is HKD ${PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}`,
      lang,
    })
  }
}

/**
 * Payment
 */
export const validateAmount = (value: number, lang: Language) => {
  // TODO: multi-currency support

  if (!value) {
    return translate({ id: 'required', lang })
  }

  if (value < PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD) {
    return translate({
      zh_hant: `最小储值金額爲 HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`,
      zh_hans: `最小储值金额为 HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`,
      en: `Minimum amount is HKD ${PAYMENT_MINIMAL_ADD_CREDIT_AMOUNT.HKD}`,
      lang,
    })
  }
}

export const validateDonationAmount = (
  value: number,
  balance: number,
  lang: Language
) => {
  if (typeof value !== 'number') {
    return translate({ id: 'required', lang })
  }

  if (value === 0) {
    return translate({
      zh_hant: '請選擇或輸入金額',
      zh_hans: '请选择或输入金额',
      en: 'Please select or enter amount',
      lang,
    })
  }

  if (balance < value) {
    return translate({
      zh_hant: '自訂金額大於餘額',
      zh_hans: '自订金额大于余额',
      en: 'Custom amount is greater than your balance',
      lang,
    })
  }
}

export const validatePayoutAmount = ({
  min,
  max,
  value,
  lang,
}: {
  min: number
  max: number
  value: number
  lang: Language
}) => {
  if (typeof value !== 'number') {
    return translate({ id: 'required', lang })
  }

  if (value < min) {
    return translate({
      zh_hant: `最少提現金額爲 HKD ${min}`,
      zh_hans: `最少提现金額爲 HKD ${min}`,
      en: `Minimum amount is HKD ${min}`,
      lang,
    })
  }

  if (value > max) {
    return translate({
      zh_hant: `最高提現金額爲 HKD ${max}`,
      zh_hans: `最高提现金額爲 HKD ${max}`,
      en: `Maximum amount is HKD ${max}`,
      lang,
    })
  }
}

export const validateCurrency = (value: string, lang: Language) => {
  if (!PAYMENT_CURRENCY[value as keyof typeof PAYMENT_CURRENCY]) {
    return translate({
      zh_hant: '請選擇一種幣別',
      zh_hans: '请选择一种币别',
      en: 'Please select a currency',
      lang,
    })
  }
}
