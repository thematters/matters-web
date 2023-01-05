/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ActionsDonationCountArticle
// ====================================================

export interface ActionsDonationCountArticle_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ActionsDonationCountArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: ActionsDonationCountArticle_transactionsReceivedBy;
}
