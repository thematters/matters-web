/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetTagSelected
// ====================================================

export interface SetTagSelected_updateArticlesTags_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SetTagSelected_updateArticlesTags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: SetTagSelected_updateArticlesTags_articles;
}

export interface SetTagSelected {
  /**
   * Update articles' tag.
   */
  updateArticlesTags: SetTagSelected_updateArticlesTags;
}

export interface SetTagSelectedVariables {
  id: string;
  articles?: string[] | null;
}
