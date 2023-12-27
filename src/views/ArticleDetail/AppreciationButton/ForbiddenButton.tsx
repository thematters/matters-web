import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { toast } from '~/components'

import AppreciateButton from './AppreciateButton'

const ForbiddenButton = ({
  count,
  total,
  iconSize = 'mdS',
  textIconSpace = 'xtight',
}: {
  count?: number
  total: number
  iconSize?: 'mdS' | 'md'
  textIconSpace?: 'xtight' | 'basexxtight'
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
    iconSize={iconSize}
    textIconSpace={textIconSpace}
  />
)

export default ForbiddenButton
