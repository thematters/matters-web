import gql from 'graphql-tag'

import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

import { ReplyToUser } from './__generated__/ReplyToUser'

export interface ReplyToProps {
  user: ReplyToUser
}

const fragments = {
  user: gql`
    fragment ReplyToUser on User {
      id
      ...UserDigestMiniUser
    }

    ${UserDigest.Mini.fragments.user}
  `
}
const ReplyTo = ({ user }: ReplyToProps) => (
  <section className="container">
    <span className="reply-to">
      <Translate zh_hant={TEXT.zh_hant.reply} zh_hans={TEXT.zh_hans.reply} />
    </span>

    <UserDigest.Mini
      user={user}
      textSize="sm-s"
      textWeight="md"
      hasDisplayName
      hasUserName
    />

    <style jsx>{styles}</style>
  </section>
)

ReplyTo.fragments = fragments

export default ReplyTo
