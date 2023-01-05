/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditorRecommendedTags
// ====================================================

export interface EditorRecommendedTags_user_tags_edges_node {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface EditorRecommendedTags_user_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: EditorRecommendedTags_user_tags_edges_node;
}

export interface EditorRecommendedTags_user_tags {
  __typename: "TagConnection";
  edges: EditorRecommendedTags_user_tags_edges[] | null;
}

export interface EditorRecommendedTags_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Tags by by usage order of current user.
   */
  tags: EditorRecommendedTags_user_tags;
}

export interface EditorRecommendedTags {
  user: EditorRecommendedTags_user | null;
}

export interface EditorRecommendedTagsVariables {
  userName: string;
}
