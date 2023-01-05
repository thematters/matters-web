/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetSupportRequestReply
// ====================================================

export interface SetSupportRequestReply_putDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * creator message asking for support
   */
  requestForDonation: string | null;
  /**
   * creator message after support
   */
  replyToDonator: string | null;
}

export interface SetSupportRequestReply {
  /**
   * Create or update a draft.
   */
  putDraft: SetSupportRequestReply_putDraft;
}

export interface SetSupportRequestReplyVariables {
  id: string;
  requestForDonation?: any | null;
  replyToDonator?: any | null;
}
