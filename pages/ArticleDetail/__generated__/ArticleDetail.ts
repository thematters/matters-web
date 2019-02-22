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
  userName: string | null;
  /**
   * Display name on profile
   */
  displayName: string | null;
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

export interface ArticleDetail_article_tags {
  __typename: "Tag";
  id: string;
  content: string;
}

export interface ArticleDetail_article_appreciators_edges_node {
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

export interface ArticleDetail_article_appreciators_edges {
  __typename: "UserEdge";
  cursor: string;
  node: ArticleDetail_article_appreciators_edges_node;
}

export interface ArticleDetail_article_appreciators {
  __typename: "UserConnection";
  totalCount: number;
  edges: ArticleDetail_article_appreciators_edges[] | null;
}

export interface ArticleDetail_article_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface ArticleDetail_article_relatedArticles_edges_node_author {
  __typename: "User";
  id: string;
  userName: string | null;
}

export interface ArticleDetail_article_relatedArticles_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface ArticleDetail_article_relatedArticles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  mediaHash: string | null;
  author: ArticleDetail_article_relatedArticles_edges_node_author;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: ArticleDetail_article_relatedArticles_edges_node_comments;
}

export interface ArticleDetail_article_relatedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: ArticleDetail_article_relatedArticles_edges_node;
}

export interface ArticleDetail_article_relatedArticles {
  __typename: "ArticleConnection";
  edges: ArticleDetail_article_relatedArticles_edges[] | null;
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
  content: string;
  tags: ArticleDetail_article_tags[] | null;
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
  appreciators: ArticleDetail_article_appreciators;
  comments: ArticleDetail_article_comments;
  relatedArticles: ArticleDetail_article_relatedArticles;
}

export interface ArticleDetail {
  article: ArticleDetail_article | null;
}

export interface ArticleDetailVariables {
  mediaHash: string;
}
