/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ViewerNotificationCircleSettings
// ====================================================

export interface ViewerNotificationCircleSettings_viewer_settings_notification {
  __typename: "NotificationSetting";
  enable: boolean;
  /**
   * for circle owners
   */
  circleNewSubscriber: boolean;
  circleNewFollower: boolean;
  circleNewUnsubscriber: boolean;
  circleMemberNewBroadcastReply: boolean;
  circleMemberNewDiscussion: boolean;
  circleMemberNewDiscussionReply: boolean;
  /**
   * for circle members & followers
   */
  inCircleNewArticle: boolean;
  inCircleNewBroadcast: boolean;
  inCircleNewBroadcastReply: boolean;
  inCircleNewDiscussion: boolean;
  inCircleNewDiscussionReply: boolean;
}

export interface ViewerNotificationCircleSettings_viewer_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
  /**
   * Notification settings.
   */
  notification: ViewerNotificationCircleSettings_viewer_settings_notification | null;
}

export interface ViewerNotificationCircleSettings_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: ViewerNotificationCircleSettings_viewer_settings;
}

export interface ViewerNotificationCircleSettings {
  viewer: ViewerNotificationCircleSettings_viewer | null;
}
