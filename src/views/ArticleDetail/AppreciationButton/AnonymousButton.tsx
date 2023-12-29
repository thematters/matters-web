import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { ButtonProps } from '~/components'

import AppreciateButton from './AppreciateButton'

const AnonymousButton = ({
  count,
  total,
  iconSize = 'mdS',
  textIconSpace = 'xtight',
  ...buttonProps
}: {
  count?: number
  total: number
  iconSize?: 'mdS' | 'md'
  textIconSpace?: 'xtight' | 'basexxtight'
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
    textIconSpace={textIconSpace}
    {...buttonProps}
  />
)

export default AnonymousButton
