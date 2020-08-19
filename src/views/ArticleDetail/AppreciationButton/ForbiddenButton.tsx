import { Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums'

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
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="FORBIDDEN" />,
          },
        })
      )
    }}
  />
)

export default ForbiddenButton
