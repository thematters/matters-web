/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Asset
// ====================================================

export interface Asset {
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
