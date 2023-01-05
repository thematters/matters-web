/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchAggregateUsersPublic
// ====================================================

export interface SearchAggregateUsersPublic_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchAggregateUsersPublic_search_edges_node_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchAggregateUsersPublic_search_edges_node_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SearchAggregateUsersPublic_search_edges_node_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SearchAggregateUsersPublic_search_edges_node_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SearchAggregateUsersPublic_search_edges_node_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SearchAggregateUsersPublic_search_edges_node_User_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SearchAggregateUsersPublic_search_edges_node_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SearchAggregateUsersPublic_search_edges_node_User_info_cryptoWallet | null;
}

export interface SearchAggregateUsersPublic_search_edges_node_User {
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
  status: SearchAggregateUsersPublic_search_edges_node_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SearchAggregateUsersPublic_search_edges_node_User_liker;
  /**
   * User information.
   */
  info: SearchAggregateUsersPublic_search_edges_node_User_info;
}

export type SearchAggregateUsersPublic_search_edges_node = SearchAggregateUsersPublic_search_edges_node_Article | SearchAggregateUsersPublic_search_edges_node_User;

export interface SearchAggregateUsersPublic_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SearchAggregateUsersPublic_search_edges_node;
}

export interface SearchAggregateUsersPublic_search {
  __typename: "SearchResultConnection";
  pageInfo: SearchAggregateUsersPublic_search_pageInfo;
  edges: SearchAggregateUsersPublic_search_edges[] | null;
}

export interface SearchAggregateUsersPublic {
  search: SearchAggregateUsersPublic_search;
}

export interface SearchAggregateUsersPublicVariables {
  key: string;
}
