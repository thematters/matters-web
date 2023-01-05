/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscribeCircleInput } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SubscribeCircle
// ====================================================

export interface SubscribeCircle_subscribeCircle_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
}

export interface SubscribeCircle_subscribeCircle {
  __typename: "SubscribeCircleResult";
  circle: SubscribeCircle_subscribeCircle_circle;
  /**
   * client secret for SetupIntent.
   */
  client_secret: string | null;
}

export interface SubscribeCircle {
  /**
   * Subscribe a Circle.
   */
  subscribeCircle: SubscribeCircle_subscribeCircle;
}

export interface SubscribeCircleVariables {
  input: SubscribeCircleInput;
}
