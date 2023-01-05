/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RemoveTagButtonArticle
// ====================================================

export interface RemoveTagButtonArticle_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface RemoveTagButtonArticle_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface RemoveTagButtonArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: RemoveTagButtonArticle_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: RemoveTagButtonArticle_tags_editors[] | null;
}

export interface RemoveTagButtonArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Tags attached to this article.
   */
  tags: RemoveTagButtonArticle_tags[] | null;
}
