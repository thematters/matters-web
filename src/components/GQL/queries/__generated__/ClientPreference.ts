/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClientPreference
// ====================================================

export interface ClientPreference_clientPreference_onboardingTasks {
  __typename: "OnboardingTasks";
  enabled: boolean;
}

export interface ClientPreference_clientPreference {
  __typename: "ClientPreference";
  id: string;
  /**
   * Whether civic liker dialog is hidden
   */
  readCivicLikerDialog: boolean;
  /**
   * Login or sign up wall in article detail page
   */
  wall: boolean;
  /**
   * Log route history for page back button
   */
  routeHistory: string[] | null;
  onboardingTasks: ClientPreference_clientPreference_onboardingTasks;
  /**
   * Whether cicle banner is shown
   */
  circleBanner: boolean;
  /**
   * Whether announcement is shown
   */
  announcement: number | null;
}

export interface ClientPreference {
  clientPreference: ClientPreference_clientPreference;
}
