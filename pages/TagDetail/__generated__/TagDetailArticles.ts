/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TagDetailArticles
// ====================================================

export interface TagDetailArticles_node_Article {
  __typename: "Article" | "User" | "Draft" | "Comment";
}

export interface TagDetailArticles_node_Tag_articles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface TagDetailArticles_node_Tag_articles_edges_node_author {
  __typename: "User";
  id: string;
  userName: string;
  /**
   * Display name on profile
   */
  displayName: string;
  /**
   * URL for avatar
   */
  avatar: any | null;
}

export interface TagDetailArticles_node_Tag_articles_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface TagDetailArticles_node_Tag_articles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: TagDetailArticles_node_Tag_articles_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  /**
   * Viewer has appreciate
   */
  hasAppreciate: boolean;
  comments: TagDetailArticles_node_Tag_articles_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface TagDetailArticles_node_Tag_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: TagDetailArticles_node_Tag_articles_edges_node;
}

export interface TagDetailArticles_node_Tag_articles {
  __typename: "ArticleConnection";
  pageInfo: TagDetailArticles_node_Tag_articles_pageInfo;
  edges: TagDetailArticles_node_Tag_articles_edges[] | null;
}

export interface TagDetailArticles_node_Tag {
  __typename: "Tag";
  id: string;
  content: string;
  articles: TagDetailArticles_node_Tag_articles;
}

export type TagDetailArticles_node = TagDetailArticles_node_Article | TagDetailArticles_node_Tag;

export interface TagDetailArticles {
  node: TagDetailArticles_node | null;
}

export interface TagDetailArticlesVariables {
  id: string;
  cursor?: string | null;
}
