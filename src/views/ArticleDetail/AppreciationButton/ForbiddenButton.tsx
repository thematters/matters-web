import { FormattedMessage } from 'react-intl'

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
            content: (
              <FormattedMessage
                defaultMessage="You do not have permission to perform this operation"
                description=""
              />
            ),
          },
        })
      )
    }}
  />
)

export default ForbiddenButton
