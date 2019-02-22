/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IcymiDigestArticle
// ====================================================

export interface IcymiDigestArticle_author {
  __typename: "User";
  id: string;
  userName: string;
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
  comments: IcymiDigestArticle_comments;
}
