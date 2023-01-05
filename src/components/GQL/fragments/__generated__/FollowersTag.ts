/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowersTag
// ====================================================

export interface FollowersTag_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowersTag_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowersTag_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowersTag_followers_edges_node_info_badges[] | null;
}

export interface FollowersTag_followers_edges_node {
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
  liker: FollowersTag_followers_edges_node_liker;
  /**
   * User information.
   */
  info: FollowersTag_followers_edges_node_info;
}

export interface FollowersTag_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: FollowersTag_followers_edges_node;
}

export interface FollowersTag_followers {
  __typename: "UserConnection";
  totalCount: number;
  edges: FollowersTag_followers_edges[] | null;
}

export interface FollowersTag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Followers of this tag.
   */
  followers: FollowersTag_followers;
}
