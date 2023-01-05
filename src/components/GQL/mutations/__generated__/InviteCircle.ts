/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteCircleInvitee } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: InviteCircle
// ====================================================

export interface InviteCircle_invite {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
}

export interface InviteCircle {
  /**
   * Invite others to join circle
   */
  invite: InviteCircle_invite[] | null;
}

export interface InviteCircleVariables {
  circleId: string;
  freePeriod: any;
  invitees: InviteCircleInvitee[];
}
