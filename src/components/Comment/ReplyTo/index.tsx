import gql from 'graphql-tag'

import { Translate } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ReplyToUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export interface ReplyToProps {
  user: ReplyToUserFragment
}

const fragments = {
  user: gql`
    fragment ReplyToUser on User {
      id
      ...UserDigestMiniUser
    }

    ${UserDigest.Mini.fragments.user}
  `,
}
const ReplyTo = ({ user }: ReplyToProps) => (
  <section className={styles.container}>
    <span className={styles.replyTo}>
      <Translate id="reply" />
    </span>

    <UserDigest.Mini
      user={user}
      textSize="sm"
      textWeight="md"
      hasDisplayName
      hasUserName
    />
  </section>
)

ReplyTo.fragments = fragments

export default ReplyTo
