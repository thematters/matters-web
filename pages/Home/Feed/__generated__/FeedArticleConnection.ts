/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedArticleConnection
// ====================================================

export interface FeedArticleConnection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface FeedArticleConnection_edges_node_author {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface FeedArticleConnection_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface FeedArticleConnection_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: FeedArticleConnection_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: FeedArticleConnection_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface FeedArticleConnection_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: FeedArticleConnection_edges_node;
}

export interface FeedArticleConnection {
  __typename: "ArticleConnection";
  pageInfo: FeedArticleConnection_pageInfo;
  edges: FeedArticleConnection_edges[] | null;
}
