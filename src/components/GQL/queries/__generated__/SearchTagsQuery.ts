/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTagsQuery
// ====================================================

export interface SearchTagsQuery_search_edges_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchTagsQuery_search_edges_node_Tag {
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
}

export type SearchTagsQuery_search_edges_node = SearchTagsQuery_search_edges_node_Article | SearchTagsQuery_search_edges_node_Tag;

export interface SearchTagsQuery_search_edges {
  __typename: "SearchResultEdge";
  node: SearchTagsQuery_search_edges_node;
}

export interface SearchTagsQuery_search {
  __typename: "SearchResultConnection";
  edges: SearchTagsQuery_search_edges[] | null;
}

export interface SearchTagsQuery {
  search: SearchTagsQuery_search;
}

export interface SearchTagsQueryVariables {
  search: string;
}
