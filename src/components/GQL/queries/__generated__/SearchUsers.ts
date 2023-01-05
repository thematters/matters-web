/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchExclude, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchUsers
// ====================================================

export interface SearchUsers_search_edges_node_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchUsers_search_edges_node_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SearchUsers_search_edges_node_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SearchUsers_search_edges_node_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SearchUsers_search_edges_node_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SearchUsers_search_edges_node_User_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SearchUsers_search_edges_node_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SearchUsers_search_edges_node_User_info_cryptoWallet | null;
}

export interface SearchUsers_search_edges_node_User {
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
  status: SearchUsers_search_edges_node_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SearchUsers_search_edges_node_User_liker;
  /**
   * User information.
   */
  info: SearchUsers_search_edges_node_User_info;
}

export type SearchUsers_search_edges_node = SearchUsers_search_edges_node_Article | SearchUsers_search_edges_node_User;

export interface SearchUsers_search_edges {
  __typename: "SearchResultEdge";
  node: SearchUsers_search_edges_node;
}

export interface SearchUsers_search {
  __typename: "SearchResultConnection";
  edges: SearchUsers_search_edges[] | null;
}

export interface SearchUsers {
  search: SearchUsers_search;
}

export interface SearchUsersVariables {
  search: string;
  exclude?: SearchExclude | null;
}
