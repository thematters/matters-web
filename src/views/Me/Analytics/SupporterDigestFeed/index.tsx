import { toPath } from '~/common/utils'
import { Card, IconDonate24, TextIcon, UserDigest } from '~/components'
import { MeAnalyticsQuery } from '~/gql/graphql'

import styles from './styles.module.css'

interface SupporterDigestFeedProps {
  user: NonNullable<
    NonNullable<MeAnalyticsQuery['viewer']>['analytics']['topDonators']['edges']
  >[0]['node']
  index: number
  donationCount: number
}

const SupporterDigestFeed = ({
  user,
  index,
  donationCount,
}: SupporterDigestFeedProps) => {
  const userName = user.userName!
  const path = toPath({
    page: 'userProfile',
    userName,
  })
  return (
    <Card {...path} spacing={[0, 0]} bgActiveColor="none">
      <section className={styles.container}>
        <span className={styles.number}>{index + 1}</span>
        <section className={styles.supporter}>
          <UserDigest.Mini
            user={user}
            hasAvatar
            avatarSize="md"
            hasDisplayName
            textSize="mdS"
            textWeight="md"
          />

          <section className={styles.count}>
            <TextIcon
              icon={<IconDonate24 size="xs" />}
              size="xs"
              color="greyDark"
            >
              {donationCount}
            </TextIcon>
          </section>
        </section>
      </section>
    </Card>
  )
}

export default SupporterDigestFeed
