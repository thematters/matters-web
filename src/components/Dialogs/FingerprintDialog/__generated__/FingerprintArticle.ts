/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FingerprintArticle
// ====================================================

export interface FingerprintArticle_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FingerprintArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface FingerprintArticle_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface FingerprintArticle {
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
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Author of this article.
   */
  author: FingerprintArticle_author;
  /**
   * Access related fields on circle
   */
  access: FingerprintArticle_access;
  /**
   * Drafts linked to this article.
   */
  drafts: FingerprintArticle_drafts[] | null;
}
