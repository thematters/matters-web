import { FormattedMessage } from 'react-intl'

import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'
import {
  Dialog,
  IconEmail24,
  IconWallet24,
  LanguageSwitch,
  Layout,
  TextIcon,
} from '~/components'

import SourceHeader from './SourceHeader'
import styles from './styles.module.css'

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
    <ul className={styles.select}>
      <li className={styles.option} role="button" onClick={gotoWalletAuth}>
        <header className={styles.header}>
          <TextIcon
            color="black"
            icon={<IconWallet24 size="md" />}
            size="md"
            spacing="xtight"
          >
            <FormattedMessage
              defaultMessage="Continue with Wallet"
              description="src/components/Forms/SelectAuthMethodForm/index.tsx"
            />
          </TextIcon>
        </header>
        <p className={styles.subtitle}>
          <FormattedMessage
            defaultMessage="For unregistered or users enabled wallet login"
            description="src/components/Forms/SelectAuthMethodForm/index.tsx"
          />
        </p>
      </li>

      <li className={styles.option} role="button" onClick={gotoEmailLogin}>
        <header className={styles.header}>
          <TextIcon
            color="black"
            icon={<IconEmail24 size="md" />}
            size="md"
            spacing="xtight"
          >
            <FormattedMessage
              defaultMessage="Continue with Email"
              description="src/components/Forms/SelectAuthMethodForm/index.tsx"
            />
          </TextIcon>
        </header>
        <p className={styles.subtitle}>
          <FormattedMessage
            defaultMessage="User registered by email can login and enable wallet login later"
            description="src/components/Forms/SelectAuthMethodForm/index.tsx"
          />
        </p>
      </li>
    </ul>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header left={<Layout.Header.Title id="authEntries" />} />

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>

        <footer className={styles.footer}>
          <LanguageSwitch />
        </footer>
      </>
    )
  }

  return (
    <>
      <Dialog.Header title="authEntries" closeDialog={closeDialog} />

      <Dialog.Content>
        <SourceHeader source={source} />

        {InnerForm}
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            color="greyDarker"
            text="close"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}
