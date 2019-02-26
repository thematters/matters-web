import { Head, UserProfile } from '~/components'

import MeTabs from '../MeTabs'
import MeComments from './MeComments'

export default () => (
  <main>
    <Head title={{ zh_hant: '我的評論', zh_hans: '我的评论' }} />

    <UserProfile type="me" />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <MeTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <MeComments />
      </div>
    </section>
  </main>
)
