import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'

import AppreciateButton from './AppreciateButton'

const BlockedButton = ({ count, total }: { count?: number; total: number }) => (
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
                defaultMessage="Sorry, the author has disabled likes for this article."
                description="src/views/ArticleDetail/AppreciationButton/BlockedButton.tsx"
              />
            ),
          },
        })
      )
    }}
  />
)

export default BlockedButton
