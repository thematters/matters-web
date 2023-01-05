/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DonatorDialogArticle
// ====================================================

export interface DonatorDialogArticle_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface DonatorDialogArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Transactions history of this article.
   */
  donationsDialog: DonatorDialogArticle_donationsDialog;
}
