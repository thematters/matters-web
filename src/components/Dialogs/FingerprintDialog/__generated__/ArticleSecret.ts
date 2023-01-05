/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticleSecret
// ====================================================

export interface ArticleSecret_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleSecret_article_Article_access {
  __typename: "ArticleAccess";
  secret: string | null;
}

export interface ArticleSecret_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Access related fields on circle
   */
  access: ArticleSecret_article_Article_access;
}

export type ArticleSecret_article = ArticleSecret_article_User | ArticleSecret_article_Article;

export interface ArticleSecret {
  article: ArticleSecret_article | null;
}

export interface ArticleSecretVariables {
  id: string;
}
