/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserIdUser
// ====================================================

export interface UserIdUser_user_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
}

export interface UserIdUser_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserIdUser_user_subscribedCircles {
  __typename: "CircleConnection";
  totalCount: number;
}

export interface UserIdUser_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * User information.
   */
  info: UserIdUser_user_info;
  /**
   * Status of current user.
   */
  status: UserIdUser_user_status | null;
  /**
   * Circles whiches user has subscribed.
   */
  subscribedCircles: UserIdUser_user_subscribedCircles;
}

export interface UserIdUser {
  user: UserIdUser_user | null;
}

export interface UserIdUserVariables {
  userName: string;
}
