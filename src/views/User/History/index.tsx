import { Head, UserProfile } from '~/components'

import { TEXT } from '~/common/enums'

import UserTabs from '../UserTabs'
import MeHistory from './MeHistory'

export default () => (
  <main>
    <Head
      title={{
        zh_hant: TEXT.zh_hant.readHistory,
        zh_hans: TEXT.zh_hans.readHistory
      }}
    />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <UserTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <MeHistory />
      </div>
    </section>
  </main>
)
