/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CollectionList
// ====================================================

export interface CollectionList_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface CollectionList_article_Article_collection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CollectionList_article_Article_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CollectionList_article_Article_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CollectionList_article_Article_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CollectionList_article_Article_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CollectionList_article_Article_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CollectionList_article_Article_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CollectionList_article_Article_collection_edges_node_author_info_cryptoWallet | null;
}

export interface CollectionList_article_Article_collection_edges_node_author {
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
  status: CollectionList_article_Article_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CollectionList_article_Article_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: CollectionList_article_Article_collection_edges_node_author_info;
}

export interface CollectionList_article_Article_collection_edges_node {
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
  author: CollectionList_article_Article_collection_edges_node_author;
}

export interface CollectionList_article_Article_collection_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: CollectionList_article_Article_collection_edges_node;
}

export interface CollectionList_article_Article_collection {
  __typename: "ArticleConnection";
  pageInfo: CollectionList_article_Article_collection_pageInfo;
  totalCount: number;
  edges: CollectionList_article_Article_collection_edges[] | null;
}

export interface CollectionList_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * List of articles added into this article' collection.
   */
  collection: CollectionList_article_Article_collection;
}

export type CollectionList_article = CollectionList_article_User | CollectionList_article_Article;

export interface CollectionList {
  article: CollectionList_article | null;
}

export interface CollectionListVariables {
  id: string;
  after?: string | null;
  first?: any | null;
}
