/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: EditorCollection
// ====================================================

export interface EditorCollection_collection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface EditorCollection_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface EditorCollection_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditorCollection_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditorCollection_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface EditorCollection_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: EditorCollection_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: EditorCollection_collection_edges_node_author_info_cryptoWallet | null;
}

export interface EditorCollection_collection_edges_node_author {
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
  status: EditorCollection_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: EditorCollection_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: EditorCollection_collection_edges_node_author_info;
}

export interface EditorCollection_collection_edges_node {
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
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: EditorCollection_collection_edges_node_author;
}

export interface EditorCollection_collection_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: EditorCollection_collection_edges_node;
}

export interface EditorCollection_collection {
  __typename: "ArticleConnection";
  pageInfo: EditorCollection_collection_pageInfo;
  totalCount: number;
  edges: EditorCollection_collection_edges[] | null;
}

export interface EditorCollection {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * List of articles added into this article' collection.
   */
  collection: EditorCollection_collection;
}
