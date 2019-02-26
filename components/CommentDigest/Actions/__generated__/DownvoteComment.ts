/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DownvoteComment
// ====================================================

export interface DownvoteComment {
  __typename: "Comment";
  downvotes: number;
  myVote: Vote | null;
}
