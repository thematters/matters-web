import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'

import AppreciateButton from './AppreciateButton'

const AnonymousButton = ({
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
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.appreciation },
        })
      )
    }}
  />
)

export default AnonymousButton
