/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeachArticles
// ====================================================

export interface SeachArticles_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SeachArticles_search_edges_node_User {
  __typename: "User" | "Tag" | "Draft" | "Comment";
}

export interface SeachArticles_search_edges_node_Article_author {
  __typename: "User";
  id: string;
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface SeachArticles_search_edges_node_Article_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface SeachArticles_search_edges_node_Article {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: SeachArticles_search_edges_node_Article_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: SeachArticles_search_edges_node_Article_comments;
}

export type SeachArticles_search_edges_node = SeachArticles_search_edges_node_User | SeachArticles_search_edges_node_Article;

export interface SeachArticles_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SeachArticles_search_edges_node;
}

export interface SeachArticles_search {
  __typename: "SearchResultConnection";
  pageInfo: SeachArticles_search_pageInfo;
  edges: SeachArticles_search_edges[] | null;
}

export interface SeachArticles {
  search: SeachArticles_search;
}

export interface SeachArticlesVariables {
  key: string;
  first: number;
  cursor?: string | null;
}
