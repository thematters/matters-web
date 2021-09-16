import { Card, IconBroadcast24 } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserProfileUserPublic_user_ownCircles } from '../__generated__/UserProfileUserPublic'

type CircleBroadcastProps = {
  circles: UserProfileUserPublic_user_ownCircles[]
}

const CircleBroadcast = ({ circles }: CircleBroadcastProps) => {
  const circle = circles[0]

  if (!circle) {
    return null
  }

  const edges = circle.broadcast?.edges || []
  if (!edges || edges.length === 0) {
    return null
  }

  const broadcast = edges[0].node
  const path = toPath({
    page: 'userBroadcast',
    userName: circle.owner.userName || '',
  })

  return (
    <section className="container">
      <Card
        bgColor="grey-lighter"
        borderRadius="base"
        spacing={['tight', 'base']}
        {...path}
      >
        <section className="broadcast">
          <section className="icon">
            <IconBroadcast24 size="md-s" />
          </section>
          <section
            className="content"
            dangerouslySetInnerHTML={{
              __html: broadcast.content || '',
            }}
          />
        </section>
      </Card>

      <style jsx>{styles}</style>
    </section>
  )
}

export default CircleBroadcast
