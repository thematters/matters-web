import { Protected } from '~/components'
import MeBookmarksTags from '~/views/Me/Bookmarks/BookmarksTags'

const ProtectedMeBookmarksTags = () => (
  <Protected>
    <MeBookmarksTags />
  </Protected>
)

export default ProtectedMeBookmarksTags
