/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: RecallPublish
// ====================================================

export interface RecallPublish_recallPublish {
  __typename: "Draft";
  id: string;
  scheduledAt: any | null;
  publishState: PublishState;
}

export interface RecallPublish {
  recallPublish: RecallPublish_recallPublish;
}

export interface RecallPublishVariables {
  id: string;
}
