/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppreciationPurpose, UserState, BadgeType, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeAppreciationsSent
// ====================================================

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_info_cryptoWallet | null;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender {
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
  status: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_liker;
  /**
   * User information.
   */
  info: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender_info;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_info_cryptoWallet | null;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient {
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
  status: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_liker;
  /**
   * User information.
   */
  info: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient_info;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_target_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_target {
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
  author: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_target_author;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node {
  __typename: "Appreciation";
  amount: number;
  purpose: AppreciationPurpose;
  content: string;
  /**
   * Sender of appreciation.
   */
  sender: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_sender | null;
  /**
   * Recipient of appreciation.
   */
  recipient: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_recipient;
  /**
   * Object that appreciation is meant for.
   */
  target: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node_target | null;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent_edges {
  __typename: "AppreciationEdge";
  cursor: string;
  node: MeAppreciationsSent_viewer_activity_appreciationsSent_edges_node;
}

export interface MeAppreciationsSent_viewer_activity_appreciationsSent {
  __typename: "AppreciationConnection";
  pageInfo: MeAppreciationsSent_viewer_activity_appreciationsSent_pageInfo;
  edges: MeAppreciationsSent_viewer_activity_appreciationsSent_edges[] | null;
}

export interface MeAppreciationsSent_viewer_activity {
  __typename: "UserActivity";
  /**
   * Total number of appreciation current user gave.
   */
  appreciationsSentTotal: number;
  /**
   * Total number of appreciation current user received.
   */
  appreciationsReceivedTotal: number;
  /**
   * Appreciations current user gave.
   */
  appreciationsSent: MeAppreciationsSent_viewer_activity_appreciationsSent;
}

export interface MeAppreciationsSent_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Record of user activity, only accessable by current user.
   */
  activity: MeAppreciationsSent_viewer_activity;
}

export interface MeAppreciationsSent {
  viewer: MeAppreciationsSent_viewer | null;
}

export interface MeAppreciationsSentVariables {
  after?: string | null;
}
