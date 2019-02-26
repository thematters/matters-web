/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeCommentFeed
// ====================================================

export interface MeCommentFeed_viewer_commentedArticles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeCommentFeed_viewer_commentedArticles_edges_node_author {
  __typename: "User";
  id: string;
  userName: string | null;
}

export interface MeCommentFeed_viewer_commentedArticles_edges_node_comments_edges_node_author {
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

export interface MeCommentFeed_viewer_commentedArticles_edges_node_comments_edges_node {
  __typename: "Comment";
  id: string;
  content: string | null;
  author: MeCommentFeed_viewer_commentedArticles_edges_node_comments_edges_node_author;
  createdAt: any;
  upvotes: number;
  myVote: Vote | null;
  downvotes: number;
}

export interface MeCommentFeed_viewer_commentedArticles_edges_node_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: MeCommentFeed_viewer_commentedArticles_edges_node_comments_edges_node;
}

export interface MeCommentFeed_viewer_commentedArticles_edges_node_comments {
  __typename: "CommentConnection";
  edges: MeCommentFeed_viewer_commentedArticles_edges_node_comments_edges[] | null;
}

export interface MeCommentFeed_viewer_commentedArticles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  author: MeCommentFeed_viewer_commentedArticles_edges_node_author;
  mediaHash: string | null;
  comments: MeCommentFeed_viewer_commentedArticles_edges_node_comments;
}

export interface MeCommentFeed_viewer_commentedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: MeCommentFeed_viewer_commentedArticles_edges_node;
}

export interface MeCommentFeed_viewer_commentedArticles {
  __typename: "ArticleConnection";
  pageInfo: MeCommentFeed_viewer_commentedArticles_pageInfo;
  edges: MeCommentFeed_viewer_commentedArticles_edges[] | null;
}

export interface MeCommentFeed_viewer {
  __typename: "User";
  id: string;
  /**
   * Comments posted by this user
   */
  commentedArticles: MeCommentFeed_viewer_commentedArticles;
}

export interface MeCommentFeed {
  viewer: MeCommentFeed_viewer | null;
}

export interface MeCommentFeedVariables {
  cursor?: string | null;
  viewerId?: string | null;
}
