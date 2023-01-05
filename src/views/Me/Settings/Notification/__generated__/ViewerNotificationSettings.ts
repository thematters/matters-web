/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ViewerNotificationSettings
// ====================================================

export interface ViewerNotificationSettings_viewer_settings_notification {
  __typename: "NotificationSetting";
  enable: boolean;
  email: boolean;
}

export interface ViewerNotificationSettings_viewer_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
  /**
   * Notification settings.
   */
  notification: ViewerNotificationSettings_viewer_settings_notification | null;
}

export interface ViewerNotificationSettings_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: ViewerNotificationSettings_viewer_settings;
}

export interface ViewerNotificationSettings {
  viewer: ViewerNotificationSettings_viewer | null;
}
