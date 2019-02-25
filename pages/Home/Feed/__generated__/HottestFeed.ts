/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HottestFeed
// ====================================================

export interface HottestFeed_viewer_recommendation_feed_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface HottestFeed_viewer_recommendation_feed_edges_node_author {
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

export interface HottestFeed_viewer_recommendation_feed_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface HottestFeed_viewer_recommendation_feed_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: HottestFeed_viewer_recommendation_feed_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: HottestFeed_viewer_recommendation_feed_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface HottestFeed_viewer_recommendation_feed_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: HottestFeed_viewer_recommendation_feed_edges_node;
}

export interface HottestFeed_viewer_recommendation_feed {
  __typename: "ArticleConnection";
  pageInfo: HottestFeed_viewer_recommendation_feed_pageInfo;
  edges: HottestFeed_viewer_recommendation_feed_edges[] | null;
}

export interface HottestFeed_viewer_recommendation {
  __typename: "Recommendation";
  feed: HottestFeed_viewer_recommendation_feed;
}

export interface HottestFeed_viewer {
  __typename: "User";
  id: string;
  recommendation: HottestFeed_viewer_recommendation;
}

export interface HottestFeed {
  viewer: HottestFeed_viewer | null;
}

export interface HottestFeedVariables {
  cursor?: string | null;
}
