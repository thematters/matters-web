/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleFingerprintPublic
// ====================================================

export interface ArticleFingerprintPublic_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleFingerprintPublic_article_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ArticleFingerprintPublic_article_Article_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface ArticleFingerprintPublic_article_Article_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface ArticleFingerprintPublic_article_Article {
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
  author: ArticleFingerprintPublic_article_Article_author;
  /**
   * Access related fields on circle
   */
  access: ArticleFingerprintPublic_article_Article_access;
  /**
   * Drafts linked to this article.
   */
  drafts: ArticleFingerprintPublic_article_Article_drafts[] | null;
}

export type ArticleFingerprintPublic_article = ArticleFingerprintPublic_article_User | ArticleFingerprintPublic_article_Article;

export interface ArticleFingerprintPublic {
  article: ArticleFingerprintPublic_article | null;
}

export interface ArticleFingerprintPublicVariables {
  id: string;
}
