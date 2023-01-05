/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagListArticle
// ====================================================

export interface TagListArticle_tags {
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
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface TagListArticle {
  __typename: "Article";
  /**
   * Tags attached to this article.
   */
  tags: TagListArticle_tags[] | null;
}
