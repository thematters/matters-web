/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagConnection
// ====================================================

export interface TagConnection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface TagConnection_edges_node_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagConnection_edges_node {
  __typename: "Tag";
  id: string;
  content: string;
  articles: TagConnection_edges_node_articles;
}

export interface TagConnection_edges {
  __typename: "TagEdge";
  cursor: string;
  node: TagConnection_edges_node;
}

export interface TagConnection {
  __typename: "TagConnection";
  pageInfo: TagConnection_pageInfo;
  edges: TagConnection_edges[] | null;
}
