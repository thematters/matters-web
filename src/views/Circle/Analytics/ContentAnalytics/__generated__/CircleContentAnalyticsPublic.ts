/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleContentAnalyticsPublic
// ====================================================

export interface CircleContentAnalyticsPublic_circle_analytics_content_public_node_author {
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

export interface CircleContentAnalyticsPublic_circle_analytics_content_public_node {
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
  author: CircleContentAnalyticsPublic_circle_analytics_content_public_node_author;
}

export interface CircleContentAnalyticsPublic_circle_analytics_content_public {
  __typename: "CircleContentAnalyticsDatum";
  node: CircleContentAnalyticsPublic_circle_analytics_content_public_node;
  readCount: number;
}

export interface CircleContentAnalyticsPublic_circle_analytics_content {
  __typename: "CircleContentAnalytics";
  public: CircleContentAnalyticsPublic_circle_analytics_content_public[] | null;
}

export interface CircleContentAnalyticsPublic_circle_analytics {
  __typename: "CircleAnalytics";
  content: CircleContentAnalyticsPublic_circle_analytics_content;
}

export interface CircleContentAnalyticsPublic_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Analytics dashboard.
   */
  analytics: CircleContentAnalyticsPublic_circle_analytics;
}

export interface CircleContentAnalyticsPublic {
  circle: CircleContentAnalyticsPublic_circle | null;
}

export interface CircleContentAnalyticsPublicVariables {
  name: string;
}
