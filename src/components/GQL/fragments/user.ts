import gql from 'graphql-tag';

export default {
  block: gql`
    fragment BlockUser on User {
      id
      userName
      displayName
      isBlocked
    }
  `,
};
