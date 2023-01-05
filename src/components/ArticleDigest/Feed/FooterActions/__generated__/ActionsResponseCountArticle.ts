/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ActionsResponseCountArticle
// ====================================================

export interface ActionsResponseCountArticle_author {
  __typename: "User";
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface ActionsResponseCountArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * The counting number of this article.
   */
  responseCount: number;
  /**
   * Author of this article.
   */
  author: ActionsResponseCountArticle_author;
}
