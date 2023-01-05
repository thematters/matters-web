/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType, ArticleState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FooterActionsArticlePublic
// ====================================================

export interface FooterActionsArticlePublic_author {
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

export interface FooterActionsArticlePublic_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface FooterActionsArticlePublic_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FooterActionsArticlePublic_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface FooterActionsArticlePublic_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface FooterActionsArticlePublic_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FooterActionsArticlePublic_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FooterActionsArticlePublic_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: FooterActionsArticlePublic_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: FooterActionsArticlePublic_tags_editors[] | null;
}

export interface FooterActionsArticlePublic_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FooterActionsArticlePublic {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Author of this article.
   */
  author: FooterActionsArticlePublic_author;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: FooterActionsArticlePublic_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: FooterActionsArticlePublic_donationsDialog;
  /**
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Access related fields on circle
   */
  access: FooterActionsArticlePublic_access;
  /**
   * Drafts linked to this article.
   */
  drafts: FooterActionsArticlePublic_drafts[] | null;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: FooterActionsArticlePublic_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: FooterActionsArticlePublic_transactionsReceivedBy;
}
