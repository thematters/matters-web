/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FeedAuthors
// ====================================================

export interface FeedAuthors_viewer_recommendation_authors_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FeedAuthors_viewer_recommendation_authors_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FeedAuthors_viewer_recommendation_authors_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: FeedAuthors_viewer_recommendation_authors_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FeedAuthors_viewer_recommendation_authors_edges_node_info_cryptoWallet | null;
}

export interface FeedAuthors_viewer_recommendation_authors_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FeedAuthors_viewer_recommendation_authors_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FeedAuthors_viewer_recommendation_authors_edges_node {
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
  info: FeedAuthors_viewer_recommendation_authors_edges_node_info;
  /**
   * Status of current user.
   */
  status: FeedAuthors_viewer_recommendation_authors_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FeedAuthors_viewer_recommendation_authors_edges_node_liker;
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

export interface FeedAuthors_viewer_recommendation_authors_edges {
  __typename: "UserEdge";
  cursor: string;
  node: FeedAuthors_viewer_recommendation_authors_edges_node;
}

export interface FeedAuthors_viewer_recommendation_authors {
  __typename: "UserConnection";
  edges: FeedAuthors_viewer_recommendation_authors_edges[] | null;
}

export interface FeedAuthors_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Global user list, sort by activities in recent 6 month.
   */
  authors: FeedAuthors_viewer_recommendation_authors;
}

export interface FeedAuthors_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: FeedAuthors_viewer_recommendation;
}

export interface FeedAuthors {
  viewer: FeedAuthors_viewer | null;
}

export interface FeedAuthorsVariables {
  random?: any | null;
}
