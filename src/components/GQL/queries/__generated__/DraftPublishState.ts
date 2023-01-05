/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DraftPublishState
// ====================================================

export interface DraftPublishState_node_Article {
  __typename: "Article" | "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter";
}

export interface DraftPublishState_node_Draft_article_author {
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

export interface DraftPublishState_node_Draft_article {
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
  author: DraftPublishState_node_Draft_article_author;
}

export interface DraftPublishState_node_Draft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * Published article
   */
  article: DraftPublishState_node_Draft_article | null;
}

export type DraftPublishState_node = DraftPublishState_node_Article | DraftPublishState_node_Draft;

export interface DraftPublishState {
  node: DraftPublishState_node | null;
}

export interface DraftPublishStateVariables {
  id: string;
}
