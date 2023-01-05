/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationSettingType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateViewerNotification
// ====================================================

export interface UpdateViewerNotification_updateNotificationSetting_settings_notification {
  __typename: "NotificationSetting";
  enable: boolean;
  email: boolean;
}

export interface UpdateViewerNotification_updateNotificationSetting_settings {
  __typename: "UserSettings";
  /**
   * Notification settings.
   */
  notification: UpdateViewerNotification_updateNotificationSetting_settings_notification | null;
}

export interface UpdateViewerNotification_updateNotificationSetting {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: UpdateViewerNotification_updateNotificationSetting_settings;
}

export interface UpdateViewerNotification {
  /**
   * Update user notification settings.
   */
  updateNotificationSetting: UpdateViewerNotification_updateNotificationSetting;
}

export interface UpdateViewerNotificationVariables {
  type: NotificationSettingType;
  enabled: boolean;
}
