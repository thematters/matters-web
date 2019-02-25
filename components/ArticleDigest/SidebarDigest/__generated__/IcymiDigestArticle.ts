/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IcymiDigestArticle
// ====================================================

export interface IcymiDigestArticle_author {
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

export interface IcymiDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface IcymiDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  author: IcymiDigestArticle_author;
  mediaHash: string | null;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: IcymiDigestArticle_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}
