/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RetryPublish
// ====================================================

export interface RetryPublish_retryPublish {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
}

export interface RetryPublish {
  /**
   * Publish an article onto IPFS.
   */
  retryPublish: RetryPublish_retryPublish;
}

export interface RetryPublishVariables {
  id: string;
}
