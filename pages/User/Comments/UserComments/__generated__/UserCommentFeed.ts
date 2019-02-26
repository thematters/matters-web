/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserCommentFeed
// ====================================================

export interface UserCommentFeed_node_Article {
  __typename: "Article" | "Tag" | "Draft" | "Comment";
}

export interface UserCommentFeed_node_User_commentedArticles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserCommentFeed_node_User_commentedArticles_edges_node_author {
  __typename: "User";
  id: string;
  userName: string | null;
}

export interface UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node_author {
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

export interface UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node {
  __typename: "Comment";
  id: string;
  content: string | null;
  author: UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node_author;
  createdAt: any;
  upvotes: number;
  myVote: Vote | null;
  downvotes: number;
}

export interface UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges_node;
}

export interface UserCommentFeed_node_User_commentedArticles_edges_node_comments {
  __typename: "CommentConnection";
  edges: UserCommentFeed_node_User_commentedArticles_edges_node_comments_edges[] | null;
}

export interface UserCommentFeed_node_User_commentedArticles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  author: UserCommentFeed_node_User_commentedArticles_edges_node_author;
  mediaHash: string | null;
  comments: UserCommentFeed_node_User_commentedArticles_edges_node_comments;
}

export interface UserCommentFeed_node_User_commentedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: UserCommentFeed_node_User_commentedArticles_edges_node;
}

export interface UserCommentFeed_node_User_commentedArticles {
  __typename: "ArticleConnection";
  pageInfo: UserCommentFeed_node_User_commentedArticles_pageInfo;
  edges: UserCommentFeed_node_User_commentedArticles_edges[] | null;
}

export interface UserCommentFeed_node_User {
  __typename: "User";
  id: string;
  /**
   * Comments posted by this user
   */
  commentedArticles: UserCommentFeed_node_User_commentedArticles;
}

export type UserCommentFeed_node = UserCommentFeed_node_Article | UserCommentFeed_node_User;

export interface UserCommentFeed {
  node: UserCommentFeed_node | null;
}

export interface UserCommentFeedVariables {
  id: string;
  cursor?: string | null;
}
