/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleContentAnalyticsPaywall
// ====================================================

export interface CircleContentAnalyticsPaywall_circle_analytics_content_paywall_node_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface CircleContentAnalyticsPaywall_circle_analytics_content_paywall_node {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Author of this article.
   */
  author: CircleContentAnalyticsPaywall_circle_analytics_content_paywall_node_author;
}

export interface CircleContentAnalyticsPaywall_circle_analytics_content_paywall {
  __typename: "CircleContentAnalyticsDatum";
  node: CircleContentAnalyticsPaywall_circle_analytics_content_paywall_node;
  readCount: number;
}

export interface CircleContentAnalyticsPaywall_circle_analytics_content {
  __typename: "CircleContentAnalytics";
  paywall: CircleContentAnalyticsPaywall_circle_analytics_content_paywall[] | null;
}

export interface CircleContentAnalyticsPaywall_circle_analytics {
  __typename: "CircleAnalytics";
  content: CircleContentAnalyticsPaywall_circle_analytics_content;
}

export interface CircleContentAnalyticsPaywall_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Analytics dashboard.
   */
  analytics: CircleContentAnalyticsPaywall_circle_analytics;
}

export interface CircleContentAnalyticsPaywall {
  circle: CircleContentAnalyticsPaywall_circle | null;
}

export interface CircleContentAnalyticsPaywallVariables {
  name: string;
}
