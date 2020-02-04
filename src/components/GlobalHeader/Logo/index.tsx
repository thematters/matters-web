import Link from 'next/link'

import { Icon } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

export default () => (
  <Link {...PATHS.HOME}>
    <a aria-label="首頁">
      <Icon.Logo />

      <style jsx>{styles}</style>
    </a>
  </Link>
)
