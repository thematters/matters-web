/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchArticlesPrivate
// ====================================================

export interface SearchArticlesPrivate_nodes_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface SearchArticlesPrivate_nodes_Article_author {
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

export interface SearchArticlesPrivate_nodes_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: SearchArticlesPrivate_nodes_Article_author;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export type SearchArticlesPrivate_nodes = SearchArticlesPrivate_nodes_User | SearchArticlesPrivate_nodes_Article;

export interface SearchArticlesPrivate {
  nodes: SearchArticlesPrivate_nodes[] | null;
}

export interface SearchArticlesPrivateVariables {
  ids: string[];
}
