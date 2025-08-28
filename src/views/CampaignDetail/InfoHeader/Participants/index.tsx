import gql from 'graphql-tag'
import _shuffle from 'lodash/shuffle'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import { Avatar, Icon, TextIcon, ViewerContext } from '~/components'
import { InfoHeaderParticipantsCampaignFragment } from '~/gql/graphql'

import { ParticipantsDialog } from '../../Participants/Dialog'
import styles from './styles.module.css'

const fragments = gql`
  fragment InfoHeaderParticipantsCampaign on WritingChallenge {
    id
    application {
      state
      createdAt
    }
    participants(input: { first: 8 }) {
      totalCount
      edges {
        node {
          id
          ...AvatarUser
        }
      }
    }
  }
`

const Participants = ({
  campaign,
}: {
  campaign: InfoHeaderParticipantsCampaignFragment
}) => {
  const viewer = useContext(ViewerContext)
  const isViewerApplySucceeded = campaign.application?.state === 'succeeded'
  const edges = campaign.participants.edges?.slice(
    0,
    isViewerApplySucceeded ? 4 : 5
  )

  return (
    <ParticipantsDialog totalParticipants={campaign.participants.totalCount}>
      {({ openDialog }) => (
        <section
          className={styles.participants}
          role="button"
          onClick={openDialog}
        >
          <section className={styles.avatars}>
            {isViewerApplySucceeded && <Avatar user={viewer} size={24} />}
            {_shuffle(edges?.filter((u) => u.node.id !== viewer.id)).map(
              ({ node }, i) => (
                <Avatar key={i} user={node} size={24} />
              )
            )}
          </section>
          <section className={styles.countContainer}>
            <span className={styles.count}>
              {campaign.participants.totalCount}
              &nbsp;
            </span>
            <TextIcon
              icon={<Icon icon={IconRight} size={14} />}
              placement="left"
              size={14}
            >
              <FormattedMessage defaultMessage="Participants" id="zx0myy" />
            </TextIcon>
          </section>
        </section>
      )}
    </ParticipantsDialog>
  )
}

Participants.fragments = fragments

export default Participants
