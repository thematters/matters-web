/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeachTags
// ====================================================

export interface SeachTags_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SeachTags_search_edges_node_Article {
  __typename: "Article" | "User" | "Draft" | "Comment";
}

export interface SeachTags_search_edges_node_Tag_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SeachTags_search_edges_node_Tag {
  __typename: "Tag";
  id: string;
  content: string;
  articles: SeachTags_search_edges_node_Tag_articles;
}

export type SeachTags_search_edges_node = SeachTags_search_edges_node_Article | SeachTags_search_edges_node_Tag;

export interface SeachTags_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SeachTags_search_edges_node;
}

export interface SeachTags_search {
  __typename: "SearchResultConnection";
  pageInfo: SeachTags_search_pageInfo;
  edges: SeachTags_search_edges[] | null;
}

export interface SeachTags {
  search: SeachTags_search;
}

export interface SeachTagsVariables {
  key: string;
}
