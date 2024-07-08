import { useContext } from 'react'

import { Avatar, Tooltip, ViewerContext } from '~/components'
import {
  SideParticipantsCampaignPrivateFragment,
  SideParticipantsCampaignPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type SideParticipantsProps = {
  campaign: SideParticipantsCampaignPublicFragment &
    Partial<SideParticipantsCampaignPrivateFragment>
}

const SideParticipants = ({ campaign }: SideParticipantsProps) => {
  const viewer = useContext(ViewerContext)
  const edges = campaign.sideParticipants.edges
  const isViewerApplySucceeded = campaign.applicationState === 'succeeded'

  if (edges && edges.length <= 0) {
    return null
  }

  return (
    <section className={styles.participants}>
      <h2>
        Writer{' '}
        <span className={styles.count}>
          {campaign.sideParticipants.totalCount}
        </span>
      </h2>

      <section className={styles.avatars}>
        {isViewerApplySucceeded && <Avatar user={viewer} size={32} />}
        {edges?.map(({ node, cursor }) =>
          node.id !== viewer.id ? (
            <Tooltip
              key={cursor}
              content={node.displayName}
              placement="top"
              disabled={!node.displayName}
            >
              <Avatar user={node} size={32} />
            </Tooltip>
          ) : null
        )}
      </section>
    </section>
  )
}

SideParticipants.fragments = fragments

export default SideParticipants
