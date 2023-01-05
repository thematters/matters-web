/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UnvoteComment
// ====================================================

export interface UnvoteComment_unvoteComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * The counting number of upvotes.
   */
  upvotes: number;
  /**
   * The counting number of downvotes.
   */
  downvotes: number;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
}

export interface UnvoteComment {
  /**
   * Unvote a comment.
   */
  unvoteComment: UnvoteComment_unvoteComment;
}

export interface UnvoteCommentVariables {
  id: string;
}
