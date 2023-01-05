/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TagFollowers
// ====================================================

export interface TagFollowers_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagFollowers_node_Tag_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagFollowers_node_Tag_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagFollowers_node_Tag_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagFollowers_node_Tag_followers_edges_node_info_badges[] | null;
}

export interface TagFollowers_node_Tag_followers_edges_node {
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
  liker: TagFollowers_node_Tag_followers_edges_node_liker;
  /**
   * User information.
   */
  info: TagFollowers_node_Tag_followers_edges_node_info;
}

export interface TagFollowers_node_Tag_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: TagFollowers_node_Tag_followers_edges_node;
}

export interface TagFollowers_node_Tag_followers {
  __typename: "UserConnection";
  totalCount: number;
  edges: TagFollowers_node_Tag_followers_edges[] | null;
}

export interface TagFollowers_node_Tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Followers of this tag.
   */
  followers: TagFollowers_node_Tag_followers;
}

export type TagFollowers_node = TagFollowers_node_Article | TagFollowers_node_Tag;

export interface TagFollowers {
  node: TagFollowers_node | null;
}

export interface TagFollowersVariables {
  id: string;
}
