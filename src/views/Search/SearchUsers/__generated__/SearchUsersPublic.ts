/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchUsersPublic
// ====================================================

export interface SearchUsersPublic_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchUsersPublic_search_edges_node_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchUsersPublic_search_edges_node_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SearchUsersPublic_search_edges_node_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SearchUsersPublic_search_edges_node_User_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: SearchUsersPublic_search_edges_node_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SearchUsersPublic_search_edges_node_User_info_cryptoWallet | null;
}

export interface SearchUsersPublic_search_edges_node_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SearchUsersPublic_search_edges_node_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SearchUsersPublic_search_edges_node_User {
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
   * User information.
   */
  info: SearchUsersPublic_search_edges_node_User_info;
  /**
   * Status of current user.
   */
  status: SearchUsersPublic_search_edges_node_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SearchUsersPublic_search_edges_node_User_liker;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export type SearchUsersPublic_search_edges_node = SearchUsersPublic_search_edges_node_Article | SearchUsersPublic_search_edges_node_User;

export interface SearchUsersPublic_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SearchUsersPublic_search_edges_node;
}

export interface SearchUsersPublic_search {
  __typename: "SearchResultConnection";
  pageInfo: SearchUsersPublic_search_pageInfo;
  edges: SearchUsersPublic_search_edges[] | null;
}

export interface SearchUsersPublic {
  search: SearchUsersPublic_search;
}

export interface SearchUsersPublicVariables {
  key: string;
  after?: string | null;
}
