/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TagArticlesCount
// ====================================================

export interface TagArticlesCount_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagArticlesCount_node_Tag_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagArticlesCount_node_Tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  numAuthors: number;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: TagArticlesCount_node_Tag_articles;
}

export type TagArticlesCount_node = TagArticlesCount_node_Article | TagArticlesCount_node_Tag;

export interface TagArticlesCount {
  node: TagArticlesCount_node | null;
}

export interface TagArticlesCountVariables {
  id: string;
}
