/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UnreadFollowing
// ====================================================

export interface UnreadFollowing_viewer_status {
  __typename: "UserStatus";
  /**
   * Whether there are unread activities from following.
   */
  unreadFollowing: boolean;
}

export interface UnreadFollowing_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Status of current user.
   */
  status: UnreadFollowing_viewer_status | null;
}

export interface UnreadFollowing {
  viewer: UnreadFollowing_viewer | null;
}
