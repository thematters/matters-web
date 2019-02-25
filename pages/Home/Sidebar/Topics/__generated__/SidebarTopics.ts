/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarTopics
// ====================================================

export interface SidebarTopics_viewer_recommendation_topics_edges_node_author {
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

export interface SidebarTopics_viewer_recommendation_topics_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface SidebarTopics_viewer_recommendation_topics_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  author: SidebarTopics_viewer_recommendation_topics_edges_node_author;
  mediaHash: string | null;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: SidebarTopics_viewer_recommendation_topics_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface SidebarTopics_viewer_recommendation_topics_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: SidebarTopics_viewer_recommendation_topics_edges_node;
}

export interface SidebarTopics_viewer_recommendation_topics {
  __typename: "ArticleConnection";
  edges: SidebarTopics_viewer_recommendation_topics_edges[] | null;
}

export interface SidebarTopics_viewer_recommendation {
  __typename: "Recommendation";
  topics: SidebarTopics_viewer_recommendation_topics;
}

export interface SidebarTopics_viewer {
  __typename: "User";
  id: string;
  recommendation: SidebarTopics_viewer_recommendation;
}

export interface SidebarTopics {
  viewer: SidebarTopics_viewer | null;
}

export interface SidebarTopicsVariables {
  hasArticleDigestActionAuthor?: boolean | null;
  hasArticleDigestActionDateTime?: boolean | null;
  hasArticleDigestCover?: boolean | null;
}
