/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTagsRecommendedSidebar
// ====================================================

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_edges_node {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Description of this tag.
   */
  description: string | null;
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_edges {
  __typename: "TagEdge";
  cursor: string;
  node: AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_edges_node;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended {
  __typename: "TagConnection";
  pageInfo: AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_pageInfo;
  edges: AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_edges[] | null;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Tags recommended based on relations to current tag.
   */
  recommended: AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  node: AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation_tags {
  __typename: "TagConnection";
  edges: AllTagsRecommendedSidebar_viewer_recommendation_tags_edges[] | null;
}

export interface AllTagsRecommendedSidebar_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Global tag list, sort by activities in recent 14 days.
   */
  tags: AllTagsRecommendedSidebar_viewer_recommendation_tags;
}

export interface AllTagsRecommendedSidebar_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: AllTagsRecommendedSidebar_viewer_recommendation;
}

export interface AllTagsRecommendedSidebar {
  viewer: AllTagsRecommendedSidebar_viewer | null;
}
