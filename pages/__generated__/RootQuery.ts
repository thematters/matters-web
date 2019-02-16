/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RootQuery
// ====================================================

export interface RootQuery_viewer_info {
  __typename: "UserInfo";
  email: any | null;
}

export interface RootQuery_viewer {
  __typename: "User";
  id: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
  info: RootQuery_viewer_info;
}

export interface RootQuery {
  viewer: RootQuery_viewer | null;
}
