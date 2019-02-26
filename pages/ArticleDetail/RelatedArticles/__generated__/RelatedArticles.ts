/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RelatedArticles
// ====================================================

export interface RelatedArticles_relatedArticles_edges_node_author {
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

export interface RelatedArticles_relatedArticles_edges_node_comments {
  __typename: "CommentConnection";
  totalCount: number;
}

export interface RelatedArticles_relatedArticles_edges_node {
  __typename: "Article";
  id: string;
  title: string;
  slug: string;
  cover: any | null;
  mediaHash: string | null;
  author: RelatedArticles_relatedArticles_edges_node_author;
  createdAt: any;
  /**
   * MAT recieved for this article
   */
  MAT: number;
  comments: RelatedArticles_relatedArticles_edges_node_comments;
  /**
   * Viewer has subscribed
   */
  subscribed: boolean;
  topicScore: number | null;
}

export interface RelatedArticles_relatedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: RelatedArticles_relatedArticles_edges_node;
}

export interface RelatedArticles_relatedArticles {
  __typename: "ArticleConnection";
  edges: RelatedArticles_relatedArticles_edges[] | null;
}

export interface RelatedArticles {
  __typename: "Article";
  relatedArticles: RelatedArticles_relatedArticles;
}
