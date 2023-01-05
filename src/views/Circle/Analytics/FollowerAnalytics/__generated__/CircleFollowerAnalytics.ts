/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleFollowerAnalytics
// ====================================================

export interface CircleFollowerAnalytics_circle_analytics_follower_history {
  __typename: "MonthlyDatum";
  value: number;
  date: any;
}

export interface CircleFollowerAnalytics_circle_analytics_follower {
  __typename: "CircleFollowerAnalytics";
  /**
   * subscriber count history of last 4 months
   */
  history: CircleFollowerAnalytics_circle_analytics_follower_history[];
  /**
   * current follower count
   */
  current: number;
  /**
   * the percentage of follower count in reader count of circle articles
   */
  followerPercentage: number;
}

export interface CircleFollowerAnalytics_circle_analytics {
  __typename: "CircleAnalytics";
  follower: CircleFollowerAnalytics_circle_analytics_follower;
}

export interface CircleFollowerAnalytics_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Analytics dashboard.
   */
  analytics: CircleFollowerAnalytics_circle_analytics;
}

export interface CircleFollowerAnalytics {
  circle: CircleFollowerAnalytics_circle | null;
}

export interface CircleFollowerAnalyticsVariables {
  name: string;
}
