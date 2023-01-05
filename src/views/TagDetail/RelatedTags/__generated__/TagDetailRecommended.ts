/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TagDetailRecommended
// ====================================================

export interface TagDetailRecommended_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagDetailRecommended_node_Tag_recommended_edges_node {
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
   * Description of this tag.
   */
  description: string | null;
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface TagDetailRecommended_node_Tag_recommended_edges {
  __typename: "TagEdge";
  cursor: string;
  node: TagDetailRecommended_node_Tag_recommended_edges_node;
}

export interface TagDetailRecommended_node_Tag_recommended {
  __typename: "TagConnection";
  edges: TagDetailRecommended_node_Tag_recommended_edges[] | null;
}

export interface TagDetailRecommended_node_Tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Tags recommended based on relations to current tag.
   */
  recommended: TagDetailRecommended_node_Tag_recommended;
}

export type TagDetailRecommended_node = TagDetailRecommended_node_Article | TagDetailRecommended_node_Tag;

export interface TagDetailRecommended {
  node: TagDetailRecommended_node | null;
}

export interface TagDetailRecommendedVariables {
  id: string;
  random?: any | null;
}
