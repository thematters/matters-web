import { Head, UserProfile } from '~/components'

import { TEXT } from '~/common/enums'

import UserTabs from '../UserTabs'
import MeDrafts from './MeDrafts'

export default () => (
  <main>
    <Head
      title={{
        zh_hant: TEXT.zh_hant.draft,
        zh_hans: TEXT.zh_hans.draft
      }}
    />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <UserTabs />
        <MeDrafts />
      </div>
    </section>
  </main>
)
