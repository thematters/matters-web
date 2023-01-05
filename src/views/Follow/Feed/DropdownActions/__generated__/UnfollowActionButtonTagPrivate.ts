/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UnfollowActionButtonTagPrivate
// ====================================================

export interface UnfollowActionButtonTagPrivate {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}
