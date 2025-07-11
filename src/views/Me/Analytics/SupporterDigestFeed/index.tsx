import IconCoin from '@/public/static/icons/24px/coin.svg'
import { toPath } from '~/common/utils'
import { Card, Icon, TextIcon, UserDigest } from '~/components'
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
            avatarSize={24}
            hasDisplayName
            textSize={15}
            textWeight="medium"
          />

          <section className={styles.count}>
            <TextIcon
              icon={<Icon icon={IconCoin} />}
              size={14}
              spacing={4}
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
