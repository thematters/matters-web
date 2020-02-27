import { Head, UserProfile } from '~/components'

import UserTabs from '../UserTabs'
import MeBookmarks from './MeBookmarks'

export default () => (
  <main>
    <Head title={{ id: 'bookmark' }} />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <UserTabs />
        <MeBookmarks />
      </div>
    </section>
  </main>
)
