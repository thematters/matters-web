import gql from 'graphql-tag'

export default gql`
  mutation InviteCircle(
    $circleId: ID!
    $freePeriod: freePeriod_Int_NotNull_exclusiveMin_0!
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
