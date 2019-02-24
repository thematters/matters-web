/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RetryPublish
// ====================================================

export interface RetryPublish_retryPublish {
  __typename: "Draft";
  id: string;
  scheduledAt: any | null;
  publishState: PublishState;
}

export interface RetryPublish {
  retryPublish: RetryPublish_retryPublish;
}

export interface RetryPublishVariables {
  id: string;
}
