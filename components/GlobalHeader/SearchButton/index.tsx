import Link from 'next/link'

import { Icon } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'

import styles from './styles.css'

export default () => (
  <>
    <Link href={PATHS.SEARCH.href} as={PATHS.SEARCH.as}>
      <a aria-label="搜尋">
        <Icon id={ICON_SEARCH.id} viewBox={ICON_SEARCH.viewBox} />
      </a>
    </Link>
    <style jsx>{styles}</style>
  </>
)
