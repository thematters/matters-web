import { Head, Layout } from '~/components'

import SettingsBlocked from './SettingsBlocked'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsBlock" />}
    />

    <Head title={{ id: 'settingsBlock' }} />

    <SettingsBlocked />
  </Layout.Main>
)
