import { PAYMENT_CURRENCY, PAYMENT_MINIMAL_CHARGE_AMOUNT } from '~/common/enums'
import {
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  isValidPaymentPassword,
  isValidUserName,
  translate,
  ValidEmailOptions,
} from '~/common/utils'

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

export const validateUserName = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidUserName(value)) {
    return translate({ id: 'hintUserName', lang })
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

export const validateDisplayName = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidDisplayName(value)) {
    return translate({ id: 'hintDisplayName', lang })
  }
}

export const validateDescription = (value: string, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (value.length > 200) {
    return translate({
      zh_hant: `已超過 200 字，目前 ${value.length} 字`,
      zh_hans: `已超过 200 字，目前 ${value.length} 字`,
      lang,
    })
  }
}

export const validateToS = (value: boolean, lang: Language) => {
  if (value === false) {
    return translate({ zh_hant: '請勾選', zh_hans: '请勾选', lang })
  }
}

export const validateAvatar = (value: string | null, lang: Language) => {
  if (!value) {
    return translate({ id: 'required', lang })
  }
}

export const validateAmount = (value: number, lang: Language) => {
  // TODO: multi-currency support

  if (!value) {
    return translate({ id: 'required', lang })
  }

  if (value < PAYMENT_MINIMAL_CHARGE_AMOUNT.HKD) {
    return translate({
      zh_hant: `最少储值金額爲 HKD ${PAYMENT_MINIMAL_CHARGE_AMOUNT.HKD}`,
      zh_hans: `最少储值金额为 HKD ${PAYMENT_MINIMAL_CHARGE_AMOUNT.HKD}`,
      lang,
    })
  }
}

export const validateDonationAmount = (value: number, lang: Language) => {
  if (typeof value !== 'number') {
    return translate({ id: 'required', lang })
  }

  if (value === 0) {
    return translate({
      zh_hant: '請選擇或輸入金額',
      zh_hans: '请选择或输入金额',
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
      lang,
    })
  }

  if (value > max) {
    return translate({
      zh_hant: `最高提現金額爲 HKD ${max}`,
      zh_hans: `最高提现金額爲 HKD ${max}`,
      lang,
    })
  }
}

export const validateCurrency = (value: string, lang: Language) => {
  if (!PAYMENT_CURRENCY[value as keyof typeof PAYMENT_CURRENCY]) {
    return translate({
      zh_hant: '請選擇一種幣別',
      zh_hans: '请选择一种币别',
      lang,
    })
  }
}
