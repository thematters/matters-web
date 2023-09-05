import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, Spacer, TableView } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import Email from './Email'
import MattersID from './MattersID'
import MyProfile from './MyProfile'
import Password from './Password'
import Socials from './Socials'
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

      <Spacer size="xloose" />
    </Layout.Main>
  )
}

export default Settings
