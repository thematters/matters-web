/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: VoteComment
// ====================================================

export interface VoteComment_voteComment {
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

export interface VoteComment {
  /**
   * Upvote or downvote a comment.
   */
  voteComment: VoteComment_voteComment;
}

export interface VoteCommentVariables {
  id: string;
  vote: Vote;
}
