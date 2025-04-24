import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'

const Complete: React.FC<{ closeDialog: () => void }> = ({ closeDialog }) => {
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
            onClick={closeDialog}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default Complete
