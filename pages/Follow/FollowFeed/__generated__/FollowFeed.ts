/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FollowFeed
// ====================================================

export interface FollowFeed_viewer_recommendation_followeeArticles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface FollowFeed_viewer_recommendation_followeeArticles_edges_node_author {
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

export interface FollowFeed_viewer_recommendation_followeeArticles_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface FollowFeed_viewer_recommendation_followeeArticles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: FollowFeed_viewer_recommendation_followeeArticles_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  /**
   * Viewer has appreciate
   */
  hasAppreciate: boolean;
  /**
   * limit the nuhmber of appreciate per user
   */
  appreciateLimit: number;
  appreciateLeft: number;
  comments: FollowFeed_viewer_recommendation_followeeArticles_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface FollowFeed_viewer_recommendation_followeeArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: FollowFeed_viewer_recommendation_followeeArticles_edges_node;
}

export interface FollowFeed_viewer_recommendation_followeeArticles {
  __typename: "ArticleConnection";
  pageInfo: FollowFeed_viewer_recommendation_followeeArticles_pageInfo;
  edges: FollowFeed_viewer_recommendation_followeeArticles_edges[] | null;
}

export interface FollowFeed_viewer_recommendation {
  __typename: "Recommendation";
  followeeArticles: FollowFeed_viewer_recommendation_followeeArticles;
}

export interface FollowFeed_viewer {
  __typename: "User";
  id: string;
  recommendation: FollowFeed_viewer_recommendation;
}

export interface FollowFeed {
  viewer: FollowFeed_viewer | null;
}

export interface FollowFeedVariables {
  cursor?: string | null;
}
