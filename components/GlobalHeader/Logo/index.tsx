import Link from 'next/link'

import { Icon } from '~/components/Icon'

import { PATHS } from '~/common/enums'
import ICON_LOGO from '~/static/icons/logo.svg?sprite'

import styles from './styles.css'

export default () => (
  <>
    <Link href={PATHS.HOME.href} as={PATHS.HOME.as}>
      <a aria-label="首頁">
        <Icon
          id={ICON_LOGO.id}
          style={{ width: 97, height: 20 }}
          viewBox={ICON_LOGO.viewBox}
        />
      </a>
    </Link>
    <style jsx>{styles}</style>
  </>
)
