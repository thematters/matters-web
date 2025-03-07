import { Protected } from '~/components'
import MeBookmarksArticles from '~/views/Me/Bookmarks/BookmarksArticles'

const ProtectedMeBookmarksArticles = () => (
  <Protected>
    <MeBookmarksArticles />
  </Protected>
)

export default ProtectedMeBookmarksArticles
