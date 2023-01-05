/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TopDonatorFilter, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeAnalytics
// ====================================================

export interface MeAnalytics_viewer_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface MeAnalytics_viewer_analytics_topDonators_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeAnalytics_viewer_analytics_topDonators_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeAnalytics_viewer_analytics_topDonators_edges_node_info_cryptoWallet | null;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges_node {
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
  status: MeAnalytics_viewer_analytics_topDonators_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeAnalytics_viewer_analytics_topDonators_edges_node_liker;
  /**
   * User information.
   */
  info: MeAnalytics_viewer_analytics_topDonators_edges_node_info;
}

export interface MeAnalytics_viewer_analytics_topDonators_edges {
  __typename: "TopDonatorEdge";
  cursor: string;
  node: MeAnalytics_viewer_analytics_topDonators_edges_node;
  donationCount: number;
}

export interface MeAnalytics_viewer_analytics_topDonators {
  __typename: "TopDonatorConnection";
  pageInfo: MeAnalytics_viewer_analytics_topDonators_pageInfo;
  edges: MeAnalytics_viewer_analytics_topDonators_edges[] | null;
}

export interface MeAnalytics_viewer_analytics {
  __typename: "UserAnalytics";
  /**
   * Top donators of current user.
   */
  topDonators: MeAnalytics_viewer_analytics_topDonators;
}

export interface MeAnalytics_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Articles authored by current user.
   */
  articles: MeAnalytics_viewer_articles;
  /**
   * user data analytics, only accessable by current user.
   */
  analytics: MeAnalytics_viewer_analytics;
}

export interface MeAnalytics {
  viewer: MeAnalytics_viewer | null;
}

export interface MeAnalyticsVariables {
  after?: string | null;
  filter?: TopDonatorFilter | null;
}
