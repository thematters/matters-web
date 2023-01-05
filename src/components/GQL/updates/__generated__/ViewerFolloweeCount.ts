/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerFolloweeCount
// ====================================================

export interface ViewerFolloweeCount_viewer_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerFolloweeCount_viewer_following {
  __typename: "Following";
  users: ViewerFolloweeCount_viewer_following_users;
}

export interface ViewerFolloweeCount_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Following contents of this user.
   */
  following: ViewerFolloweeCount_viewer_following;
}

export interface ViewerFolloweeCount {
  viewer: ViewerFolloweeCount_viewer | null;
}
