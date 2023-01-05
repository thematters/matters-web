/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CircleMembersPublic
// ====================================================

export interface CircleMembersPublic_circle_members_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CircleMembersPublic_circle_members_edges_node_user_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleMembersPublic_circle_members_edges_node_user_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleMembersPublic_circle_members_edges_node_user_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: CircleMembersPublic_circle_members_edges_node_user_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleMembersPublic_circle_members_edges_node_user_info_cryptoWallet | null;
}

export interface CircleMembersPublic_circle_members_edges_node_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleMembersPublic_circle_members_edges_node_user_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleMembersPublic_circle_members_edges_node_user {
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
  info: CircleMembersPublic_circle_members_edges_node_user_info;
  /**
   * Status of current user.
   */
  status: CircleMembersPublic_circle_members_edges_node_user_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleMembersPublic_circle_members_edges_node_user_liker;
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

export interface CircleMembersPublic_circle_members_edges_node {
  __typename: "Member";
  /**
   * User who join to a Circle.
   */
  user: CircleMembersPublic_circle_members_edges_node_user;
}

export interface CircleMembersPublic_circle_members_edges {
  __typename: "MemberEdge";
  cursor: string;
  node: CircleMembersPublic_circle_members_edges_node;
}

export interface CircleMembersPublic_circle_members {
  __typename: "MemberConnection";
  pageInfo: CircleMembersPublic_circle_members_pageInfo;
  edges: CircleMembersPublic_circle_members_edges[] | null;
}

export interface CircleMembersPublic_circle {
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
   * List of Circle member.
   */
  members: CircleMembersPublic_circle_members;
}

export interface CircleMembersPublic {
  circle: CircleMembersPublic_circle | null;
}

export interface CircleMembersPublicVariables {
  name: string;
  after?: string | null;
}
