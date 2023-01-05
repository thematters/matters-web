/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleDetailPrivate
// ====================================================

export interface ArticleDetailPrivate_article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface ArticleDetailPrivate_article_access_circle_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface ArticleDetailPrivate_article_access_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: ArticleDetailPrivate_article_access_circle_invitedBy | null;
}

export interface ArticleDetailPrivate_article_access {
  __typename: "ArticleAccess";
  circle: ArticleDetailPrivate_article_access_circle | null;
}

export interface ArticleDetailPrivate_article {
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
   * Author of this article.
   */
  author: ArticleDetailPrivate_article_author;
  /**
   * Access related fields on circle
   */
  access: ArticleDetailPrivate_article_access;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
  /**
   * This value determines if current viewer has appreciated or not.
   */
  hasAppreciate: boolean;
  /**
   * Number represents how many times per user can appreciate this article.
   */
  appreciateLeft: number;
  /**
   * This value determines if current viewer can SuperLike or not.
   */
  canSuperLike: boolean;
}

export interface ArticleDetailPrivate {
  article: ArticleDetailPrivate_article | null;
}

export interface ArticleDetailPrivateVariables {
  mediaHash: string;
  includeCanSuperLike: boolean;
}
