/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ContentCommentPublic
// ====================================================

export interface ContentCommentPublic {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * State of this comment.
   */
  state: CommentState;
}
