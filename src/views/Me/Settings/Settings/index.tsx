import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Form, Head, Layout } from '~/components'

import Email from './Email'
import MattersID from './MattersID'
import MyProfile from './MyProfile'
import Password from './Password'
import SettingsTabs from './SettingsTabs'
import Socials from './Socials'
import styles from './styles.module.css'
import Wallet from './Wallet'

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="settings" />} />

      <Head title={{ id: 'settings' }} />

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
