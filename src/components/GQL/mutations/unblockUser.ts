import gql from 'graphql-tag';

export default gql`
  mutation UnblockUser($id: ID!) {
    unblockUser(input: { id: $id }) {
      id
      isBlocked
    }
  }
`;
