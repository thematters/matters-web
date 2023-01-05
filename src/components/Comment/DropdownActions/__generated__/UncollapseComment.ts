/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UncollapseComment
// ====================================================

export interface UncollapseComment_updateCommentsState {
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

export interface UncollapseComment {
  /**
   * Update a comments' state.
   */
  updateCommentsState: UncollapseComment_updateCommentsState[];
}

export interface UncollapseCommentVariables {
  id: string;
  state: CommentState;
}
