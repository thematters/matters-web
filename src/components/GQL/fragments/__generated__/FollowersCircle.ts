/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowersCircle
// ====================================================

export interface FollowersCircle_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowersCircle_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowersCircle_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowersCircle_followers_edges_node_info_badges[] | null;
}

export interface FollowersCircle_followers_edges_node {
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
  liker: FollowersCircle_followers_edges_node_liker;
  /**
   * User information.
   */
  info: FollowersCircle_followers_edges_node_info;
}

export interface FollowersCircle_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: FollowersCircle_followers_edges_node;
}

export interface FollowersCircle_followers {
  __typename: "UserConnection";
  totalCount: number;
  edges: FollowersCircle_followers_edges[] | null;
}

export interface FollowersCircle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * List of Circle follower.
   */
  followers: FollowersCircle_followers;
}
