import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Avatar, ViewerContext } from '~/components'
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
    isViewerApplySucceeded ? 7 : 8
  )

  return (
    <ParticipantsDialog totalParticipants={campaign.participants.totalCount}>
      {({ openDialog }) => (
        <section
          className={styles.participants}
          role="button"
          onClick={openDialog}
        >
          <span className={styles.count}>
            {campaign.participants.totalCount}
            &nbsp;
          </span>
          <FormattedMessage
            defaultMessage="writers"
            id="syBMnY"
            description="src/views/CampaignDetail/InfoHeader/Participants/index.tsx"
          />
          <section className={styles.avatars}>
            {isViewerApplySucceeded && <Avatar user={viewer} size={20} />}
            {edges?.map(({ node }, i) => (
              <Avatar key={i} user={node} size={20} />
            ))}
          </section>
        </section>
      )}
    </ParticipantsDialog>
  )
}

Participants.fragments = fragments

export default Participants
