/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllAuthorsPrivate
// ====================================================

export interface AllAuthorsPrivate_nodes_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface AllAuthorsPrivate_nodes_User {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
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

export type AllAuthorsPrivate_nodes = AllAuthorsPrivate_nodes_Article | AllAuthorsPrivate_nodes_User;

export interface AllAuthorsPrivate {
  nodes: AllAuthorsPrivate_nodes[] | null;
}

export interface AllAuthorsPrivateVariables {
  ids: string[];
}
