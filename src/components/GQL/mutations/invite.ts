import gql from 'graphql-tag'

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
