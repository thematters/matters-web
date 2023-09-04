import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Form, Head, Layout } from '~/components'

import SettingsTabs from '../SettingsTabs'
import Email from './Email'
import MattersID from './MattersID'
import MyProfile from './MyProfile'
import Password from './Password'
import Socials from './Socials'
import styles from './styles.module.css'
import Wallet from './Wallet'

const Settings = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'Settings - Account',
    description: 'src/views/Me/Settings/Settings/index.tsx',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Settings"
              description="src/views/Me/Settings/Settings/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <SettingsTabs />

      <section className={styles.container}>
        <Form.List spacingX={0}>
          <MattersID />
          <MyProfile />
          <Email />
          <Password />
        </Form.List>

        <Form.List
          spacingX={0}
          groupName={
            <FormattedMessage
              defaultMessage="Wallet"
              description="src/views/Me/Settings/Settings/index.tsx"
            />
          }
        >
          <Wallet />
        </Form.List>

        <Form.List
          spacingX={0}
          groupName={
            <FormattedMessage
              defaultMessage="Social Login"
              description="src/views/Me/Settings/Settings/index.tsx"
            />
          }
        >
          <Socials />
        </Form.List>
      </section>
    </Layout.Main>
  )
}

export default Settings
