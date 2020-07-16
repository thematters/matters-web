// Type definitions for apollo-upload-client 8.1
// Project: https://github.com/jaydenseric/apollo-upload-client#readme
// Definitions by: Edward Sammut Alessi <https://github.com/Slessi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

declare module 'apollo-upload-client' {
  import { ApolloLink, HttpOptions } from '@apollo/client'

  /**
   * `createUploadLink` options match `createHttpLink` options
   * @param linkOptions `HttpOptions`
   */
  export function createUploadLink(linkOptions?: HttpOptions): ApolloLink
}
