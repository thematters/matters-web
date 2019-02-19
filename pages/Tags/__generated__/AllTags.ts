/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTags
// ====================================================

export interface AllTags_viewer_recommendation_tags_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface AllTags_viewer_recommendation_tags_edges_node_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface AllTags_viewer_recommendation_tags_edges_node {
  __typename: "Tag";
  id: string;
  content: string;
  articles: AllTags_viewer_recommendation_tags_edges_node_articles;
}

export interface AllTags_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: AllTags_viewer_recommendation_tags_edges_node;
}

export interface AllTags_viewer_recommendation_tags {
  __typename: "TagConnection";
  pageInfo: AllTags_viewer_recommendation_tags_pageInfo;
  edges: AllTags_viewer_recommendation_tags_edges[] | null;
}

export interface AllTags_viewer_recommendation {
  __typename: "Recommendation";
  tags: AllTags_viewer_recommendation_tags;
}

export interface AllTags_viewer {
  __typename: "User";
  id: string;
  recommendation: AllTags_viewer_recommendation;
}

export interface AllTags {
  viewer: AllTags_viewer | null;
}

export interface AllTagsVariables {
  cursor?: string | null;
}
