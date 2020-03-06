import { Layout } from '~/components'

import SettingsTab from '../SettingsTab'
import SettingsAccount from './SettingsAccount'

export default () => (
  <Layout>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="accountSetting" />}
    />

    <SettingsTab />

    <Layout.Spacing>
      <SettingsAccount />
    </Layout.Spacing>
  </Layout>
)
