/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeDraftFeed
// ====================================================

export interface MeDraftFeed_viewer_drafts_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeDraftFeed_viewer_drafts_edges_node {
  __typename: "Draft";
  id: string;
  title: string | null;
  summary: string | null;
  scheduledAt: any | null;
  createdAt: any;
  publishState: PublishState;
}

export interface MeDraftFeed_viewer_drafts_edges {
  __typename: "DraftEdge";
  cursor: string;
  node: MeDraftFeed_viewer_drafts_edges_node;
}

export interface MeDraftFeed_viewer_drafts {
  __typename: "DraftConnection";
  pageInfo: MeDraftFeed_viewer_drafts_pageInfo;
  edges: MeDraftFeed_viewer_drafts_edges[] | null;
}

export interface MeDraftFeed_viewer {
  __typename: "User";
  id: string;
  drafts: MeDraftFeed_viewer_drafts;
}

export interface MeDraftFeed {
  viewer: MeDraftFeed_viewer | null;
}

export interface MeDraftFeedVariables {
  cursor?: string | null;
}
