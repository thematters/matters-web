/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleIncomeAnalytics
// ====================================================

export interface CircleIncomeAnalytics_circle_analytics_income_history {
  __typename: "MonthlyDatum";
  value: number;
  date: any;
}

export interface CircleIncomeAnalytics_circle_analytics_income {
  __typename: "CircleIncomeAnalytics";
  /**
   * income history of last 4 months
   */
  history: CircleIncomeAnalytics_circle_analytics_income_history[];
  /**
   * income of this month
   */
  thisMonth: number;
  /**
   * income of next month
   */
  nextMonth: number;
  /**
   * total income of all time
   */
  total: number;
}

export interface CircleIncomeAnalytics_circle_analytics {
  __typename: "CircleAnalytics";
  income: CircleIncomeAnalytics_circle_analytics_income;
}

export interface CircleIncomeAnalytics_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Analytics dashboard.
   */
  analytics: CircleIncomeAnalytics_circle_analytics;
}

export interface CircleIncomeAnalytics {
  circle: CircleIncomeAnalytics_circle | null;
}

export interface CircleIncomeAnalyticsVariables {
  name: string;
}
