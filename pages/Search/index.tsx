import { Placeholder } from '~/components'

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <h1>Search</h1>
      <Placeholder.ArticleDigestList />
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Placeholder.Sidebar />
    </aside>
  </main>
)
