import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, Spacer, TableView } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import BlockedUsers from './BlockedUsers'
import Currency from './Currency'
import LikerID from './LikerID'

const SettingsMisc = () => {
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
        title={intl.formatMessage({
          defaultMessage: 'Settings',
          id: 'D3idYv',
        })}
      />

      <SettingsTabs />

      <section className={styles.container}>
        <TableView spacingX={0}>
          <Currency />
          <BlockedUsers />
          <LikerID />
        </TableView>
      </section>

      <Spacer size="sp32" />
    </Layout.Main>
  )
}

export default SettingsMisc
