/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserIdUser
// ====================================================

export interface UserIdUser_user {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string | null;
}

export interface UserIdUser {
  user: UserIdUser_user | null;
}

export interface UserIdUserVariables {
  userName: string;
}
