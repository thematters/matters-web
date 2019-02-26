import { Head, UserProfile } from '~/components'

import MeTabs from '../MeTabs'
import MeHistory from './MeHistory'

export default () => (
  <main>
    <Head title={{ zh_hant: '瀏覽記錄', zh_hans: '浏览记录' }} />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <MeTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <MeHistory />
      </div>
    </section>
  </main>
)
