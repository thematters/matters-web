/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RelatedDigestArticle
// ====================================================

export interface RelatedDigestArticle_author {
  __typename: "User";
  id: string;
  userName: string | null;
}

export interface RelatedDigestArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface RelatedDigestArticle {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  mediaHash: string | null;
  author: RelatedDigestArticle_author;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: RelatedDigestArticle_comments;
}
