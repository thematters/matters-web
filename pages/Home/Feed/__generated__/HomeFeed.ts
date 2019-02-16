/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeFeed
// ====================================================

export interface HomeFeed_viewer_recommendation_feed_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface HomeFeed_viewer_recommendation_feed_edges_node_author {
  __typename: "User";
  userName: string;
}

export interface HomeFeed_viewer_recommendation_feed_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface HomeFeed_viewer_recommendation_feed_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: HomeFeed_viewer_recommendation_feed_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: HomeFeed_viewer_recommendation_feed_edges_node_comments;
}

export interface HomeFeed_viewer_recommendation_feed_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: HomeFeed_viewer_recommendation_feed_edges_node;
}

export interface HomeFeed_viewer_recommendation_feed {
  __typename: "ArticleConnection";
  pageInfo: HomeFeed_viewer_recommendation_feed_pageInfo;
  edges: HomeFeed_viewer_recommendation_feed_edges[] | null;
}

export interface HomeFeed_viewer_recommendation {
  __typename: "Recommendation";
  feed: HomeFeed_viewer_recommendation_feed;
}

export interface HomeFeed_viewer {
  __typename: "User";
  id: string;
  recommendation: HomeFeed_viewer_recommendation;
}

export interface HomeFeed {
  viewer: HomeFeed_viewer | null;
}

export interface HomeFeedVariables {
  cursor?: string | null;
}
