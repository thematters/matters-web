/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SidebarDigestArticle
// ====================================================

export interface SidebarDigestArticle_author {
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

export interface SidebarDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface SidebarDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  author: SidebarDigestArticle_author;
  mediaHash: string | null;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: SidebarDigestArticle_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}
