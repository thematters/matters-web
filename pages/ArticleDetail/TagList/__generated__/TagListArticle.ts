/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagListArticle
// ====================================================

export interface TagListArticle_tags_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagListArticle_tags {
  __typename: "Tag";
  id: string;
  content: string;
  articles: TagListArticle_tags_articles;
}

export interface TagListArticle {
  __typename: "Article";
  tags: TagListArticle_tags[] | null;
}
