/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteArticlesTags
// ====================================================

export interface DeleteArticlesTags_deleteArticlesTags_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DeleteArticlesTags_deleteArticlesTags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: DeleteArticlesTags_deleteArticlesTags_articles;
}

export interface DeleteArticlesTags {
  /**
   * Delete one tag from articles
   */
  deleteArticlesTags: DeleteArticlesTags_deleteArticlesTags;
}

export interface DeleteArticlesTagsVariables {
  id: string;
  articles?: string[] | null;
}
