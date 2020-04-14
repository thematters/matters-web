import { Layout } from '~/components'

import { PATHS } from '~/common/enums'

import SettingsBlocked from './SettingsBlocked'

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton {...PATHS.ME_SETTINGS} />}
      right={<Layout.Header.Title id="settingsBlock" />}
    />

    <SettingsBlocked />
  </Layout.Main>
)
