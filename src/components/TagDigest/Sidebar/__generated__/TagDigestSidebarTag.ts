/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagDigestSidebarTag
// ====================================================

export interface TagDigestSidebarTag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Description of this tag.
   */
  description: string | null;
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}
