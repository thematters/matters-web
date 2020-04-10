import gql from 'graphql-tag';

export default gql`
  mutation BlockUser($id: ID!) {
    blockUser(input: { id: $id }) {
      id
      isBlocked
    }
  }
`;
