import Link from 'next/link'
import { useContext } from 'react'

import { Icon } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { PATHS } from '~/common/enums'
import ICON_SEARCH from '~/static/icons/search.svg?sprite'

import styles from './styles.css'

export default () => {
  const { headerState } = useContext(HeaderContext)
  const isDraft = headerState.type === 'draft'

  return (
    <>
      <Link {...PATHS.SEARCH}>
        <a aria-label="搜尋" hidden={isDraft}>
          <Icon id={ICON_SEARCH.id} viewBox={ICON_SEARCH.viewBox} />
        </a>
      </Link>
      <style jsx>{styles}</style>
    </>
  )
}
