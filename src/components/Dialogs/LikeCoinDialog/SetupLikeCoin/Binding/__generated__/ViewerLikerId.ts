/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerLikerId
// ====================================================

export interface ViewerLikerId_viewer_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
}

export interface ViewerLikerId_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: ViewerLikerId_viewer_liker;
}

export interface ViewerLikerId {
  viewer: ViewerLikerId_viewer | null;
}
