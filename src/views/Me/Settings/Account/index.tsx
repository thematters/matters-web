import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, TableView } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import Email from './Email'
import Language from './Language'
import MattersID from './MattersID'
import MyProfile from './MyProfile'
import Password from './Password'
import Socials from './Socials'
import Wallet from './Wallet'

const Settings = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Settings" id="D3idYv" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({ defaultMessage: 'Settings', id: 'D3idYv' })}
      />

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
              defaultMessage="Language preference"
              id="k7Oi38"
              description="src/views/Me/Settings/Settings/index.tsx"
            />
          }
        >
          <Language />
        </TableView>

        <TableView
          spacingX={0}
          groupName={
            <FormattedMessage
              defaultMessage="Wallet"
              id="HPVOw/"
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
              id="ohbnFU"
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
