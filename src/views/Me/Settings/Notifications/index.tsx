import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, Spacer } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import GeneralSettings from './GeneralSettings'

const NotificationSettings = () => {
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
        <GeneralSettings />
      </section>

      <Spacer size="sp32" />
    </Layout.Main>
  )
}

export default NotificationSettings
