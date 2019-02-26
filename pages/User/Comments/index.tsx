import { UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import UserComments from './UserComments'

export default () => (
  <main>
    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <UserTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <UserComments />
      </div>
    </section>
  </main>
)
