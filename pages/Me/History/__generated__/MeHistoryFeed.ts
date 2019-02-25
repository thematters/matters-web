/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeHistoryFeed
// ====================================================

export interface MeHistoryFeed_viewer_activity_history_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author {
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

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: MeHistoryFeed_viewer_activity_history_edges_node_article_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: MeHistoryFeed_viewer_activity_history_edges_node_article_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node {
  __typename: "ReadHistory";
  article: MeHistoryFeed_viewer_activity_history_edges_node_article;
}

export interface MeHistoryFeed_viewer_activity_history_edges {
  __typename: "ReadHistoryEdge";
  cursor: string;
  node: MeHistoryFeed_viewer_activity_history_edges_node;
}

export interface MeHistoryFeed_viewer_activity_history {
  __typename: "ReadHistoryConnection";
  pageInfo: MeHistoryFeed_viewer_activity_history_pageInfo;
  edges: MeHistoryFeed_viewer_activity_history_edges[] | null;
}

export interface MeHistoryFeed_viewer_activity {
  __typename: "UserActivity";
  history: MeHistoryFeed_viewer_activity_history;
}

export interface MeHistoryFeed_viewer {
  __typename: "User";
  id: string;
  activity: MeHistoryFeed_viewer_activity;
}

export interface MeHistoryFeed {
  viewer: MeHistoryFeed_viewer | null;
}

export interface MeHistoryFeedVariables {
  cursor?: string | null;
  hasArticleDigestActionAuthor?: boolean | null;
  hasArticleDigestActionDateTime?: boolean | null;
}
