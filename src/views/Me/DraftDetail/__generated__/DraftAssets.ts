/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DraftAssets
// ====================================================

export interface DraftAssets_node_Article {
  __typename: "Article" | "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter";
  id: string;
}

export interface DraftAssets_node_Draft_assets {
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

export interface DraftAssets_node_Draft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * List of assets are belonged to this draft.
   */
  assets: DraftAssets_node_Draft_assets[];
}

export type DraftAssets_node = DraftAssets_node_Article | DraftAssets_node_Draft;

export interface DraftAssets {
  node: DraftAssets_node | null;
}

export interface DraftAssetsVariables {
  id: string;
}
