/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClientInfo
// ====================================================

export interface ClientInfo_clientInfo_viewportSize {
  __typename: "ViewportSize";
  width: number | null;
  height: number | null;
}

export interface ClientInfo_clientInfo {
  __typename: "ClientInfo";
  id: string;
  viewportSize: ClientInfo_clientInfo_viewportSize;
}

export interface ClientInfo {
  clientInfo: ClientInfo_clientInfo;
}
