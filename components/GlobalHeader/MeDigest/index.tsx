import gql from 'graphql-tag'
import Link from 'next/link'

import { PATHS } from '~/common/enums'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import { Avatar } from '../../Avatar'
import { Icon } from '../../Icon'
import { TextIcon } from '../../TextIcon'
import styles from './styles.css'

const MeDigest = ({ user }: { user: any }) => (
  <Link href={PATHS.ME_ARTICLES.fs} as={PATHS.ME_ARTICLES.url}>
    <a className="container">
      <Avatar size="small" user={user} />
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

MeDigest.fragments = {
  user: gql`
    fragment MeDigestUser on User {
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

export default MeDigest
