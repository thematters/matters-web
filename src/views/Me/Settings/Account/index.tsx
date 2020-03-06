import { Layout } from '~/components'

import SettingsTab from '../SettingsTab'
import SettingsAccount from './SettingsAccount'

export default () => (
  <Layout>
    <SettingsTab />

    <Layout.Spacing>
      <SettingsAccount />
    </Layout.Spacing>
  </Layout>
)
