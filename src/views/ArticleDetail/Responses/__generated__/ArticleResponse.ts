/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticleResponse
// ====================================================

export interface ArticleResponse_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleResponse_article_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface ArticleResponse_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: ArticleResponse_article_Article_author;
  /**
   * The counting number of this article.
   */
  responseCount: number;
}

export type ArticleResponse_article = ArticleResponse_article_User | ArticleResponse_article_Article;

export interface ArticleResponse {
  article: ArticleResponse_article | null;
}

export interface ArticleResponseVariables {
  id: string;
}
