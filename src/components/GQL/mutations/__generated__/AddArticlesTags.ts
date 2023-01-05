/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddArticlesTags
// ====================================================

export interface AddArticlesTags_addArticlesTags_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface AddArticlesTags_addArticlesTags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: AddArticlesTags_addArticlesTags_articles;
}

export interface AddArticlesTags {
  /**
   * Add one tag to articles.
   */
  addArticlesTags: AddArticlesTags_addArticlesTags;
}

export interface AddArticlesTagsVariables {
  id: string;
  articles?: string[] | null;
  selected?: boolean | null;
}
