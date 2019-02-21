/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ArticleState } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleDetail
// ====================================================

export interface ArticleDetail_article_author_info {
  __typename: "UserInfo";
  /**
   * User desciption
   */
  description: string | null;
}

export interface ArticleDetail_article_author {
  __typename: "User";
  id: string;
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  info: ArticleDetail_article_author_info;
  /**
   * URL for avatar
   */
  avatar: any | null;
  /**
   * This user is following viewer
   */
  isFollower: boolean;
  /**
   * Viewer is following this user
   */
  isFollowee: boolean;
}

export interface ArticleDetail_article {
  __typename: "Article";
  id: string;
  title: string;
  state: ArticleState;
  public: boolean;
  live: boolean;
  createdAt: any;
  author: ArticleDetail_article_author;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  content: string;
}

export interface ArticleDetail {
  article: ArticleDetail_article | null;
}

export interface ArticleDetailVariables {
  mediaHash: string;
}
