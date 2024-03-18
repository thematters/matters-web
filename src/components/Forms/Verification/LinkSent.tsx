import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, Layout, Translate, useRoute } from '~/components'

import styles from './styles.module.css'

export const VerificationLinkSent = ({
  type,
  purpose,
  closeDialog,
  email,
}: {
  type: 'register' | 'resetPassword' | 'changePassword'
  purpose?: 'dialog' | 'page'
  closeDialog?: () => void
  email?: string
}) => {
  const isRegister = type === 'register'
  const { router } = useRoute()
  const isInPage = purpose === 'page'

  if (isRegister) {
    return (
      <>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Check your inbox"
              id="5JN+nl"
              description="src/components/Forms/Verification/LinkSent.tsx"
            />
          }
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="The login link has been sent to {email}"
                id="zAK5G+"
                description="src/components/Forms/Verification/LinkSent.tsx"
                values={{
                  email: <span className={styles.email}>{email}</span>,
                }}
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        {closeDialog && (
          <Dialog.Footer
            smUpBtns={
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            }
          />
        )}

        {isInPage && (
          <Dialog.Footer
            btns={
              <Dialog.RoundedButton
                text={
                  <FormattedMessage
                    defaultMessage="Enter Matters"
                    id="A6r2p1"
                  />
                }
                onClick={() => router.push(PATHS.HOME)}
              />
            }
            smUpBtns={
              <Dialog.TextButton
                text={
                  <FormattedMessage
                    defaultMessage="Enter Matters"
                    id="A6r2p1"
                  />
                }
                onClick={() => router.push(PATHS.HOME)}
              />
            }
          />
        )}
      </>
    )
  }

  return (
    <>
      {isInPage && (
        <Layout.Header
          left={
            <Layout.Header.Title>
              <FormattedMessage defaultMessage="Register" id="deEeEI" />
            </Layout.Header.Title>
          }
        />
      )}

      {closeDialog && (
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Register" id="deEeEI" />}
          closeDialog={closeDialog}
          closeText={
            <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
          }
        />
      )}

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <Translate
              zh_hant="我們已將驗證連結寄出 📩"
              zh_hans="我们已将验证链接寄出 📩"
              en="We have sent verification link to you 📩"
            />
            <br />
            <Translate
              zh_hant="連結有效期 20 分鐘，快去電子信箱看看吧！"
              zh_hans="连结有效期 20 分钟，快去邮箱看看吧！"
              en="Link is valid for 20 minutes. Let's check your inbox!"
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      {closeDialog && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
              }
              color="green"
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}
