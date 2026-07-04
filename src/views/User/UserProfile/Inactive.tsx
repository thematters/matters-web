import { FormattedMessage } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { Avatar, Cover, Media } from '~/components'
import { UserState } from '~/gql/graphql'

import styles from './styles.module.css'

const Inactive: React.FC<{ state?: UserState | string }> = ({ state }) => {
  const isFrozen = state === UserState.Frozen

  return (
    <section className={styles.userProfile}>
      <Cover fallbackCover={IMAGE_COVER.src} />

      <Media lessThan="md">
        <header className={styles.header}>
          <section className={styles.avatar}>
            <Avatar size={76} />
          </section>
        </header>

        <section className={styles.info}>
          <section className={styles.displayName}>
            <h1 className={styles.name}>
              {isFrozen ? (
                <FormattedMessage defaultMessage="Frozen user" id="MeqJEO" />
              ) : (
                <FormattedMessage defaultMessage="Deleted user" id="9J0iCw" />
              )}
            </h1>
          </section>
        </section>
      </Media>
    </section>
  )
}

export default Inactive
