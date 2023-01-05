/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ArchiveArticle
// ====================================================

export interface ArchiveArticle_editArticle {
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
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
}

export interface ArchiveArticle {
  /**
   * Edit an article.
   */
  editArticle: ArchiveArticle_editArticle;
}

export interface ArchiveArticleVariables {
  id: string;
}
