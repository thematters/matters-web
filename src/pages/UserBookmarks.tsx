import UserBookmarks from '~/views/User/Bookmarks'

import { Protected } from '~/components'

export default () => (
  <Protected>
    <UserBookmarks />
  </Protected>
)
