import { Placeholder } from '~/components'
import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <h1>Wallet</h1>
        <Placeholder.ArticleDigestList />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Placeholder.Sidebar />
      </aside>
    </main>
  </Protected>
)
