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

import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'

import SourceHeader from './SourceHeader'
import styles from './styles.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  source: UNIVERSAL_AUTH_SOURCE
  gotoWalletAuth: () => void
  gotoEmailLogin: () => void
  closeDialog?: () => void
}

export const SelectAuthMethodForm: React.FC<FormProps> = ({
  purpose,
  source,
  gotoWalletAuth,
  gotoEmailLogin,
  closeDialog,
}) => {
  const isInPage = purpose === 'page'

  const InnerForm = (
    <Form.List groupName={isInPage ? <Translate id="authMethod" /> : null}>
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
        subtitle={
          <Translate
            zh_hans="欢迎未注册或已启用钱包登入的朋友使用"
            zh_hant="歡迎未註冊或已啟用錢包登入的朋友使用"
            en="For unregistered or users enabled wallet login"
          />
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
        subtitle={
          <Translate
            zh_hans="持续支持邮箱進入，未來可随时启用钱包登入"
            zh_hant="持續提供信箱進入，未來可隨時啟用錢包登入"
            en="User registered by email can login and enable wallet login later"
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
        <SourceHeader source={source} />

        {InnerForm}

        <Spacer size="xloose" />
      </Dialog.Content>
    </>
  )
}
