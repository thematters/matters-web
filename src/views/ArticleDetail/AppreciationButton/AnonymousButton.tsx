import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { ButtonProps } from '~/components'

import AppreciateButton from './AppreciateButton'

const AnonymousButton = ({
  count,
  total,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  clickEvent,
  ...buttonProps
}: {
  count?: number
  total: number
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
  clickEvent?: () => void
} & ButtonProps) => (
  <AppreciateButton
    count={count}
    total={total}
    onClick={() => {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.appreciation },
        })
      )
    }}
    iconSize={iconSize}
    textWeight={textWeight}
    textIconSpacing={textIconSpacing}
    clickEvent={clickEvent}
    {...buttonProps}
  />
)

export default AnonymousButton
