/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeFollow
// ====================================================

export interface MeFollow_viewer_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface MeFollow_viewer {
  __typename: "User";
  id: string;
  /**
   * Users that this user follows
   */
  followees: MeFollow_viewer_followees;
}

export interface MeFollow {
  viewer: MeFollow_viewer | null;
}
