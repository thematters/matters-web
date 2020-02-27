import _identity from 'lodash/identity'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import {
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  isValidUserName,
  translate,
  ValidEmailOptions
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

export const validateDisplayName = (
  value: string,
  lang: Language,
  isAdmin?: boolean
) => {
  if (!value) {
    return translate({ id: 'required', lang })
  } else if (!isValidDisplayName(value) && !isAdmin) {
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
      lang
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
