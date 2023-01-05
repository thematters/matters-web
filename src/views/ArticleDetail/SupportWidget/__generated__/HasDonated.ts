/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HasDonated
// ====================================================

export interface HasDonated_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface HasDonated_article_Article_donation {
  __typename: "UserConnection";
  totalCount: number;
}

export interface HasDonated_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Transactions history of this article.
   */
  donation: HasDonated_article_Article_donation;
  /**
   * creator message after support
   */
  replyToDonator: string | null;
}

export type HasDonated_article = HasDonated_article_User | HasDonated_article_Article;

export interface HasDonated {
  article: HasDonated_article | null;
}

export interface HasDonatedVariables {
  id: string;
  senderId: string;
}
