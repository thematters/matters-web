/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TopicsDigestArticle
// ====================================================

export interface TopicsDigestArticle_author {
  __typename: "User";
  id: string;
  userName: string;
}

export interface TopicsDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface TopicsDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  author: TopicsDigestArticle_author;
  mediaHash: string | null;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  /**
   * Viewer has appreciate
   */
  hasAppreciate: boolean;
  /**
   * limit the nuhmber of appreciate per user
   */
  appreciateLimit: number;
  appreciateLeft: number;
  comments: TopicsDigestArticle_comments;
}
