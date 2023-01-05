/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteComment
// ====================================================

export interface DeleteComment_deleteComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * State of this comment.
   */
  state: CommentState;
}

export interface DeleteComment {
  /**
   * Remove a comment.
   */
  deleteComment: DeleteComment_deleteComment;
}

export interface DeleteCommentVariables {
  id: string;
}
