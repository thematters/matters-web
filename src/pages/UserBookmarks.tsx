import UserBookmarks from '~/views/User/Bookmarks'

import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <UserBookmarks />
  </Protected>
)
