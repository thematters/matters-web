import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'

import AppreciateButton from './AppreciateButton'

const AnonymousButton = ({
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
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.appreciation },
        })
      )
    }}
    iconSize={iconSize}
    textIconSpace={textIconSpace}
  />
)

export default AnonymousButton
