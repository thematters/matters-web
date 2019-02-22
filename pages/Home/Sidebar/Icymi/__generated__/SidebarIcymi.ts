/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarIcymi
// ====================================================

export interface SidebarIcymi_viewer_recommendation_icymi_edges_node_author {
  __typename: "User";
  id: string;
  userName: string;
}

export interface SidebarIcymi_viewer_recommendation_icymi_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface SidebarIcymi_viewer_recommendation_icymi_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  author: SidebarIcymi_viewer_recommendation_icymi_edges_node_author;
  mediaHash: string | null;
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
  comments: SidebarIcymi_viewer_recommendation_icymi_edges_node_comments;
}

export interface SidebarIcymi_viewer_recommendation_icymi_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: SidebarIcymi_viewer_recommendation_icymi_edges_node;
}

export interface SidebarIcymi_viewer_recommendation_icymi {
  __typename: "ArticleConnection";
  edges: SidebarIcymi_viewer_recommendation_icymi_edges[] | null;
}

export interface SidebarIcymi_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * In case you missed it
   */
  icymi: SidebarIcymi_viewer_recommendation_icymi;
}

export interface SidebarIcymi_viewer {
  __typename: "User";
  id: string;
  recommendation: SidebarIcymi_viewer_recommendation;
}

export interface SidebarIcymi {
  viewer: SidebarIcymi_viewer | null;
}
