import { Layout } from '~/components'

import { PATHS } from '~/common/enums'

import SettingsNotification from './SettingsNotification'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton {...PATHS.ME_SETTINGS} />}
      right={<Layout.Header.Title id="settingsNotification" />}
    />

    <SettingsNotification />
  </Layout.Main>
)
