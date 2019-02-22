/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArticleDigestActionsArticle
// ====================================================

export interface ArticleDigestActionsArticle_author {
  __typename: "User";
  id: string;
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface ArticleDigestActionsArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface ArticleDigestActionsArticle {
  __typename: "Article";
  topicScore: number | null;
  author: ArticleDigestActionsArticle_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: ArticleDigestActionsArticle_comments;
  id: string;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}
