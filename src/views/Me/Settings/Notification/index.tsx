import { Layout } from '~/components'

import SettingsTab from '../SettingsTab'
import SettingsNotification from './SettingsNotification'

export default () => (
  <Layout>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="notificationSetting" />}
    />

    <SettingsTab />

    <Layout.Spacing>
      <SettingsNotification />
    </Layout.Spacing>
  </Layout>
)
