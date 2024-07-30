import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics, toPath } from '~/common/utils'
import { Avatar, LinkWrapper, Tooltip, ViewerContext } from '~/components'
import {
  AvatarUserFragment,
  SideParticipantsCampaignPrivateFragment,
  SideParticipantsCampaignPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type SideParticipantsProps = {
  campaign: SideParticipantsCampaignPublicFragment &
    Partial<SideParticipantsCampaignPrivateFragment>
}

const Participant = ({
  user,
  onClick,
}: {
  user: AvatarUserFragment & {
    userName?: string | null
    displayName?: string | null
  }
  onClick?: () => void
}) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  if (!user.displayName) {
    return (
      <LinkWrapper {...path} onClick={onClick}>
        <Avatar user={user} size={32} />
      </LinkWrapper>
    )
  }

  return (
    <Tooltip content={user.displayName} placement="top">
      <span>
        <LinkWrapper {...path}>
          <Avatar user={user} size={32} />
        </LinkWrapper>
      </span>
    </Tooltip>
  )
}

const SideParticipants = ({ campaign }: SideParticipantsProps) => {
  const viewer = useContext(ViewerContext)
  const edges = campaign.sideParticipants.edges
  const isViewerApplySucceeded = campaign.application?.state === 'succeeded'

  if (edges && edges.length <= 0) {
    return null
  }

  return (
    <section className={styles.participants}>
      <h2>
        <FormattedMessage
          defaultMessage="Writers"
          id="xl95XN"
          description="src/views/CampaignDetail/SideParticipants/index.tsx"
        />{' '}
        <span className={styles.count}>
          {campaign.sideParticipants.totalCount}
        </span>
      </h2>

      <section className={styles.avatars}>
        {isViewerApplySucceeded && <Participant user={viewer} />}

        {edges
          ?.filter((u) => u.node.id !== viewer.id)
          .map(({ node, cursor }, i) => (
            <Participant
              key={cursor}
              user={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'campaign_detail_participant',
                  contentType: 'user',
                  location: i,
                  id: node.id,
                })
              }
            />
          ))}
      </section>
    </section>
  )
}

SideParticipants.fragments = fragments

export default SideParticipants
