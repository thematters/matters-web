import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, Spacer } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import GeneralSettings from './GeneralSettings'

const NotificationSettings = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'Settings - Notifications',
    description: 'src/views/Me/Settings/Notifications/index.tsx',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Settings"
              description="src/views/Me/Settings/Notifications/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <SettingsTabs />

      <section className={styles.container}>
        <GeneralSettings />
      </section>

      <Spacer size="xloose" />
    </Layout.Main>
  )
}

export default NotificationSettings
