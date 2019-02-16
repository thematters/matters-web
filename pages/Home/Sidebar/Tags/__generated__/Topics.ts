/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Topics
// ====================================================

export interface Topics_viewer_recommendation_tags_edges_node_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface Topics_viewer_recommendation_tags_edges_node {
  __typename: "Tag";
  content: string;
  articles: Topics_viewer_recommendation_tags_edges_node_articles;
}

export interface Topics_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: Topics_viewer_recommendation_tags_edges_node;
}

export interface Topics_viewer_recommendation_tags {
  __typename: "TagConnection";
  edges: Topics_viewer_recommendation_tags_edges[] | null;
}

export interface Topics_viewer_recommendation {
  __typename: "Recommendation";
  tags: Topics_viewer_recommendation_tags;
}

export interface Topics_viewer {
  __typename: "User";
  id: string;
  recommendation: Topics_viewer_recommendation;
}

export interface Topics {
  viewer: Topics_viewer | null;
}
