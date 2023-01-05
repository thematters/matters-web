/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HottestTags
// ====================================================

export interface HottestTags_viewer_recommendation_hottestTags_edges_node {
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
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}

export interface HottestTags_viewer_recommendation_hottestTags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: HottestTags_viewer_recommendation_hottestTags_edges_node;
}

export interface HottestTags_viewer_recommendation_hottestTags {
  __typename: "TagConnection";
  totalCount: number;
  edges: HottestTags_viewer_recommendation_hottestTags_edges[] | null;
}

export interface HottestTags_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Hottest tag list
   */
  hottestTags: HottestTags_viewer_recommendation_hottestTags;
}

export interface HottestTags_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: HottestTags_viewer_recommendation;
}

export interface HottestTags {
  viewer: HottestTags_viewer | null;
}

export interface HottestTagsVariables {
  random?: any | null;
}
