import {
  Dialog,
  Form,
  IconEmail24,
  IconWallet24,
  LanguageSwitch,
  Layout,
  Spacer,
  TextIcon,
  Translate,
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  OPEN_WALLET_SIGNUP_DIALOG,
} from '~/common/enums'

import styles from './styles.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const isInPage = purpose === 'page'
  const formId = 'login-sign-up-init-form'

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      <Form.List groupName={<Translate id="connectMethod" />}>
        <Form.List.Item
          title={
            <TextIcon
              color="black"
              icon={<IconWallet24 size="md" />}
              size="md"
              spacing="xtight"
            >
              <Translate id="useWallet" />
            </TextIcon>
          }
          onClick={() => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(
              new CustomEvent(OPEN_WALLET_SIGNUP_DIALOG, {
                detail: { initStep: 'init' },
              })
            )

            submitCallback?.()
          }}
        />
        <Form.List.Item
          title={
            <TextIcon
              color="black"
              icon={<IconEmail24 size="md" />}
              size="md"
              spacing="xtight"
            >
              <Translate id="useEmail" />
            </TextIcon>
          }
          onClick={() => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
          }}
        />
      </Form.List>
    </Form>
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

      <Dialog.Content hasGrow>
        {InnerForm}

        <Spacer size="xloose" />
      </Dialog.Content>
    </>
  )
}

export default Init
