/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FolloweeCountViewer
// ====================================================

export interface FolloweeCountViewer_followees {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FolloweeCountViewer {
  __typename: "User";
  /**
   * Users that this user follows
   */
  followees: FolloweeCountViewer_followees;
}
