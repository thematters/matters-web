import { FormattedMessage } from 'react-intl'

import { Dialog, Layout, Translate } from '~/components'

export const VerificationLinkSent = ({
  type,
  purpose,
  closeDialog,
}: {
  type: 'register' | 'resetPassword' | 'changePassword'
  purpose?: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isRegister = type === 'register'
  const isInPage = purpose === 'page'

  return (
    <>
      {isInPage && <Layout.Header left={<Layout.Header.Title id={type} />} />}

      {closeDialog && (
        <Dialog.Header
          title="register"
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Understood" />}
        />
      )}

      <Dialog.Message>
        <p>
          <Translate
            zh_hant={
              isRegister ? '我們已將註冊連結寄出 📩' : '我們已將驗證連結寄出 📩'
            }
            zh_hans={
              isRegister ? '我们已将注册链接寄出 📩' : '我们已将验证链接寄出 📩'
            }
            en={
              isRegister
                ? 'We have sent register link to you 📩'
                : 'We have sent verification link to you 📩'
            }
          />
          <br />
          <Translate
            zh_hant="連結有效期 20 分鐘，快去電子信箱看看吧！"
            zh_hans="连结有效期 20 分钟，快去邮箱看看吧！"
            en="Link is valid for 20 minutes. Let's check your inbox!"
          />
        </p>
      </Dialog.Message>

      {closeDialog && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Understood" />}
              color="green"
              onClick={closeDialog}
            />
          }
        />
      )}
    </>
  )
}
