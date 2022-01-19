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

import styles from './styles.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  gotoWalletAuth: () => void
  gotoEmailLogin: () => void
  closeDialog?: () => void
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
  purpose,
  gotoWalletAuth,
  gotoEmailLogin,
  closeDialog,
}) => {
  const isInPage = purpose === 'page'

  const InnerForm = (
    <Form.List groupName={<Translate id="authMethod" />}>
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
        onClick={gotoWalletAuth}
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
        onClick={gotoEmailLogin}
      />
    </Form.List>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={<Layout.Header.Title id="authEntries" />}
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
        <Dialog.Header title="authEntries" closeDialog={closeDialog} />
      )}

      <Dialog.Content hasGrow>
        {InnerForm}

        <Spacer size="xloose" />
      </Dialog.Content>
    </>
  )
}
