/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DonatorsArticle
// ====================================================

export interface DonatorsArticle_donations_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DonatorsArticle_donations_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DonatorsArticle_donations_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DonatorsArticle_donations_edges_node_info_badges[] | null;
}

export interface DonatorsArticle_donations_edges_node {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DonatorsArticle_donations_edges_node_liker;
  /**
   * User information.
   */
  info: DonatorsArticle_donations_edges_node_info;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DonatorsArticle_donations_edges {
  __typename: "UserEdge";
  cursor: string;
  node: DonatorsArticle_donations_edges_node;
}

export interface DonatorsArticle_donations {
  __typename: "UserConnection";
  totalCount: number;
  edges: DonatorsArticle_donations_edges[] | null;
}

export interface DonatorsArticle_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface DonatorsArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Transactions history of this article.
   */
  donations: DonatorsArticle_donations;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Transactions history of this article.
   */
  donationsDialog: DonatorsArticle_donationsDialog;
}
