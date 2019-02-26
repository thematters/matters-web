/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserArticleFeed
// ====================================================

export interface UserArticleFeed_user_articles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserArticleFeed_user_articles_edges_node_author {
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

export interface UserArticleFeed_user_articles_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface UserArticleFeed_user_articles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: UserArticleFeed_user_articles_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: UserArticleFeed_user_articles_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface UserArticleFeed_user_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: UserArticleFeed_user_articles_edges_node;
}

export interface UserArticleFeed_user_articles {
  __typename: "ArticleConnection";
  pageInfo: UserArticleFeed_user_articles_pageInfo;
  edges: UserArticleFeed_user_articles_edges[] | null;
}

export interface UserArticleFeed_user {
  __typename: "User";
  id: string;
  /**
   * Display name on profile
   */
  displayName: string | null;
  /**
   * Articles written by this user
   */
  articles: UserArticleFeed_user_articles;
}

export interface UserArticleFeed {
  user: UserArticleFeed_user | null;
}

export interface UserArticleFeedVariables {
  userName: string;
  cursor?: string | null;
  hasArticleDigestActionAuthor?: boolean | null;
  hasArticleDigestActionDateTime?: boolean | null;
}
