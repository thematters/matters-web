import { Head, Layout } from '~/components'

import BaseSettingsBlocked from './SettingsBlocked'

const SettingsBlocked = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsBlock" />}
    />

    <Head title={{ id: 'settingsBlock' }} />

    <BaseSettingsBlocked />
  </Layout.Main>
)

export default SettingsBlocked
