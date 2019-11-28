import { TEXT } from '~/common/enums'
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
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (!isValidEmail(value, options)) {
    result = {
      zh_hant: TEXT.zh_hant.invalidEmail,
      zh_hans: TEXT.zh_hans.invalidEmail
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateCode = (value: string, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validatePassword = (value: string, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (!isValidPassword(value)) {
    result = {
      zh_hant: TEXT.zh_hant.passwordHint,
      zh_hans: TEXT.zh_hans.passwordHint
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateComparedPassword = (
  value: string,
  comparedValue: string,
  lang: Language
) => {
  let result

  if (!comparedValue) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (comparedValue !== value) {
    result = {
      zh_hant: TEXT.zh_hant.passwordNotMatch,
      zh_hans: TEXT.zh_hans.passwordNotMatch
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateUserName = (value: string, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (!isValidUserName(value)) {
    result = {
      zh_hant: TEXT.zh_hant.userNameHint,
      zh_hans: TEXT.zh_hans.userNameHint
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateComparedUserName = (
  value: string,
  comparedValue: string,
  lang: Language
) => {
  let result

  if (!comparedValue) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (comparedValue !== value) {
    result = {
      zh_hant: TEXT.zh_hant.invalidUserName,
      zh_hans: TEXT.zh_hans.invalidUserName
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateDisplayName = (
  value: string,
  lang: Language,
  isAdmin?: boolean
) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (!isValidDisplayName(value) && !isAdmin) {
    result = {
      zh_hant: TEXT.zh_hant.displayNameHint,
      zh_hans: TEXT.zh_hans.displayNameHint
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateDescription = (value: string, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  } else if (value.length > 200) {
    result = {
      zh_hant: `已超過 200 字，目前 ${value.length} 字`,
      zh_hans: `已超过 200 字，目前 ${value.length} 字`
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateToS = (value: boolean, lang: Language) => {
  let result

  if (value === false) {
    result = { zh_hant: '請勾選', zh_hans: '请勾选' }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}

export const validateAvatar = (value: string | null, lang: Language) => {
  let result

  if (!value) {
    result = {
      zh_hant: TEXT.zh_hant.required,
      zh_hans: TEXT.zh_hans.required
    }
  }

  if (result) {
    return translate({ ...result, lang })
  }
}
