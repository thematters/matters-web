/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ExtendButtonArticle
// ====================================================

export interface ExtendButtonArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}
