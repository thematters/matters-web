/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: SupportWidgetArticlePrivate
// ====================================================

export interface SupportWidgetArticlePrivate_access_circle_invitedBy {
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

export interface SupportWidgetArticlePrivate_access_circle {
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
  invitedBy: SupportWidgetArticlePrivate_access_circle_invitedBy | null;
}

export interface SupportWidgetArticlePrivate_access {
  __typename: "ArticleAccess";
  circle: SupportWidgetArticlePrivate_access_circle | null;
}

export interface SupportWidgetArticlePrivate {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Access related fields on circle
   */
  access: SupportWidgetArticlePrivate_access;
}
