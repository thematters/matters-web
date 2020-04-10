import { Layout, UserProfile } from '~/components';

import UserArticles from './UserArticles';

export default () => (
  <Layout.Main>
    <UserProfile />
    <UserArticles />
  </Layout.Main>
);
