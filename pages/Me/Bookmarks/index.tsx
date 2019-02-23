import { Head, UserProfile } from '~/components'
import MeTabs from '../MeTabs'

export default () => (
  <main>
    <Head title={{ zh_hant: '我的收藏', zh_hans: '我的收藏' }} />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <MeTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <img src="https://via.placeholder.com/600.png" />
      </div>
    </section>
  </main>
)
