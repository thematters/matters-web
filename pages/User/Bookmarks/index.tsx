import { Head } from '~/components/Head'
import { UserProfile } from '~/components/UserProfile'

import UserTabs from '../UserTabs'
import MeBookmarks from './MeBookmarks'

export default () => (
  <main>
    <Head title={{ zh_hant: '我的收藏', zh_hans: '我的收藏' }} />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <UserTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <MeBookmarks />
      </div>
    </section>
  </main>
)
