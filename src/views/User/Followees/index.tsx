import { Layout, UserProfile } from '~/components';

import FollowerTabs from '../FollowerTabs';
import UserFollowees from './UserFollowees';

export default () => (
  <Layout.Main>
    <UserProfile />
    <FollowerTabs />
    <UserFollowees />
  </Layout.Main>
);
