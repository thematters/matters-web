/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagDigestFeedTag
// ====================================================

export interface TagDigestFeedTag_articles_edges_node_author {
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

export interface TagDigestFeedTag_articles_edges_node {
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
  author: TagDigestFeedTag_articles_edges_node_author;
}

export interface TagDigestFeedTag_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: TagDigestFeedTag_articles_edges_node;
}

export interface TagDigestFeedTag_articles {
  __typename: "ArticleConnection";
  edges: TagDigestFeedTag_articles_edges[] | null;
}

export interface TagDigestFeedTag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: TagDigestFeedTag_articles;
}
