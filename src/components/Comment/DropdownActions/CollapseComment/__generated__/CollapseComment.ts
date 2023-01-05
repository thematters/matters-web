/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CollapseComment
// ====================================================

export interface CollapseComment_updateCommentsState {
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

export interface CollapseComment {
  /**
   * Update a comments' state.
   */
  updateCommentsState: CollapseComment_updateCommentsState[];
}

export interface CollapseCommentVariables {
  id: string;
  state: CommentState;
}
