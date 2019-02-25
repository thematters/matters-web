/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DigestTag
// ====================================================

export interface DigestTag_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DigestTag {
  __typename: "Tag";
  id: string;
  content: string;
  articles: DigestTag_articles;
}
