/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerFolloweeCount
// ====================================================

export interface ViewerFolloweeCount_viewer_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerFolloweeCount_viewer {
  __typename: "User";
  id: string;
  /**
   * Users that this user follows
   */
  followees: ViewerFolloweeCount_viewer_followees;
}

export interface ViewerFolloweeCount {
  viewer: ViewerFolloweeCount_viewer | null;
}
