/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowingFeedRecommendCircleFooterPrivate
// ====================================================

export interface FollowingFeedRecommendCircleFooterPrivate_invitedBy {
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

export interface FollowingFeedRecommendCircleFooterPrivate {
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
  invitedBy: FollowingFeedRecommendCircleFooterPrivate_invitedBy | null;
}
