/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeatureName } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Official
// ====================================================

export interface Official_features {
  __typename: "Feature";
  name: FeatureName;
  enabled: boolean;
}

export interface Official {
  __typename: "Official";
  /**
   * Feature flag
   */
  features: Official_features[];
}
