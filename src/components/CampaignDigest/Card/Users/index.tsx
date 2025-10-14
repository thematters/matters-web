import { FormattedMessage } from 'react-intl'

import { UserDigest } from '~/components/UserDigest'
import { CampaignDigestCardCampaignFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type UsersProps = {
  campaign: CampaignDigestCardCampaignFragment
}

const Users = ({ campaign }: UsersProps) => {
  const users = campaign.participants.edges || []
  const count = campaign.participants.totalCount

  return (
    <section className={styles.users}>
      {users.map(({ node: user }) => (
        <section className={styles.user} key={user.id}>
          <UserDigest.Mini
            user={user}
            avatarSize={20}
            spacing={6}
            hasAvatar
            disabled
            showLogbook={false}
          />
        </section>
      ))}
      <span className={styles.count}>
        {count}
        &nbsp;
        <FormattedMessage
          defaultMessage="Participants"
          id="Wq1mAB"
          description="src/components/CampaignDigest/Card/Users/index.tsx"
        />
      </span>
    </section>
  )
}

export default Users
