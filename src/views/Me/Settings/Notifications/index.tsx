import { FormattedMessage, useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Form, Head, Layout, Spacer } from '~/components'

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

        {/* Entry: circle notifications */}
        <Form.List
          groupName={
            <FormattedMessage
              defaultMessage="Circle"
              description="src/views/Me/Settings/Notifications/index.tsx"
            />
          }
          spacingX={0}
        >
          <Form.List.Item
            role="link"
            title={
              <FormattedMessage
                defaultMessage="Circle notifications"
                description="src/views/Me/Settings/Notifications/index.tsx"
              />
            }
            href={PATHS.ME_SETTINGS_NOTIFICATIONS_CIRCLE}
          />
        </Form.List>
      </section>

      <Spacer size="xloose" />
    </Layout.Main>
  )
}

export default NotificationSettings
