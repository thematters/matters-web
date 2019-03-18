import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

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

const Invitation = () => {
  return null
}

Invitation.fragments = fragments

export default Invitation
