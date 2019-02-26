/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FeedDigestComment
// ====================================================

export interface FeedDigestComment_author {
  __typename: "User";
  id: string;
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface FeedDigestComment {
  __typename: "Comment";
  id: string;
  content: string | null;
  author: FeedDigestComment_author;
  createdAt: any;
  upvotes: number;
  myVote: Vote | null;
  downvotes: number;
}
