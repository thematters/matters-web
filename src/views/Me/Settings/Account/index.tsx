import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Head, Layout, TableView } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import Email from './Email'
import MattersID from './MattersID'
import MyProfile from './MyProfile'
import Password from './Password'
import Socials from './Socials'
import Wallet from './Wallet'

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="settings" />} />

      <Head title={{ id: 'settings' }} />

      <SettingsTabs />

      <section className={styles.container}>
        <TableView spacingX={0}>
          <MattersID />
          <MyProfile />
          <Email />
          <Password />
        </TableView>

        <TableView
          spacingX={0}
          groupName={
            <FormattedMessage
              defaultMessage="Wallet"
              description="src/views/Me/Settings/Settings/index.tsx"
            />
          }
        >
          <Wallet />
        </TableView>

        <TableView
          spacingX={0}
          groupName={
            <FormattedMessage
              defaultMessage="Social Login"
              description="src/views/Me/Settings/Settings/index.tsx"
            />
          }
        >
          <Socials />
        </TableView>
      </section>
    </Layout.Main>
  )
}

export default Settings
