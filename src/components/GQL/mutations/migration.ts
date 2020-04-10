import gql from 'graphql-tag';

export default gql`
  mutation Migration($input: MigrationInput!) {
    migration(input: $input)
  }
`;
