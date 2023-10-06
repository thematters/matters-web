import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { ERROR_MESSAGES, toast } from '~/components'

import AppreciateButton from './AppreciateButton'

const ForbiddenButton = ({
  count,
  total,
}: {
  count?: number
  total: number
}) => (
  <AppreciateButton
    count={count}
    total={total}
    onClick={() => {
      toast.error({
        message: (
          <FormattedMessage
            {...ERROR_MESSAGES[ERROR_CODES.INSUFFICIENT_AUTHORITY]}
          />
        ),
      })
    }}
  />
)

export default ForbiddenButton
