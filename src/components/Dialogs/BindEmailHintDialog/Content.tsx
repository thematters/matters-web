import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS, URL_ME_SETTINGS } from '~/common/enums'
import { ViewerContext } from '~/components/Context'
import { Dialog } from '~/components/Dialog'
import { useRoute } from '~/components/Hook'

interface Props {
  closeDialog: () => void
}

const Content: React.FC<Props> = ({ closeDialog }) => {
  const { router } = useRoute()
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  const gotoSettings = () => {
    if (!hasEmail) {
      router.push(
        PATHS.ME_SETTINGS +
          `?${URL_ME_SETTINGS.OPEN_SET_EMAIL_DIALOG.key}=${URL_ME_SETTINGS.OPEN_SET_EMAIL_DIALOG.value}`
      )
    } else {
      router.push(PATHS.ME_SETTINGS)
    }
  }

  return (
    <>
      <Dialog.Header
        title={
          !hasEmail ? (
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
            {!hasEmail ? (
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
            {!hasEmail && (
              <Dialog.RoundedButton
                text={
                  <FormattedMessage
                    defaultMessage="Connect"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="vB45rC"
                  />
                }
                onClick={gotoSettings}
              />
            )}
            <Dialog.RoundedButton
              text={
                !hasEmail ? (
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
                !hasEmail ? (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                ) : (
                  <FormattedMessage defaultMessage="Close" id="rbrahO" />
                )
              }
              color="greyDarker"
              onClick={closeDialog}
            />
            {!hasEmail && (
              <Dialog.TextButton
                text={
                  <FormattedMessage
                    defaultMessage="Connect"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="vB45rC"
                  />
                }
                onClick={gotoSettings}
              />
            )}
          </>
        }
      />
    </>
  )
}

export default Content
