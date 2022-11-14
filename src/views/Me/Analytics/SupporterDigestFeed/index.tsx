import { Avatar, Card, IconDonate24, LinkWrapper, TextIcon } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { MeAnalytics_viewer_analytics_topDonators_edges_node } from '../__generated__/MeAnalytics'
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
          <LinkWrapper {...path} textActiveColor="green">
            <section className="content">
              {' '}
              <Avatar src={user.avatar} size={'md'} />
              <h4 className="username">{user.displayName}</h4>
            </section>{' '}
          </LinkWrapper>
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
