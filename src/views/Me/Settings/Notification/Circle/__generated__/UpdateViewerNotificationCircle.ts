/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationSettingType } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateViewerNotificationCircle
// ====================================================

export interface UpdateViewerNotificationCircle_updateNotificationSetting_settings_notification {
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

export interface UpdateViewerNotificationCircle_updateNotificationSetting_settings {
  __typename: "UserSettings";
  /**
   * Notification settings.
   */
  notification: UpdateViewerNotificationCircle_updateNotificationSetting_settings_notification | null;
}

export interface UpdateViewerNotificationCircle_updateNotificationSetting {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: UpdateViewerNotificationCircle_updateNotificationSetting_settings;
}

export interface UpdateViewerNotificationCircle {
  /**
   * Update user notification settings.
   */
  updateNotificationSetting: UpdateViewerNotificationCircle_updateNotificationSetting;
}

export interface UpdateViewerNotificationCircleVariables {
  type: NotificationSettingType;
  enabled: boolean;
}
