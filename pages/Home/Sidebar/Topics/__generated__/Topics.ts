/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Topics
// ====================================================

export interface Topics_viewer_recommendation_topics_edges_node_author {
  __typename: 'User'
  userName: string
}

export interface Topics_viewer_recommendation_topics_edges_node_comments {
  __typename: 'CommentConnection'
  totalCount: number
}

export interface Topics_viewer_recommendation_topics_edges_node {
  __typename: 'Article'
  id: string
  title: string
  slug: string
  author: Topics_viewer_recommendation_topics_edges_node_author
  mediaHash: string | null
  /**
   * MAT recieved for this article
   */
  MAT: number
  comments: Topics_viewer_recommendation_topics_edges_node_comments
}

export interface Topics_viewer_recommendation_topics_edges {
  __typename: 'ArticleEdge'
  cursor: string
  node: Topics_viewer_recommendation_topics_edges_node
}

export interface Topics_viewer_recommendation_topics {
  __typename: 'ArticleConnection'
  edges: Topics_viewer_recommendation_topics_edges[] | null
}

export interface Topics_viewer_recommendation {
  __typename: 'Recommendation'
  topics: Topics_viewer_recommendation_topics
}

export interface Topics_viewer {
  __typename: 'User'
  id: string
  recommendation: Topics_viewer_recommendation
}

export interface Topics {
  viewer: Topics_viewer | null
}
