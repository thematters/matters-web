/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: AppreciatorsArticle
// ====================================================

export interface AppreciatorsArticle_received_edges_node_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface AppreciatorsArticle_received_edges_node_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface AppreciatorsArticle_received_edges_node_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: AppreciatorsArticle_received_edges_node_sender_info_badges[] | null;
}

export interface AppreciatorsArticle_received_edges_node_sender {
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
  liker: AppreciatorsArticle_received_edges_node_sender_liker;
  /**
   * User information.
   */
  info: AppreciatorsArticle_received_edges_node_sender_info;
}

export interface AppreciatorsArticle_received_edges_node {
  __typename: "Appreciation";
  /**
   * Sender of appreciation.
   */
  sender: AppreciatorsArticle_received_edges_node_sender | null;
}

export interface AppreciatorsArticle_received_edges {
  __typename: "AppreciationEdge";
  cursor: string;
  node: AppreciatorsArticle_received_edges_node;
}

export interface AppreciatorsArticle_received {
  __typename: "AppreciationConnection";
  totalCount: number;
  edges: AppreciatorsArticle_received_edges[] | null;
}

export interface AppreciatorsArticle_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface AppreciatorsArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Total number of appreciations recieved of this article.
   */
  appreciationsReceivedTotal: number;
  /**
   * Appreciations history of this article.
   */
  received: AppreciatorsArticle_received;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: AppreciatorsArticle_appreciationsReceived;
}
