/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleSubscriberAnalytics
// ====================================================

export interface CircleSubscriberAnalytics_circle_analytics_subscriber_subscriberHistory {
  __typename: "MonthlyDatum";
  value: number;
  date: any;
}

export interface CircleSubscriberAnalytics_circle_analytics_subscriber_inviteeHistory {
  __typename: "MonthlyDatum";
  value: number;
  date: any;
}

export interface CircleSubscriberAnalytics_circle_analytics_subscriber {
  __typename: "CircleSubscriberAnalytics";
  /**
   * subscriber count history of last 4 months
   */
  subscriberHistory: CircleSubscriberAnalytics_circle_analytics_subscriber_subscriberHistory[];
  /**
   * invitee count history of last 4 months
   */
  inviteeHistory: CircleSubscriberAnalytics_circle_analytics_subscriber_inviteeHistory[];
  /**
   * current subscriber count
   */
  currentSubscriber: number;
  /**
   * current invitee count
   */
  currentInvitee: number;
}

export interface CircleSubscriberAnalytics_circle_analytics {
  __typename: "CircleAnalytics";
  subscriber: CircleSubscriberAnalytics_circle_analytics_subscriber;
}

export interface CircleSubscriberAnalytics_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Analytics dashboard.
   */
  analytics: CircleSubscriberAnalytics_circle_analytics;
}

export interface CircleSubscriberAnalytics {
  circle: CircleSubscriberAnalytics_circle | null;
}

export interface CircleSubscriberAnalyticsVariables {
  name: string;
}
