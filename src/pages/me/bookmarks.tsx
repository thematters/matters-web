import { Protected } from '~/components'
import MeBookmarks from '~/views/Me/Bookmarks'

const ProtectedMeBookMarks = () => (
  <Protected>
    <MeBookmarks />
  </Protected>
)

export default ProtectedMeBookMarks
