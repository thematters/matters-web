import { toPath } from '~/common/utils'
import { Card, IconDonate24, TextIcon, UserDigest } from '~/components'
import { MeAnalyticsQuery } from '~/gql/graphql'

import styles from './styles.css'

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
      <section className="container">
        <span className="number">{index + 1}</span>
        <section className="supporter">
          <UserDigest.Mini
            user={user}
            hasAvatar
            avatarSize="md"
            hasDisplayName
            textSize="md-s"
            textWeight="md"
          />

          <section className="count">
            <TextIcon
              icon={<IconDonate24 size="xs" />}
              size="xs"
              color="grey-dark"
            >
              {donationCount}
            </TextIcon>
          </section>
        </section>
      </section>
      <style jsx>{styles}</style>
    </Card>
  )
}

export default SupporterDigestFeed
