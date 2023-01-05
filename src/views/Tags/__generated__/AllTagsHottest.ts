/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTagsHottest
// ====================================================

export interface AllTagsHottest_viewer_recommendation_tags_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface AllTagsHottest_viewer_recommendation_tags_edges_node_articles_edges_node_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface AllTagsHottest_viewer_recommendation_tags_edges_node_articles_edges_node {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: AllTagsHottest_viewer_recommendation_tags_edges_node_articles_edges_node_author;
}

export interface AllTagsHottest_viewer_recommendation_tags_edges_node_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: AllTagsHottest_viewer_recommendation_tags_edges_node_articles_edges_node;
}

export interface AllTagsHottest_viewer_recommendation_tags_edges_node_articles {
  __typename: "ArticleConnection";
  edges: AllTagsHottest_viewer_recommendation_tags_edges_node_articles_edges[] | null;
}

export interface AllTagsHottest_viewer_recommendation_tags_edges_node {
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
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: AllTagsHottest_viewer_recommendation_tags_edges_node_articles;
}

export interface AllTagsHottest_viewer_recommendation_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: AllTagsHottest_viewer_recommendation_tags_edges_node;
}

export interface AllTagsHottest_viewer_recommendation_tags {
  __typename: "TagConnection";
  totalCount: number;
  pageInfo: AllTagsHottest_viewer_recommendation_tags_pageInfo;
  edges: AllTagsHottest_viewer_recommendation_tags_edges[] | null;
}

export interface AllTagsHottest_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Global tag list, sort by activities in recent 14 days.
   */
  tags: AllTagsHottest_viewer_recommendation_tags;
}

export interface AllTagsHottest_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: AllTagsHottest_viewer_recommendation;
}

export interface AllTagsHottest {
  viewer: AllTagsHottest_viewer | null;
}

export interface AllTagsHottestVariables {
  after?: string | null;
}
