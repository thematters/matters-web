/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: EditModeArticleDrafts
// ====================================================

export interface EditModeArticleDrafts_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface EditModeArticleDrafts_article_Article_tags {
  __typename: "Tag";
  /**
   * Content of this tag.
   */
  content: string;
}

export interface EditModeArticleDrafts_article_Article_drafts {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this draft.
   */
  mediaHash: string | null;
  /**
   * Tags are attached to this draft.
   */
  tags: string[] | null;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * Draft title.
   */
  title: string | null;
  /**
   * Content of this draft.
   */
  content: string | null;
  /**
   * Summary of this draft.
   */
  summary: string | null;
  /**
   * This value determines if the summary is customized or not.
   */
  summaryCustomized: boolean;
}

export interface EditModeArticleDrafts_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Content of this article.
   */
  content: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Tags attached to this article.
   */
  tags: EditModeArticleDrafts_article_Article_tags[] | null;
  /**
   * Drafts linked to this article.
   */
  drafts: EditModeArticleDrafts_article_Article_drafts[] | null;
}

export type EditModeArticleDrafts_article = EditModeArticleDrafts_article_User | EditModeArticleDrafts_article_Article;

export interface EditModeArticleDrafts {
  article: EditModeArticleDrafts_article | null;
}

export interface EditModeArticleDraftsVariables {
  id: string;
}
