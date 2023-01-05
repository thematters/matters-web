/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchFilter, ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchArticles
// ====================================================

export interface SearchArticles_search_edges_node_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchArticles_search_edges_node_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SearchArticles_search_edges_node_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SearchArticles_search_edges_node_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SearchArticles_search_edges_node_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SearchArticles_search_edges_node_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SearchArticles_search_edges_node_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SearchArticles_search_edges_node_Article_author_info_cryptoWallet | null;
}

export interface SearchArticles_search_edges_node_Article_author {
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
  status: SearchArticles_search_edges_node_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SearchArticles_search_edges_node_Article_author_liker;
  /**
   * User information.
   */
  info: SearchArticles_search_edges_node_Article_author_info;
}

export interface SearchArticles_search_edges_node_Article {
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
  author: SearchArticles_search_edges_node_Article_author;
}

export type SearchArticles_search_edges_node = SearchArticles_search_edges_node_User | SearchArticles_search_edges_node_Article;

export interface SearchArticles_search_edges {
  __typename: "SearchResultEdge";
  node: SearchArticles_search_edges_node;
}

export interface SearchArticles_search {
  __typename: "SearchResultConnection";
  edges: SearchArticles_search_edges[] | null;
}

export interface SearchArticles {
  search: SearchArticles_search;
}

export interface SearchArticlesVariables {
  search: string;
  filter?: SearchFilter | null;
}
