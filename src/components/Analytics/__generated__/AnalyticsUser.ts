/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AnalyticsUser
// ====================================================

export interface AnalyticsUser_info {
  __typename: "UserInfo";
  /**
   * User email.
   */
  email: any | null;
}

export interface AnalyticsUser {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * User information.
   */
  info: AnalyticsUser_info;
}
