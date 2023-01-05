/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArchiveArticleArticle
// ====================================================

export interface ArchiveArticleArticle_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface ArchiveArticleArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Author of this article.
   */
  author: ArchiveArticleArticle_author;
}
