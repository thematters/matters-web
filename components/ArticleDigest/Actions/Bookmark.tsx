import gql from 'graphql-tag'
import { DateTime, Icon, TextIcon } from '~/components'

import ICON_BOOKMARK_SM_INACTIVE from '~/static/icons/bookmark-small-inactive.svg?sprite'

const Bookmark = () => (
  <button type="button" aria-label="收藏">
    <Icon
      size="small"
      className="u-motion-icon-hover"
      id={ICON_BOOKMARK_SM_INACTIVE.id}
      viewBox={ICON_BOOKMARK_SM_INACTIVE.viewBox}
    />
  </button>
)

// Bookmark.fragments = {
//   article: gql``
// }

export default Bookmark
