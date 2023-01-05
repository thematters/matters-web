/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleCollection
// ====================================================

export interface ArticleCollection_collection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ArticleCollection_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleCollection_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleCollection_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleCollection_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleCollection_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleCollection_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleCollection_collection_edges_node_author_info_cryptoWallet | null;
}

export interface ArticleCollection_collection_edges_node_author {
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
  status: ArticleCollection_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleCollection_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: ArticleCollection_collection_edges_node_author_info;
}

export interface ArticleCollection_collection_edges_node {
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
  author: ArticleCollection_collection_edges_node_author;
}

export interface ArticleCollection_collection_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: ArticleCollection_collection_edges_node;
}

export interface ArticleCollection_collection {
  __typename: "ArticleConnection";
  pageInfo: ArticleCollection_collection_pageInfo;
  totalCount: number;
  edges: ArticleCollection_collection_edges[] | null;
}

export interface ArticleCollection {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * List of articles added into this article' collection.
   */
  collection: ArticleCollection_collection;
}
