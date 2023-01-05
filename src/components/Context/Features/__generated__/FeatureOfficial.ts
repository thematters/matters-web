/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeatureName } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FeatureOfficial
// ====================================================

export interface FeatureOfficial_features {
  __typename: "Feature";
  name: FeatureName;
  enabled: boolean;
}

export interface FeatureOfficial {
  __typename: "Official";
  /**
   * Feature flag
   */
  features: FeatureOfficial_features[];
}
