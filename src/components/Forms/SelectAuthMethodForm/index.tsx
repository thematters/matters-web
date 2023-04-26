import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'
import {
  Dialog,
  Form,
  IconEmail24,
  IconWallet24,
  LanguageSwitch,
  Layout,
  TextIcon,
} from '~/components'

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

  const containerClasses = classNames({ container: !!isInPage })

  const InnerForm = (
    <>
      <section className={containerClasses}>
        <Form.List
          groupName={
            isInPage ? (
              <FormattedMessage
                defaultMessage="Choose a method to enter"
                description="src/components/Forms/SelectAuthMethodForm/index.tsx"
              />
            ) : null
          }
          spacingX={isInPage ? 0 : 'base'}
        >
          <Form.List.Item
            title={
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
            }
            subtitle={
              <FormattedMessage
                defaultMessage="For unregistered or users enabled wallet login"
                description="src/components/Forms/SelectAuthMethodForm/index.tsx"
              />
            }
            onClick={gotoWalletAuth}
            role="button"
          />
          <Form.List.Item
            title={
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
            }
            subtitle={
              <FormattedMessage
                defaultMessage="User registered by email can login and enable wallet login later"
                description="src/components/Forms/SelectAuthMethodForm/index.tsx"
              />
            }
            onClick={gotoEmailLogin}
            role="button"
          />
        </Form.List>
      </section>
      <style jsx>{styles}</style>
    </>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header left={<Layout.Header.Title id="authEntries" />} />

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
        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}
