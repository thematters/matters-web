/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentButtonArticle
// ====================================================

export interface CommentButtonArticle_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface CommentButtonArticle {
  __typename: "Article";
  comments: CommentButtonArticle_comments;
}
