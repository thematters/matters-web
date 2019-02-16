/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Icymi
// ====================================================

export interface Icymi_viewer_recommendation_icymi_edges_node_author {
  __typename: 'User'
  userName: string
}

export interface Icymi_viewer_recommendation_icymi_edges_node_comments {
  __typename: 'CommentConnection'
  totalCount: number
}

export interface Icymi_viewer_recommendation_icymi_edges_node {
  __typename: 'Article'
  id: string
  title: string
  slug: string
  cover: any | null
  author: Icymi_viewer_recommendation_icymi_edges_node_author
  mediaHash: string | null
  /**
   * MAT recieved for this article
   */
  MAT: number
  comments: Icymi_viewer_recommendation_icymi_edges_node_comments
}

export interface Icymi_viewer_recommendation_icymi_edges {
  __typename: 'ArticleEdge'
  cursor: string
  node: Icymi_viewer_recommendation_icymi_edges_node
}

export interface Icymi_viewer_recommendation_icymi {
  __typename: 'ArticleConnection'
  edges: Icymi_viewer_recommendation_icymi_edges[] | null
}

export interface Icymi_viewer_recommendation {
  __typename: 'Recommendation'
  /**
   * In case you missed it
   */
  icymi: Icymi_viewer_recommendation_icymi
}

export interface Icymi_viewer {
  __typename: 'User'
  id: string
  recommendation: Icymi_viewer_recommendation
}

export interface Icymi {
  viewer: Icymi_viewer | null
}
