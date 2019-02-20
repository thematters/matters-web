/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedDigestArticle
// ====================================================

export interface FeedDigestArticle_author {
  __typename: "User";
  userName: string;
  id: string;
  /**
   * Display name on profile
   */
  displayName: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface FeedDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface FeedDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: FeedDigestArticle_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: FeedDigestArticle_comments;
}
