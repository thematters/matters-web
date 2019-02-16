/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentCountArticle
// ====================================================

export interface CommentCountArticle_comments {
  __typename: 'CommentConnection'
  totalCount: number
}

export interface CommentCountArticle {
  __typename: 'Article'
  comments: CommentCountArticle_comments
}
