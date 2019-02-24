/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TopicsDigestArticle
// ====================================================

export interface TopicsDigestArticle_author {
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
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: TopicsDigestArticle_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}
