/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetDraftContent
// ====================================================

export interface SetDraftContent_putDraft_assets {
  __typename: "Asset";
  /**
   * Unique ID of this Asset.
   */
  id: string;
  /**
   * Types of this asset.
   */
  type: AssetType;
  /**
   * Link of this asset.
   */
  path: string;
}

export interface SetDraftContent_putDraft {
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
   * Content of this draft.
   */
  content: string | null;
  /**
   * Draft's cover link.
   */
  cover: string | null;
  /**
   * List of assets are belonged to this draft.
   */
  assets: SetDraftContent_putDraft_assets[];
  /**
   * Summary of this draft.
   */
  summary: string | null;
  /**
   * This value determines if the summary is customized or not.
   */
  summaryCustomized: boolean;
}

export interface SetDraftContent {
  /**
   * Create or update a draft.
   */
  putDraft: SetDraftContent_putDraft;
}

export interface SetDraftContentVariables {
  id: string;
  title?: string | null;
  content?: string | null;
  summary?: string | null;
}
