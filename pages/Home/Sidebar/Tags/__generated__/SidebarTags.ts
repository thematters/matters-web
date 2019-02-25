/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarTags
// ====================================================

export interface SidebarTags_viewer_recommendation_tags_edges_node_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SidebarTags_viewer_recommendation_tags_edges_node {
  __typename: "Tag";
  id: string;
  content: string;
  articles: SidebarTags_viewer_recommendation_tags_edges_node_articles;
}

export interface SidebarTags_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: SidebarTags_viewer_recommendation_tags_edges_node;
}

export interface SidebarTags_viewer_recommendation_tags {
  __typename: "TagConnection";
  edges: SidebarTags_viewer_recommendation_tags_edges[] | null;
}

export interface SidebarTags_viewer_recommendation {
  __typename: "Recommendation";
  tags: SidebarTags_viewer_recommendation_tags;
}

export interface SidebarTags_viewer {
  __typename: "User";
  id: string;
  recommendation: SidebarTags_viewer_recommendation;
}

export interface SidebarTags {
  viewer: SidebarTags_viewer | null;
}

export interface SidebarTagsVariables {
  hasDigestTagArticleCount?: boolean | null;
}
