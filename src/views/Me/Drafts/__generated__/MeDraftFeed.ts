/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

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
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Draft title.
   */
  title: string | null;
  /**
   * Slugified draft title.
   */
  slug: string;
  /**
   * Last time of this draft was upadted.
   */
  updatedAt: any;
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
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Drafts authored by current user.
   */
  drafts: MeDraftFeed_viewer_drafts;
}

export interface MeDraftFeed {
  viewer: MeDraftFeed_viewer | null;
}

export interface MeDraftFeedVariables {
  after?: string | null;
}
