/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagListArticle
// ====================================================

export interface TagListArticle_tags {
  __typename: "Tag";
  id: string;
  content: string;
}

export interface TagListArticle {
  __typename: "Article";
  tags: TagListArticle_tags[] | null;
}
