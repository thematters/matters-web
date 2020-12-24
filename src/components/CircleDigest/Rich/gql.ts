import gql from 'graphql-tag'

export const fragments = {
  circle: {
    public: gql`
      fragment CircleDigestRichCirclePublic on Circle {
        id
        circleName
        displayName
        description
      }
    `,
    private: gql`
      fragment CircleDigestRichCirclePrivate on Circle {
        id
      }
    `,
  },
}
