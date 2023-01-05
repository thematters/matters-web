/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowingTagsPrivate
// ====================================================

export interface UserFollowingTagsPrivate_nodes_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface UserFollowingTagsPrivate_nodes_Tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}

export type UserFollowingTagsPrivate_nodes = UserFollowingTagsPrivate_nodes_Article | UserFollowingTagsPrivate_nodes_Tag;

export interface UserFollowingTagsPrivate {
  nodes: UserFollowingTagsPrivate_nodes[] | null;
}

export interface UserFollowingTagsPrivateVariables {
  ids: string[];
}
