/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchAggregateArticlesPublic
// ====================================================

export interface SearchAggregateArticlesPublic_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchAggregateArticlesPublic_search_edges_node_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchAggregateArticlesPublic_search_edges_node_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface SearchAggregateArticlesPublic_search_edges_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: SearchAggregateArticlesPublic_search_edges_node_Article_author;
}

export type SearchAggregateArticlesPublic_search_edges_node = SearchAggregateArticlesPublic_search_edges_node_User | SearchAggregateArticlesPublic_search_edges_node_Article;

export interface SearchAggregateArticlesPublic_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SearchAggregateArticlesPublic_search_edges_node;
}

export interface SearchAggregateArticlesPublic_search {
  __typename: "SearchResultConnection";
  pageInfo: SearchAggregateArticlesPublic_search_pageInfo;
  edges: SearchAggregateArticlesPublic_search_edges[] | null;
}

export interface SearchAggregateArticlesPublic {
  search: SearchAggregateArticlesPublic_search;
}

export interface SearchAggregateArticlesPublicVariables {
  key: string;
}
