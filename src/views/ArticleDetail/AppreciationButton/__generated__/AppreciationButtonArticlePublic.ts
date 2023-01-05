/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AppreciationButtonArticlePublic
// ====================================================

export interface AppreciationButtonArticlePublic_author_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
}

export interface AppreciationButtonArticlePublic_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: AppreciationButtonArticlePublic_author_liker;
}

export interface AppreciationButtonArticlePublic {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: AppreciationButtonArticlePublic_author;
  /**
   * Total number of appreciations recieved of this article.
   */
  appreciationsReceivedTotal: number;
  /**
   * Limit the nuhmber of appreciate per user.
   */
  appreciateLimit: number;
}
