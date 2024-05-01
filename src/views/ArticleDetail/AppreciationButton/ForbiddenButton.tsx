import { FormattedMessage } from 'react-intl'

import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { ButtonProps, toast } from '~/components'

import AppreciateButton from './AppreciateButton'

const ForbiddenButton = ({
  count,
  total,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...buttonProps
}: {
  count?: number
  total: number
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
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
