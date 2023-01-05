/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetTagUnselected
// ====================================================

export interface SetTagUnselected_updateArticlesTags_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SetTagUnselected_updateArticlesTags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: SetTagUnselected_updateArticlesTags_articles;
}

export interface SetTagUnselected {
  /**
   * Update articles' tag.
   */
  updateArticlesTags: SetTagUnselected_updateArticlesTags;
}

export interface SetTagUnselectedVariables {
  id: string;
  articles?: string[] | null;
}
