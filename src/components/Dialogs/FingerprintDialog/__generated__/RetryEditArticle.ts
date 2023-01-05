/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType, ArticleLicenseType, PublishState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RetryEditArticle
// ====================================================

export interface RetryEditArticle_editArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface RetryEditArticle_editArticle_drafts {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this draft.
   */
  mediaHash: string | null;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface RetryEditArticle_editArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * Access related fields on circle
   */
  access: RetryEditArticle_editArticle_access;
  /**
   * License Type
   */
  license: ArticleLicenseType;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Drafts linked to this article.
   */
  drafts: RetryEditArticle_editArticle_drafts[] | null;
}

export interface RetryEditArticle {
  /**
   * Edit an article.
   */
  editArticle: RetryEditArticle_editArticle;
}

export interface RetryEditArticleVariables {
  id: string;
  iscnPublish?: boolean | null;
}
