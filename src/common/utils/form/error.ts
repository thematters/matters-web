import { ApolloError } from '@apollo/client'
import { MessageDescriptor } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { getErrorCodes } from '~/components/GQL'

type ErrorMessages = { [key in ERROR_CODES]: MessageDescriptor }

export const parseFormSubmitErrors = (
  error: ApolloError
): [ErrorMessages, ERROR_CODES[]] => {
  const codes = getErrorCodes(error)
  const messages: ErrorMessages = {} as any

  codes.forEach((code) => {
    messages[code] = ERROR_MESSAGES[code] as MessageDescriptor
  })

  return [messages, codes]
}
