/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowerCount
// ====================================================

export interface UserFollowerCount_user_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserFollowerCount_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Followers of this user.
   */
  followers: UserFollowerCount_user_followers;
}

export interface UserFollowerCount {
  user: UserFollowerCount_user | null;
}

export interface UserFollowerCountVariables {
  userName: string;
}
