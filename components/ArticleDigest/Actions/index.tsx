import { DateTime, Icon, TextIcon } from '~/components'

import ICON_BOOKMARK_SM_INACTIVE from '~/static/icons/bookmark-small-inactive.svg?sprite'
import ICON_COMMENT_SM from '~/static/icons/comment-small.svg?sprite'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import styles from './styles.css'

export default () => (
  <div className="actions">
    {/* MAT */}
    <TextIcon
      icon={
        <Icon
          size="small"
          id={ICON_MAT_GOLD.id}
          viewBox={ICON_MAT_GOLD.viewBox}
        />
      }
      color="gold"
      weight="medium"
      text="123"
      size="sm"
      spacing="xxxtight"
    />
    {/* comments */}
    <TextIcon
      icon={
        <Icon
          size="small"
          id={ICON_COMMENT_SM.id}
          viewBox={ICON_COMMENT_SM.viewBox}
        />
      }
      color="grey"
      weight="medium"
      text="15"
      size="sm"
      spacing="xxtight"
    />
    {/* bookmark */}
    <button type="button" aria-label="收藏">
      <Icon
        size="small"
        className="u-motion-icon-hover"
        id={ICON_BOOKMARK_SM_INACTIVE.id}
        viewBox={ICON_BOOKMARK_SM_INACTIVE.viewBox}
      />
    </button>
    {/* date */}
    <DateTime date={new Date()} />
    <style jsx>{styles}</style>
  </div>
)
