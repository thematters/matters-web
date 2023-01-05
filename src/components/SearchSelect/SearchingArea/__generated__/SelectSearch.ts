/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchTypes, SearchFilter, SearchExclude, UserState, BadgeType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SelectSearch
// ====================================================

export interface SelectSearch_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SelectSearch_search_edges_node_Comment {
  __typename: "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface SelectSearch_search_edges_node_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SelectSearch_search_edges_node_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SelectSearch_search_edges_node_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SelectSearch_search_edges_node_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SelectSearch_search_edges_node_User_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SelectSearch_search_edges_node_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SelectSearch_search_edges_node_User_info_cryptoWallet | null;
}

export interface SelectSearch_search_edges_node_User {
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
  status: SelectSearch_search_edges_node_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SelectSearch_search_edges_node_User_liker;
  /**
   * User information.
   */
  info: SelectSearch_search_edges_node_User_info;
}

export interface SelectSearch_search_edges_node_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SelectSearch_search_edges_node_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SelectSearch_search_edges_node_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SelectSearch_search_edges_node_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SelectSearch_search_edges_node_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SelectSearch_search_edges_node_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SelectSearch_search_edges_node_Article_author_info_cryptoWallet | null;
}

export interface SelectSearch_search_edges_node_Article_author {
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
  status: SelectSearch_search_edges_node_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SelectSearch_search_edges_node_Article_author_liker;
  /**
   * User information.
   */
  info: SelectSearch_search_edges_node_Article_author_info;
}

export interface SelectSearch_search_edges_node_Article {
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
  author: SelectSearch_search_edges_node_Article_author;
}

export interface SelectSearch_search_edges_node_Tag {
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

export type SelectSearch_search_edges_node = SelectSearch_search_edges_node_Comment | SelectSearch_search_edges_node_User | SelectSearch_search_edges_node_Article | SelectSearch_search_edges_node_Tag;

export interface SelectSearch_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SelectSearch_search_edges_node;
}

export interface SelectSearch_search {
  __typename: "SearchResultConnection";
  pageInfo: SelectSearch_search_pageInfo;
  edges: SelectSearch_search_edges[] | null;
}

export interface SelectSearch {
  search: SelectSearch_search;
}

export interface SelectSearchVariables {
  key: string;
  type: SearchTypes;
  filter?: SearchFilter | null;
  after?: string | null;
  first?: any | null;
  exclude?: SearchExclude | null;
  includeAuthorTags?: boolean | null;
}
