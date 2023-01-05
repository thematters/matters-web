/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PutCommentInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PutComment
// ====================================================

export interface PutComment_putComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Content of this comment.
   */
  content: string | null;
}

export interface PutComment {
  /**
   * Publish or update a comment.
   */
  putComment: PutComment_putComment;
}

export interface PutCommentVariables {
  input: PutCommentInput;
}
