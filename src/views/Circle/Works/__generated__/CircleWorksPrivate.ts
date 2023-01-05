/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleWorksPrivate
// ====================================================

export interface CircleWorksPrivate_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export interface CircleWorksPrivate_nodes_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface CircleWorksPrivate_nodes_Article_author {
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
}

export interface CircleWorksPrivate_nodes_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: CircleWorksPrivate_nodes_Article_author;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export type CircleWorksPrivate_nodes = CircleWorksPrivate_nodes_User | CircleWorksPrivate_nodes_Article;

export interface CircleWorksPrivate {
  circle: CircleWorksPrivate_circle | null;
  nodes: CircleWorksPrivate_nodes[] | null;
}

export interface CircleWorksPrivateVariables {
  name: string;
  ids: string[];
}
