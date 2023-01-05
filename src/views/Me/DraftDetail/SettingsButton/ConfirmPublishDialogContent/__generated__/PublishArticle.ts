/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PublishArticle
// ====================================================

export interface PublishArticle_publishArticle {
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

export interface PublishArticle {
  /**
   * Publish an article onto IPFS.
   */
  publishArticle: PublishArticle_publishArticle;
}

export interface PublishArticleVariables {
  id: string;
}
