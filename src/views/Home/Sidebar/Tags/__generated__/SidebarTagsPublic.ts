/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarTagsPublic
// ====================================================

export interface SidebarTagsPublic_viewer_recommendation_tags_edges_node {
  __typename: "Tag";
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Description of this tag.
   */
  description: string | null;
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface SidebarTagsPublic_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: SidebarTagsPublic_viewer_recommendation_tags_edges_node;
}

export interface SidebarTagsPublic_viewer_recommendation_tags {
  __typename: "TagConnection";
  totalCount: number;
  edges: SidebarTagsPublic_viewer_recommendation_tags_edges[] | null;
}

export interface SidebarTagsPublic_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Global tag list, sort by activities in recent 14 days.
   */
  tags: SidebarTagsPublic_viewer_recommendation_tags;
}

export interface SidebarTagsPublic_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: SidebarTagsPublic_viewer_recommendation;
}

export interface SidebarTagsPublic {
  viewer: SidebarTagsPublic_viewer | null;
}

export interface SidebarTagsPublicVariables {
  random?: any | null;
}
