/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CircleFollowersPublic
// ====================================================

export interface CircleFollowersPublic_circle_followers_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CircleFollowersPublic_circle_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleFollowersPublic_circle_followers_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleFollowersPublic_circle_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: CircleFollowersPublic_circle_followers_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleFollowersPublic_circle_followers_edges_node_info_cryptoWallet | null;
}

export interface CircleFollowersPublic_circle_followers_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleFollowersPublic_circle_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleFollowersPublic_circle_followers_edges_node {
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
  info: CircleFollowersPublic_circle_followers_edges_node_info;
  /**
   * Status of current user.
   */
  status: CircleFollowersPublic_circle_followers_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleFollowersPublic_circle_followers_edges_node_liker;
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

export interface CircleFollowersPublic_circle_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: CircleFollowersPublic_circle_followers_edges_node;
}

export interface CircleFollowersPublic_circle_followers {
  __typename: "UserConnection";
  pageInfo: CircleFollowersPublic_circle_followers_pageInfo;
  edges: CircleFollowersPublic_circle_followers_edges[] | null;
}

export interface CircleFollowersPublic_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle cover's link.
   */
  cover: string | null;
  /**
   * Human readable name of this Circle.
   */
  displayName: string;
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * List of Circle follower.
   */
  followers: CircleFollowersPublic_circle_followers;
}

export interface CircleFollowersPublic {
  circle: CircleFollowersPublic_circle | null;
}

export interface CircleFollowersPublicVariables {
  name: string;
  after?: string | null;
}
