/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerDrafts
// ====================================================

export interface ViewerDrafts_viewer_drafts_edges_node {
  __typename: "Draft";
  id: string;
}

export interface ViewerDrafts_viewer_drafts_edges {
  __typename: "DraftEdge";
  cursor: string;
  node: ViewerDrafts_viewer_drafts_edges_node;
}

export interface ViewerDrafts_viewer_drafts {
  __typename: "DraftConnection";
  edges: ViewerDrafts_viewer_drafts_edges[] | null;
}

export interface ViewerDrafts_viewer {
  __typename: "User";
  id: string;
  drafts: ViewerDrafts_viewer_drafts;
}

export interface ViewerDrafts {
  viewer: ViewerDrafts_viewer | null;
}
