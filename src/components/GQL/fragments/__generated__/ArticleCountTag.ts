/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArticleCountTag
// ====================================================

export interface ArticleCountTag_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ArticleCountTag {
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
  articles: ArticleCountTag_articles;
}
