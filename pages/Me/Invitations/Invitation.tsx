import gql from 'graphql-tag'

import { DateTime } from '~/components/DateTime'
import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import { Invitation as InvitationType } from './__generated__/Invitation'
import styles from './styles.css'

const fragments = {
  invitation: gql`
    fragment Invitation on Invitation {
      id
      user {
        ...UserDigestMiniUser
      }
      email
      accepted
      createdAt
    }
    ${UserDigest.Mini.fragments.user}
  `
}

const Invitation = ({ invitation }: { invitation: InvitationType }) => {
  return (
    <section className="invitation">
      {invitation.user ? (
        <UserDigest.Mini user={invitation.user} />
      ) : (
        <span>{invitation.email}</span>
      )}

      <div className="right">
        <DateTime date={invitation.createdAt} type="standard" />

        {invitation.accepted && (
          <span className="status accepted">
            <Translate zh_hant="資格已開啟" zh_hans="资格已开启" />
          </span>
        )}

        {!invitation.accepted && (
          <span className="status pending">
            <Translate zh_hant="邀請已發送" zh_hans="邀请已发送" />
          </span>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

Invitation.fragments = fragments

export default Invitation
