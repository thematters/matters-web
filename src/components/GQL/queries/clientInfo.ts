import gql from 'graphql-tag';

export default gql`
  query ClientInfo {
    clientInfo @client {
      id
      viewportSize {
        width
        height
      }
      isPhone
      isTablet
      isMobile
    }
  }
`;
