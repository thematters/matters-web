/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TagDetailPrivate
// ====================================================

export interface TagDetailPrivate_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagDetailPrivate_node_Tag {
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

export type TagDetailPrivate_node = TagDetailPrivate_node_Article | TagDetailPrivate_node_Tag;

export interface TagDetailPrivate {
  node: TagDetailPrivate_node | null;
}

export interface TagDetailPrivateVariables {
  id: string;
}
