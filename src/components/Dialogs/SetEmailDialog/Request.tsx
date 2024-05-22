import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ViewerContext } from '~/components/Context'
import { Dialog } from '~/components/Dialog'

interface Props {
  gotoConnect?: () => void
  closeDialog: () => void
}

/**
 * Request to connect or verify email
 */
const Request: React.FC<Props> = ({ gotoConnect, closeDialog }) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  const isConnect = !hasEmail

  return (
    <>
      <Dialog.Header
        title={
          isConnect ? (
            <FormattedMessage
              defaultMessage="Please connect email"
              id="WxhsrG"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Please verify email"
              id="K2ec8y"
            />
          )
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            {isConnect ? (
              <FormattedMessage
                defaultMessage="You have not connected your email yet. For security, email is required for top-up."
                id="OK2u69"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Credit card support requires emails related to financial information, please verify your email address first."
                id="f24jaP"
              />
            )}
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            {isConnect && (
              <Dialog.RoundedButton
                text={
                  <FormattedMessage
                    defaultMessage="Connect"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="vB45rC"
                  />
                }
                onClick={gotoConnect}
              />
            )}
            <Dialog.RoundedButton
              text={
                isConnect ? (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                ) : (
                  <FormattedMessage defaultMessage="Close" id="rbrahO" />
                )
              }
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                isConnect ? (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                ) : (
                  <FormattedMessage defaultMessage="Close" id="rbrahO" />
                )
              }
              color="greyDarker"
              onClick={closeDialog}
            />
            {isConnect && (
              <Dialog.TextButton
                text={
                  <FormattedMessage
                    defaultMessage="Connect"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="vB45rC"
                  />
                }
                onClick={gotoConnect}
              />
            )}
          </>
        }
      />
    </>
  )
}

export default Request
