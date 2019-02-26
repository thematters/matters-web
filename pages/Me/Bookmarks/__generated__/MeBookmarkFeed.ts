/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeBookmarkFeed
// ====================================================

export interface MeBookmarkFeed_viewer_subscriptions_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeBookmarkFeed_viewer_subscriptions_edges_node_author {
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

export interface MeBookmarkFeed_viewer_subscriptions_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface MeBookmarkFeed_viewer_subscriptions_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: MeBookmarkFeed_viewer_subscriptions_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: MeBookmarkFeed_viewer_subscriptions_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface MeBookmarkFeed_viewer_subscriptions_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: MeBookmarkFeed_viewer_subscriptions_edges_node;
}

export interface MeBookmarkFeed_viewer_subscriptions {
  __typename: "ArticleConnection";
  pageInfo: MeBookmarkFeed_viewer_subscriptions_pageInfo;
  edges: MeBookmarkFeed_viewer_subscriptions_edges[] | null;
}

export interface MeBookmarkFeed_viewer {
  __typename: "User";
  id: string;
  subscriptions: MeBookmarkFeed_viewer_subscriptions;
}

export interface MeBookmarkFeed {
  viewer: MeBookmarkFeed_viewer | null;
}

export interface MeBookmarkFeedVariables {
  cursor?: string | null;
  hasArticleDigestActionAuthor?: boolean | null;
  hasArticleDigestActionDateTime?: boolean | null;
}
