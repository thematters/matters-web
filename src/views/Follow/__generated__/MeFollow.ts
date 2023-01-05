/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeFollow
// ====================================================

export interface MeFollow_viewer_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface MeFollow_viewer_following {
  __typename: "Following";
  users: MeFollow_viewer_following_users;
}

export interface MeFollow_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Following contents of this user.
   */
  following: MeFollow_viewer_following;
}

export interface MeFollow {
  viewer: MeFollow_viewer | null;
}
