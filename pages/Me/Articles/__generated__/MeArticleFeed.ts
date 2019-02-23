/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeArticleFeed
// ====================================================

export interface MeArticleFeed_viewer_articles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeArticleFeed_viewer_articles_edges_node_author {
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

export interface MeArticleFeed_viewer_articles_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface MeArticleFeed_viewer_articles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  summary: string;
  mediaHash: string | null;
  author: MeArticleFeed_viewer_articles_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: MeArticleFeed_viewer_articles_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
}

export interface MeArticleFeed_viewer_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: MeArticleFeed_viewer_articles_edges_node;
}

export interface MeArticleFeed_viewer_articles {
  __typename: "ArticleConnection";
  pageInfo: MeArticleFeed_viewer_articles_pageInfo;
  edges: MeArticleFeed_viewer_articles_edges[] | null;
}

export interface MeArticleFeed_viewer {
  __typename: "User";
  id: string;
  /**
   * Articles written by this user
   */
  articles: MeArticleFeed_viewer_articles;
}

export interface MeArticleFeed {
  viewer: MeArticleFeed_viewer | null;
}

export interface MeArticleFeedVariables {
  cursor?: string | null;
}
