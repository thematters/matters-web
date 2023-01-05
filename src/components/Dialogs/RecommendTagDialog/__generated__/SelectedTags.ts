/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SelectedTags
// ====================================================

export interface SelectedTags_viewer_recommendation_selectedTags_edges_node {
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

export interface SelectedTags_viewer_recommendation_selectedTags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: SelectedTags_viewer_recommendation_selectedTags_edges_node;
}

export interface SelectedTags_viewer_recommendation_selectedTags {
  __typename: "TagConnection";
  totalCount: number;
  edges: SelectedTags_viewer_recommendation_selectedTags_edges[] | null;
}

export interface SelectedTags_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Selected tag list
   */
  selectedTags: SelectedTags_viewer_recommendation_selectedTags;
}

export interface SelectedTags_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: SelectedTags_viewer_recommendation;
}

export interface SelectedTags {
  viewer: SelectedTags_viewer | null;
}

export interface SelectedTagsVariables {
  random?: any | null;
}
