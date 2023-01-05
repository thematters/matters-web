/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OAuthClientInfo
// ====================================================

export interface OAuthClientInfo_oauthClient {
  __typename: "OAuthClient";
  /**
   * Unique Client ID of this OAuth Client.
   */
  id: string;
  /**
   * App name
   */
  name: string;
  /**
   * URL for oauth client's avatar.
   */
  avatar: string | null;
  /**
   * URL for oauth client's official website
   */
  website: string | null;
  /**
   * Scopes
   */
  scope: string[] | null;
}

export interface OAuthClientInfo {
  oauthClient: OAuthClientInfo_oauthClient | null;
}

export interface OAuthClientInfoVariables {
  id: string;
}
