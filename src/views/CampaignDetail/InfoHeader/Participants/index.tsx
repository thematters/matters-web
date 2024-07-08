import gql from 'graphql-tag'

import { Avatar } from '~/components'
import { InfoHeaderParticipantsCampaignFragment } from '~/gql/graphql'

import { ParticipantsDialog } from './Dialog'
import styles from './styles.module.css'

const fragments = gql`
  fragment InfoHeaderParticipantsCampaign on WritingChallenge {
    id
    participants(input: { first: 15 }) {
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
  return (
    <ParticipantsDialog campaign={campaign}>
      {({ openDialog }) => (
        <section
          className={styles.participants}
          role="button"
          onClick={openDialog}
        >
          <span className={styles.count}>
            {' '}
            {campaign.participants.totalCount}
          </span>{' '}
          位寫作者
          <section className={styles.avatars}>
            {campaign.participants.edges?.map(({ node }, i) => (
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
