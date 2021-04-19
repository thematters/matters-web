import { gql } from '@apollo/client'

export default gql`
  mutation InviteCircle(
    $circleId: ID!
    $freePeriod: PositiveInt!
    $invitees: [InviteCircleInvitee!]!
  ) {
    invite(
      input: {
        circleId: $circleId
        freePeriod: $freePeriod
        invitees: $invitees
      }
    ) {
      id
    }
  }
`
