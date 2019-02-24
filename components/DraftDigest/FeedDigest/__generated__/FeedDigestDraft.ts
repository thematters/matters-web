/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FeedDigestDraft
// ====================================================

export interface FeedDigestDraft {
  __typename: "Draft";
  id: string;
  title: string | null;
  summary: string | null;
  scheduledAt: any | null;
  createdAt: any;
  publishState: PublishState;
}
