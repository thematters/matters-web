/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: MetaInfoArticle
// ====================================================

export interface MetaInfoArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface MetaInfoArticle_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface MetaInfoArticle_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface MetaInfoArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Access related fields on circle
   */
  access: MetaInfoArticle_access;
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
  author: MetaInfoArticle_author;
  /**
   * Drafts linked to this article.
   */
  drafts: MetaInfoArticle_drafts[] | null;
}
