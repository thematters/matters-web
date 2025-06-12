import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'

interface CompleteProps {
  closeDialog: () => void
  callback?: () => void
  callbackText?: React.ReactNode
}

const Complete: React.FC<CompleteProps> = ({
  closeDialog,
  callback,
  callbackText,
}) => {
  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Reset Payment Password"
            id="+OStJM"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Transaction Password successfully changed."
              id="l2eEyp"
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        closeDialog={callback ? undefined : closeDialog}
        closeText={
          callback ? undefined : (
            <FormattedMessage defaultMessage="Close" id="rbrahO" />
          )
        }
        btns={
          callback ? (
            <Dialog.RoundedButton text={callbackText} onClick={callback} />
          ) : null
        }
        smUpBtns={
          callback ? (
            <Dialog.TextButton text={callbackText} onClick={callback} />
          ) : null
        }
      />
    </>
  )
}

export default Complete
