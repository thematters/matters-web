import { Avatar, Tooltip } from '~/components'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

import styles from './styles.module.css'

const Participants = ({ campaign }: { campaign: typeof MOCK_CAMPAIGN }) => {
  if (campaign.participants.edges.length <= 0) {
    return null
  }

  return (
    <section className={styles.participants}>
      <h2>
        Writer{' '}
        <span className={styles.count}>{campaign.participants.totalCount}</span>
      </h2>

      <section className={styles.avatars}>
        {campaign.participants.edges.map(({ node }, i) => (
          <Tooltip key={i} content={node.displayName} placement="top">
            <Avatar user={node} size={32} />
          </Tooltip>
        ))}
      </section>
    </section>
  )
}

export default Participants
