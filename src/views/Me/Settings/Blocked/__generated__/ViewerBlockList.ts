/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ViewerBlockList
// ====================================================

export interface ViewerBlockList_viewer_blockList_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ViewerBlockList_viewer_blockList_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ViewerBlockList_viewer_blockList_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ViewerBlockList_viewer_blockList_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: ViewerBlockList_viewer_blockList_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ViewerBlockList_viewer_blockList_edges_node_info_cryptoWallet | null;
}

export interface ViewerBlockList_viewer_blockList_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ViewerBlockList_viewer_blockList_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ViewerBlockList_viewer_blockList_edges_node {
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
  info: ViewerBlockList_viewer_blockList_edges_node_info;
  /**
   * Status of current user.
   */
  status: ViewerBlockList_viewer_blockList_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ViewerBlockList_viewer_blockList_edges_node_liker;
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

export interface ViewerBlockList_viewer_blockList_edges {
  __typename: "UserEdge";
  cursor: string;
  node: ViewerBlockList_viewer_blockList_edges_node;
}

export interface ViewerBlockList_viewer_blockList {
  __typename: "UserConnection";
  pageInfo: ViewerBlockList_viewer_blockList_pageInfo;
  edges: ViewerBlockList_viewer_blockList_edges[] | null;
}

export interface ViewerBlockList_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Users that blocked by current user.
   */
  blockList: ViewerBlockList_viewer_blockList;
}

export interface ViewerBlockList {
  viewer: ViewerBlockList_viewer | null;
}

export interface ViewerBlockListVariables {
  after?: string | null;
}
