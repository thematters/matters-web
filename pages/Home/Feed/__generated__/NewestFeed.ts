/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewestFeed
// ====================================================

export interface NewestFeed_viewer_recommendation_feed_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface NewestFeed_viewer_recommendation_feed_edges_node_author {
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

export interface NewestFeed_viewer_recommendation_feed_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface NewestFeed_viewer_recommendation_feed_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: NewestFeed_viewer_recommendation_feed_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: NewestFeed_viewer_recommendation_feed_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface NewestFeed_viewer_recommendation_feed_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: NewestFeed_viewer_recommendation_feed_edges_node;
}

export interface NewestFeed_viewer_recommendation_feed {
  __typename: "ArticleConnection";
  pageInfo: NewestFeed_viewer_recommendation_feed_pageInfo;
  edges: NewestFeed_viewer_recommendation_feed_edges[] | null;
}

export interface NewestFeed_viewer_recommendation {
  __typename: "Recommendation";
  feed: NewestFeed_viewer_recommendation_feed;
}

export interface NewestFeed_viewer {
  __typename: "User";
  id: string;
  recommendation: NewestFeed_viewer_recommendation;
}

export interface NewestFeed {
  viewer: NewestFeed_viewer | null;
}

export interface NewestFeedVariables {
  cursor?: string | null;
}
