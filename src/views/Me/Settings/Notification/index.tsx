import { Layout } from '~/components'

import SettingsTab from '../SettingsTab'
import SettingsNotification from './SettingsNotification'

export default () => (
  <Layout>
    <SettingsTab />

    <Layout.Spacing>
      <SettingsNotification />
    </Layout.Spacing>
  </Layout>
)
