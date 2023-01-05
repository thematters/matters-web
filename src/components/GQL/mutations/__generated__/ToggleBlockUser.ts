/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleBlockUser
// ====================================================

export interface ToggleBlockUser_toggleBlockUser {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface ToggleBlockUser {
  /**
   * Block or Unblock a given user.
   */
  toggleBlockUser: ToggleBlockUser_toggleBlockUser;
}

export interface ToggleBlockUserVariables {
  id: string;
  enabled?: boolean | null;
}
