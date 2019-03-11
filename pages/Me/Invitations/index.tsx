import { Empty } from '~/components/Empty'
import { Footer } from '~/components/Footer'
import { Translate } from '~/components/Language'
import { Protected } from '~/components/Protected'

import ICON_EMPTY_COMMENT from '~/static/images/illustration-empty-comment.svg?url'

export default () => (
  <Protected>
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Empty
          icon={<img src={ICON_EMPTY_COMMENT} />}
          description={<Translate zh_hant="即將上線" zh_hans="即将上线" />}
        />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  </Protected>
)
