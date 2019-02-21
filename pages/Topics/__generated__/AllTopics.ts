/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTopics
// ====================================================

export interface AllTopics_viewer_recommendation_topics_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface AllTopics_viewer_recommendation_topics_edges_node_author {
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

export interface AllTopics_viewer_recommendation_topics_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface AllTopics_viewer_recommendation_topics_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: AllTopics_viewer_recommendation_topics_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: AllTopics_viewer_recommendation_topics_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface AllTopics_viewer_recommendation_topics_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: AllTopics_viewer_recommendation_topics_edges_node;
}

export interface AllTopics_viewer_recommendation_topics {
  __typename: "ArticleConnection";
  pageInfo: AllTopics_viewer_recommendation_topics_pageInfo;
  edges: AllTopics_viewer_recommendation_topics_edges[] | null;
}

export interface AllTopics_viewer_recommendation {
  __typename: "Recommendation";
  topics: AllTopics_viewer_recommendation_topics;
}

export interface AllTopics_viewer {
  __typename: "User";
  id: string;
  recommendation: AllTopics_viewer_recommendation;
}

export interface AllTopics {
  viewer: AllTopics_viewer | null;
}

export interface AllTopicsVariables {
  cursor?: string | null;
}
