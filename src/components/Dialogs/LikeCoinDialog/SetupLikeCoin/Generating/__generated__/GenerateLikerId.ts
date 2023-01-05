/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: GenerateLikerId
// ====================================================

export interface GenerateLikerId_generateLikerId_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
}

export interface GenerateLikerId_generateLikerId_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface GenerateLikerId_generateLikerId {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: GenerateLikerId_generateLikerId_liker;
  /**
   * Status of current user.
   */
  status: GenerateLikerId_generateLikerId_status | null;
}

export interface GenerateLikerId {
  /**
   * Generate or claim a Liker ID through LikeCoin
   */
  generateLikerId: GenerateLikerId_generateLikerId;
}
