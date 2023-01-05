/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SetTagSelectedButtonArticle
// ====================================================

export interface SetTagSelectedButtonArticle_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface SetTagSelectedButtonArticle_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface SetTagSelectedButtonArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: SetTagSelectedButtonArticle_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: SetTagSelectedButtonArticle_tags_editors[] | null;
}

export interface SetTagSelectedButtonArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Tags attached to this article.
   */
  tags: SetTagSelectedButtonArticle_tags[] | null;
}
