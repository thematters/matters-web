import MeBookmarks from '~/views/Me/Bookmarks'

import { Protected } from '~/components'

const ProtectedMeBookMarks = () => (
  <Protected>
    <MeBookmarks />
  </Protected>
)

export default ProtectedMeBookMarks
