import Link from 'next/link'

import { Avatar, Icon, TextIcon } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import styles from './styles.css'

export default () => (
  <Link href={PATHS.ME_ARTICLES.fs} as={PATHS.ME_ARTICLES.url}>
    <a className="container">
      <Avatar size="small" />
      <section className="info u-text-truncate">
        <span className="username">Matty</span>
        <TextIcon
          icon={
            <Icon
              size="xsmall"
              id={ICON_MAT_GOLD.id}
              viewBox={ICON_MAT_GOLD.viewBox}
            />
          }
          color="gold"
          weight="semibold"
          text="500"
          size="xs"
          spacing="0"
        />
      </section>
      <style jsx>{styles}</style>
    </a>
  </Link>
)
