import { Placeholder } from '~/components'

const ArticleDetail = () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <h1>ArticleDetail</h1>
        <Placeholder.ArticleDetail />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Placeholder.Sidebar />
      </aside>
    </main>
  )
}

export default ArticleDetail
