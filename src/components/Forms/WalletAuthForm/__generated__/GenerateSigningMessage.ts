/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateSigningMessageInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: GenerateSigningMessage
// ====================================================

export interface GenerateSigningMessage_generateSigningMessage {
  __typename: "SigningMessageResult";
  nonce: string;
  signingMessage: string;
  createdAt: any;
  expiredAt: any;
}

export interface GenerateSigningMessage {
  /**
   * Get signing message.
   */
  generateSigningMessage: GenerateSigningMessage_generateSigningMessage;
}

export interface GenerateSigningMessageVariables {
  input: GenerateSigningMessageInput;
}
