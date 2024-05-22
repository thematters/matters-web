import { FormattedMessage } from 'react-intl'

import { redirectToTarget } from '~/common/utils'
import { Dialog } from '~/components'

const Complete: React.FC = () => {
  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Liker ID" id="iEJeQH" />}
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Your Liker ID is ready!"
              id="OKcHPP"
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
            onClick={() => {
              redirectToTarget({
                fallback: 'current',
              })
            }}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
            onClick={() => {
              redirectToTarget({
                fallback: 'current',
              })
            }}
          />
        }
      />
    </>
  )
}

export default Complete
