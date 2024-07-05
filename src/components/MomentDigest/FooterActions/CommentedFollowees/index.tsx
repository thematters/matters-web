import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { UserDigest } from '~/components'
import { MomentDigestFooterActionsCommentedFolloweesMomentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface CommentedFolloweesProps {
  moment: Partial<MomentDigestFooterActionsCommentedFolloweesMomentFragment>
}

const fragments = {
  moment: gql`
    fragment MomentDigestFooterActionsCommentedFolloweesMoment on Moment {
      id
      commentedFollowees {
        id
        ...UserDigestMiniUser
      }
    }
    ${UserDigest.Mini.fragments.user}
  `,
}

const CommentedFollowees = ({ moment }: CommentedFolloweesProps) => {
  const { commentedFollowees } = moment

  if (!commentedFollowees || commentedFollowees.length <= 0) {
    return null
  }

  return (
    <section className={styles.container}>
      <section className={styles.followees}>
        {commentedFollowees.slice(0, 3).map((user) => (
          <section className={styles.user} key={user.id}>
            <UserDigest.Mini user={user} avatarSize={20} hasAvatar />
          </section>
        ))}
      </section>

      <span className={styles.text}>
        <FormattedMessage
          defaultMessage="commented"
          id="PhzTJa"
          description="src/components/MomentDigest/FooterActions/CommentedFollowees/index.tsx"
        />
      </span>
    </section>
  )
}

CommentedFollowees.fragments = fragments

export default CommentedFollowees
