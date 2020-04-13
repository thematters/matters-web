import { Layout } from '~/components'

import SettingsBlocked from './SettingsBlocked'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsBlock" />}
      marginBottom={0}
    />

    <SettingsBlocked />
  </Layout.Main>
)
