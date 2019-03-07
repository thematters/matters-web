import { ApolloError } from 'apollo-client'

import { checkFor } from '~/components/GQL'

import { ERROR_CODES } from '~/common/enums'
import { translate } from '~/common/utils'

export const checkFormError = (
  code: string,
  error: ApolloError['graphQLErrors'],
  lang: Language
): string | undefined => {
  if (!checkFor(code, error)) {
    return undefined
  }

  let result: any

  switch (code) {
    case ERROR_CODES.CODE_EXPIRED: {
      result = {
        zh_hant: '驗證碼已過期',
        zh_hans: '验证码已过期'
      }
      break
    }
    case ERROR_CODES.CODE_INVALID: {
      result = {
        zh_hant: '驗證碼不正確',
        zh_hans: '验证码不正确'
      }
      break
    }
    case ERROR_CODES.FORBIDDEN: {
      result = {
        zh_hant: '被禁止的操作',
        zh_hans: '被禁止的操作'
      }
      break
    }
    case ERROR_CODES.USER_EMAIL_EXISTS: {
      result = {
        zh_hant: '該電子信箱已被其他使用者使用',
        zh_hans: '该邮箱已被其他用户使用'
      }
      break
    }
    case ERROR_CODES.USER_EMAIL_NOT_FOUND: {
      result = {
        zh_hant: '帳號不正確',
        zh_hans: '帐号不正确'
      }
      break
    }
    case ERROR_CODES.USER_PASSWORD_INVALID: {
      result = {
        zh_hant: '密碼不正確',
        zh_hans: '密码不正确'
      }
      break
    }
    case ERROR_CODES.USER_USERNAME_EXISTS: {
      result = {
        zh_hant: '該 Matters ID 已被其他使用者使用',
        zh_hans: '该 Matters ID 已被其他用户使用'
      }
      break
    }
  }
  if (result) {
    return translate({ ...result, lang })
  }
}
