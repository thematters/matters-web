import { ApolloError } from '@apollo/client'

import { getErrorCodes } from '~/components/GQL'

import { ErrorCodeKeys, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

type ErrorMessages = { [key in ErrorCodeKeys]: string }

export const parseFormSubmitErrors = (
  error: ApolloError,
  lang: Language
): [ErrorMessages, ErrorCodeKeys[]] => {
  const codes = getErrorCodes(error)
  const messages: ErrorMessages = {} as any

  codes.forEach((code) => {
    messages[code] = translate({
      zh_hant: TEXT.zh_hant[code] || TEXT.zh_hant.UNKNOWN_ERROR,
      zh_hans: TEXT.zh_hans[code] || TEXT.zh_hans.UNKNOWN_ERROR,
      lang,
    })
  })

  return [messages, codes]
}
