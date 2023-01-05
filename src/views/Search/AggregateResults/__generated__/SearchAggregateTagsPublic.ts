/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchAggregateTagsPublic
// ====================================================

export interface SearchAggregateTagsPublic_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchAggregateTagsPublic_search_edges_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchAggregateTagsPublic_search_edges_node_Tag {
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

export type SearchAggregateTagsPublic_search_edges_node = SearchAggregateTagsPublic_search_edges_node_Article | SearchAggregateTagsPublic_search_edges_node_Tag;

export interface SearchAggregateTagsPublic_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SearchAggregateTagsPublic_search_edges_node;
}

export interface SearchAggregateTagsPublic_search {
  __typename: "SearchResultConnection";
  pageInfo: SearchAggregateTagsPublic_search_pageInfo;
  edges: SearchAggregateTagsPublic_search_edges[] | null;
}

export interface SearchAggregateTagsPublic {
  search: SearchAggregateTagsPublic_search;
}

export interface SearchAggregateTagsPublicVariables {
  key: string;
}
