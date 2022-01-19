import { Dialog, Form, LanguageSwitch, Layout, Translate } from '~/components'

import styles from './styles.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  gotoWalletLogin: () => void
  gotoEmailLogin: () => void
  closeDialog?: () => void
}

export const SelectLoginMethodForm: React.FC<FormProps> = ({
  purpose,
  gotoWalletLogin,
  gotoEmailLogin,
  closeDialog,
}) => {
  const isInPage = purpose === 'page'

  const InnerForm = (
    <Form.List groupName={<Translate id="connectMethod" />}>
      <Form.List.Item
        title={
          <Translate
            zh_hant="連接加密錢包"
            zh_hans="連接加密錢包"
            en="Wallet"
          />
        }
        onClick={gotoWalletLogin}
      />
      <Form.List.Item
        title={
          <Translate
            zh_hant="透過電子郵箱密碼"
            zh_hans="透過電子郵箱密碼"
            en="Email"
          />
        }
        onClick={gotoEmailLogin}
      />
    </Form.List>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={<Layout.Header.Title id="loginSignUp" />}
        />

        {InnerForm}

        <footer>
          <LanguageSwitch />
          <style jsx>{styles}</style>
        </footer>
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header title="loginSignUp" closeDialog={closeDialog} />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}
