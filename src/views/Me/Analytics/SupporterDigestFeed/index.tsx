import { toPath } from '~/common/utils'
import { Card, IconDonate24, TextIcon, UserDigest } from '~/components'

import styles from './styles.css'

interface SupporterDigestFeedProps {
  user: MeAnalytics_viewer_analytics_topDonators_edges_node
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
    <Card {...path} spacing={[0, 0]}>
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
            <TextIcon icon={<IconDonate24 />} size="xs" color="grey-dark">
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
