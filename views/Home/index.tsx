import Feed from './Feed'
import MattersToday from './MattersToday'
import Sidebar from './Sidebar'

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <MattersToday />
      <Feed />
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Sidebar />
    </aside>
  </main>
)
