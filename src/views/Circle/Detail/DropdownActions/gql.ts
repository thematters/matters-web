import gql from 'graphql-tag'

export const fragments = {
  circle: gql`
    fragment DropdownActionsCircle on Circle {
      id
      owner {
        id
      }
    }
  `,
}
