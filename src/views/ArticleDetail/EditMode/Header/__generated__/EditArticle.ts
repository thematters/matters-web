/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType, ArticleLicenseType, PublishState, ArticleState, UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditArticle
// ====================================================

export interface EditArticle_editArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface EditArticle_editArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface EditArticle_editArticle_drafts {
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
   * Draft title.
   */
  title: string | null;
  /**
   * Content of this draft.
   */
  content: string | null;
  /**
   * Summary of this draft.
   */
  summary: string | null;
  /**
   * This value determines if the summary is customized or not.
   */
  summaryCustomized: boolean;
}

export interface EditArticle_editArticle_collection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface EditArticle_editArticle_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface EditArticle_editArticle_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditArticle_editArticle_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditArticle_editArticle_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface EditArticle_editArticle_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: EditArticle_editArticle_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: EditArticle_editArticle_collection_edges_node_author_info_cryptoWallet | null;
}

export interface EditArticle_editArticle_collection_edges_node_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: EditArticle_editArticle_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: EditArticle_editArticle_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: EditArticle_editArticle_collection_edges_node_author_info;
}

export interface EditArticle_editArticle_collection_edges_node {
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
   * Article cover's link.
   */
  cover: string | null;
  /**
   * Author of this article.
   */
  author: EditArticle_editArticle_collection_edges_node_author;
}

export interface EditArticle_editArticle_collection_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: EditArticle_editArticle_collection_edges_node;
}

export interface EditArticle_editArticle_collection {
  __typename: "ArticleConnection";
  pageInfo: EditArticle_editArticle_collection_pageInfo;
  totalCount: number;
  edges: EditArticle_editArticle_collection_edges[] | null;
}

export interface EditArticle_editArticle {
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
   * Tags attached to this article.
   */
  tags: EditArticle_editArticle_tags[] | null;
  /**
   * Access related fields on circle
   */
  access: EditArticle_editArticle_access;
  /**
   * License Type
   */
  license: ArticleLicenseType;
  /**
   * creator message asking for support
   */
  requestForDonation: string | null;
  /**
   * creator message after support
   */
  replyToDonator: string | null;
  /**
   * Drafts linked to this article.
   */
  drafts: EditArticle_editArticle_drafts[] | null;
  /**
   * List of articles added into this article' collection.
   */
  collection: EditArticle_editArticle_collection;
}

export interface EditArticle {
  /**
   * Edit an article.
   */
  editArticle: EditArticle_editArticle;
}

export interface EditArticleVariables {
  id: string;
  content?: string | null;
  cover?: string | null;
  tags?: string[] | null;
  collection?: string[] | null;
  circle?: string | null;
  accessType?: ArticleAccessType | null;
  license?: ArticleLicenseType | null;
  iscnPublish?: boolean | null;
  after?: string | null;
  first?: any | null;
  requestForDonation?: any | null;
  replyToDonator?: any | null;
}
