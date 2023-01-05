/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UnreadNoticeCount
// ====================================================

export interface UnreadNoticeCount_viewer_status {
  __typename: "UserStatus";
  /**
   * Number of unread notices.
   */
  unreadNoticeCount: number;
}

export interface UnreadNoticeCount_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Status of current user.
   */
  status: UnreadNoticeCount_viewer_status | null;
}

export interface UnreadNoticeCount {
  viewer: UnreadNoticeCount_viewer | null;
}
