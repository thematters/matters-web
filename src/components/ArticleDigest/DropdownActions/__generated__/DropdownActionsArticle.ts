/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DropdownActionsArticle
// ====================================================

export interface DropdownActionsArticle_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface DropdownActionsArticle_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface DropdownActionsArticle_author {
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

export interface DropdownActionsArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface DropdownActionsArticle_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface DropdownActionsArticle_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DropdownActionsArticle_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DropdownActionsArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: DropdownActionsArticle_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: DropdownActionsArticle_tags_editors[] | null;
}

export interface DropdownActionsArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: DropdownActionsArticle_appreciationsReceived;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Transactions history of this article.
   */
  donationsDialog: DropdownActionsArticle_donationsDialog;
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
  author: DropdownActionsArticle_author;
  /**
   * Access related fields on circle
   */
  access: DropdownActionsArticle_access;
  /**
   * Drafts linked to this article.
   */
  drafts: DropdownActionsArticle_drafts[] | null;
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
  tags: DropdownActionsArticle_tags[] | null;
  /**
   * Slugified article title.
   */
  slug: string;
}
