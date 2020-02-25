import { ApolloError } from 'apollo-client'
import _identity from 'lodash/identity'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import { getErrorCodes } from '~/components/GQL'

import { ErrorCodeKeys, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

export const filterFormErrors = (obj: { [key: string]: any }) =>
  _pickBy(obj, _identity)

type ErrorMessages = { [key in ErrorCodeKeys]: string }

export const parseFormSubmitErrors = (
  error: ApolloError,
  lang: Language
): [ErrorMessages, ErrorCodeKeys[]] => {
  const codes = getErrorCodes(error)
  const messages: ErrorMessages = {} as any

  codes.forEach(code => {
    messages[code] = translate({
      zh_hant: TEXT.zh_hant.error[code] || TEXT.zh_hant.error.UNKNOWN_ERROR,
      zh_hans: TEXT.zh_hans.error[code] || TEXT.zh_hans.error.UNKNOWN_ERROR,
      lang
    })
  })

  return [messages, codes]
}
