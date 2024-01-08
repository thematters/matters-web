import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { ButtonProps } from '~/components'

import AppreciateButton from './AppreciateButton'

const AnonymousButton = ({
  count,
  total,
  showText,
  iconSize = 'mdS',
  textWeight = 'md',
  textIconSpacing = 'xtight',
  ...buttonProps
}: {
  count?: number
  total: number
  showText?: boolean
  iconSize?: 'mdS' | 'md'
  textWeight?: 'md' | 'normal'
  textIconSpacing?: 'xxtight' | 'xtight' | 'basexxtight'
} & ButtonProps) => (
  <AppreciateButton
    count={count}
    total={total}
    showText={showText}
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
    {...buttonProps}
  />
)

export default AnonymousButton
