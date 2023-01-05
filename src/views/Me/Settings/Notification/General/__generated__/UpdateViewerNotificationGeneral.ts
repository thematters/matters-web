/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationSettingType } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateViewerNotificationGeneral
// ====================================================

export interface UpdateViewerNotificationGeneral_updateNotificationSetting_settings_notification {
  __typename: "NotificationSetting";
  enable: boolean;
  mention: boolean;
  userNewFollower: boolean;
  articleNewComment: boolean;
  articleNewAppreciation: boolean;
  articleNewSubscription: boolean;
  articleCommentPinned: boolean;
  articleNewCollected: boolean;
}

export interface UpdateViewerNotificationGeneral_updateNotificationSetting_settings {
  __typename: "UserSettings";
  /**
   * Notification settings.
   */
  notification: UpdateViewerNotificationGeneral_updateNotificationSetting_settings_notification | null;
}

export interface UpdateViewerNotificationGeneral_updateNotificationSetting {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: UpdateViewerNotificationGeneral_updateNotificationSetting_settings;
}

export interface UpdateViewerNotificationGeneral {
  /**
   * Update user notification settings.
   */
  updateNotificationSetting: UpdateViewerNotificationGeneral_updateNotificationSetting;
}

export interface UpdateViewerNotificationGeneralVariables {
  type: NotificationSettingType;
  enabled: boolean;
}
