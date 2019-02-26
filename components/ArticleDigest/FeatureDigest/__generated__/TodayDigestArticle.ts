/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TodayDigestArticle
// ====================================================

export interface TodayDigestArticle_author {
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

export interface TodayDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface TodayDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: TodayDigestArticle_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: TodayDigestArticle_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
  topicScore: number | null;
}
