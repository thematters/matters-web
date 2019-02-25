/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DigestActionsComment
// ====================================================

export interface DigestActionsComment {
  __typename: "Comment";
  id: string;
  createdAt: any;
  upvotes: number;
  myVote: Vote | null;
  downvotes: number;
}
