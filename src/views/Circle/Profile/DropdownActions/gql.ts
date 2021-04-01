import gql from 'graphql-tag'

export const fragments = {
  circle: {
    public: gql`
      fragment DropdownActionsCirclePublic on Circle {
        id
        name
        owner {
          id
        }
      }
    `,
    private: gql`
      fragment DropdownActionsCirclePrivate on Circle {
        id
        isMember
      }
    `,
  },
}
