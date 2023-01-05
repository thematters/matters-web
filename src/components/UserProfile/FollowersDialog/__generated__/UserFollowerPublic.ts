/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserFollowerPublic
// ====================================================

export interface UserFollowerPublic_user_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
}

export interface UserFollowerPublic_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserFollowerPublic_user_followers_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserFollowerPublic_user_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserFollowerPublic_user_followers_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserFollowerPublic_user_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: UserFollowerPublic_user_followers_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserFollowerPublic_user_followers_edges_node_info_cryptoWallet | null;
}

export interface UserFollowerPublic_user_followers_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserFollowerPublic_user_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserFollowerPublic_user_followers_edges_node {
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
  info: UserFollowerPublic_user_followers_edges_node_info;
  /**
   * Status of current user.
   */
  status: UserFollowerPublic_user_followers_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserFollowerPublic_user_followers_edges_node_liker;
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

export interface UserFollowerPublic_user_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: UserFollowerPublic_user_followers_edges_node;
}

export interface UserFollowerPublic_user_followers {
  __typename: "UserConnection";
  pageInfo: UserFollowerPublic_user_followers_pageInfo;
  edges: UserFollowerPublic_user_followers_edges[] | null;
}

export interface UserFollowerPublic_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * User information.
   */
  info: UserFollowerPublic_user_info;
  /**
   * Status of current user.
   */
  status: UserFollowerPublic_user_status | null;
  /**
   * Followers of this user.
   */
  followers: UserFollowerPublic_user_followers;
}

export interface UserFollowerPublic {
  user: UserFollowerPublic_user | null;
}

export interface UserFollowerPublicVariables {
  userName: string;
  after?: string | null;
}
