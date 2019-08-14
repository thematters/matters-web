import Link from 'next/link'

import { Icon } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_LOGO from '~/static/icons/logo.svg?sprite'
// import ICON_LOGO from '~/static/icons/logo-rainbow.png'

import styles from './styles.css'

export default () => (
  <>
    <Link {...PATHS.HOME}>
      <a aria-label="首頁">
        <Icon
          id={ICON_LOGO.id}
          style={{ width: 97, height: 20 }}
          viewBox={ICON_LOGO.viewBox}
        />
      </a>
    </Link>
    <span>(likecoin)</span>
    <style jsx>{styles}</style>
  </>
)
