/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerTotalBlockCount
// ====================================================

export interface ViewerTotalBlockCount_viewer_blockList {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerTotalBlockCount_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Users that blocked by current user.
   */
  blockList: ViewerTotalBlockCount_viewer_blockList;
}

export interface ViewerTotalBlockCount {
  viewer: ViewerTotalBlockCount_viewer | null;
}
