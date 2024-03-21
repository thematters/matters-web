import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { ButtonProps, toast } from '~/components'

import AppreciateButton from './AppreciateButton'

const ForbiddenButton = ({
  count,
  total,
  iconSize = 'mdS',
  textWeight = 'md',
  textIconSpacing = 'xtight',
  ...buttonProps
}: {
  count?: number
  total: number
  iconSize?: 'mdS' | 'md'
  textWeight?: 'md' | 'normal'
  textIconSpacing?: 'xxtight' | 'xtight' | 'basexxtight'
} & ButtonProps) => (
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
    textWeight={textWeight}
    textIconSpacing={textIconSpacing}
    {...buttonProps}
  />
)

export default ForbiddenButton
