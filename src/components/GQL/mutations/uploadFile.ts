import gql from 'graphql-tag';

export default gql`
  mutation SingleFileUpload($input: SingleFileUploadInput!) {
    singleFileUpload(input: $input) {
      ... on Asset {
        id
        path
      }
    }
  }
`;
