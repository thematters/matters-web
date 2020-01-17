import { UserProfile } from '~/components'

import FollowerTabs from '../FollowerTabs'
import UserFollowees from './UserFollowees'

export default () => (
  <main>
    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <FollowerTabs />
        <UserFollowees />
      </div>
    </section>
  </main>
)
