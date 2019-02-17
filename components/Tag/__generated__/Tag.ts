/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Tag
// ====================================================

export interface Tag_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface Tag {
  __typename: "Tag";
  id: string;
  content: string;
  articles: Tag_articles;
}
