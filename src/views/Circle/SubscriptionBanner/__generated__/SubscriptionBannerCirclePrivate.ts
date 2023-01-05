/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: SubscriptionBannerCirclePrivate
// ====================================================

export interface SubscriptionBannerCirclePrivate_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface SubscriptionBannerCirclePrivate_invitedBy {
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

export interface SubscriptionBannerCirclePrivate {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: SubscriptionBannerCirclePrivate_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: SubscriptionBannerCirclePrivate_invitedBy | null;
}
