import { Icon } from '~/components'

import ICON_SEARCH from '~/static/icons/search.svg?sprite'
import styles from './styles.css'

export default () => (
  <>
    <button type="button" aria-label="搜尋">
      <Icon
        id={ICON_SEARCH.id}
        viewBox={ICON_SEARCH.viewBox}
        className="u-motion-icon-hover"
      />
    </button>
    <style jsx>{styles}</style>
  </>
)
