import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { toast } from '~/components'

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
            {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
          />
        ),
      })
    }}
  />
)

export default ForbiddenButton
