/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UpvoteComment
// ====================================================

export interface UpvoteComment {
  __typename: "Comment";
  upvotes: number;
  myVote: Vote | null;
}
