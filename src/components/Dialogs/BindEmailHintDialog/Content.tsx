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
                defaultMessage="You have not verified your email yet. For security, email is required for top-up."
                id="iyvpwA"
              />
            )}
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              text={
                !hasEmail ? (
                  <FormattedMessage
                    defaultMessage="Connect"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="vB45rC"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Verify"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="L487Vy"
                  />
                )
              }
              onClick={gotoSettings}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={
                !hasEmail ? (
                  <FormattedMessage
                    defaultMessage="Connect"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="vB45rC"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Verify"
                    description="src/components/Dialogs/BindEmailHintDialog/Content.tsx"
                    id="L487Vy"
                  />
                )
              }
              onClick={gotoSettings}
            />
          </>
        }
      />
    </>
  )
}

export default Content
