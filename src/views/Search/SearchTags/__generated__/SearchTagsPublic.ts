/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTagsPublic
// ====================================================

export interface SearchTagsPublic_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchTagsPublic_search_edges_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchTagsPublic_search_edges_node_Tag {
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

export type SearchTagsPublic_search_edges_node = SearchTagsPublic_search_edges_node_Article | SearchTagsPublic_search_edges_node_Tag;

export interface SearchTagsPublic_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SearchTagsPublic_search_edges_node;
}

export interface SearchTagsPublic_search {
  __typename: "SearchResultConnection";
  pageInfo: SearchTagsPublic_search_pageInfo;
  edges: SearchTagsPublic_search_edges[] | null;
}

export interface SearchTagsPublic {
  search: SearchTagsPublic_search;
}

export interface SearchTagsPublicVariables {
  key: string;
  after?: string | null;
}
