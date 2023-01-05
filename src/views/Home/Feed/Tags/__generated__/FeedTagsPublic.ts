/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedTagsPublic
// ====================================================

export interface FeedTagsPublic_viewer_recommendation_tags_edges_node {
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

export interface FeedTagsPublic_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: FeedTagsPublic_viewer_recommendation_tags_edges_node;
}

export interface FeedTagsPublic_viewer_recommendation_tags {
  __typename: "TagConnection";
  totalCount: number;
  edges: FeedTagsPublic_viewer_recommendation_tags_edges[] | null;
}

export interface FeedTagsPublic_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Global tag list, sort by activities in recent 14 days.
   */
  tags: FeedTagsPublic_viewer_recommendation_tags;
}

export interface FeedTagsPublic_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: FeedTagsPublic_viewer_recommendation;
}

export interface FeedTagsPublic {
  viewer: FeedTagsPublic_viewer | null;
}

export interface FeedTagsPublicVariables {
  random?: any | null;
}
