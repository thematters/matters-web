/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DonatorLabelComment
// ====================================================

export interface DonatorLabelComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * This value determines this comment is from article donator or not.
   */
  fromDonator: boolean;
}
