import { Layout } from '~/components';

import SettingsTab from '../SettingsTab';
import SettingsBlocked from './SettingsBlocked';

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="blockedSetting" />}
    />

    <SettingsTab />

    <SettingsBlocked />
  </Layout.Main>
);
