/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SingleFileUploadInput, AssetType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SingleFileUpload
// ====================================================

export interface SingleFileUpload_singleFileUpload {
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

export interface SingleFileUpload {
  /**
   * Upload a single file.
   */
  singleFileUpload: SingleFileUpload_singleFileUpload;
}

export interface SingleFileUploadVariables {
  input: SingleFileUploadInput;
}
