import { UserProfile } from '~/components/UserProfile'

import FollowerTabs from '../FollowerTabs'
import UserFollowers from './UserFollowers'

export default () => (
  <main>
    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <FollowerTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <UserFollowers />
      </div>
    </section>
  </main>
)
