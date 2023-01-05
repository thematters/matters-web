/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ViewerNotificationGeneralSettings
// ====================================================

export interface ViewerNotificationGeneralSettings_viewer_settings_notification {
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

export interface ViewerNotificationGeneralSettings_viewer_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
  /**
   * Notification settings.
   */
  notification: ViewerNotificationGeneralSettings_viewer_settings_notification | null;
}

export interface ViewerNotificationGeneralSettings_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User settings.
   */
  settings: ViewerNotificationGeneralSettings_viewer_settings;
}

export interface ViewerNotificationGeneralSettings {
  viewer: ViewerNotificationGeneralSettings_viewer | null;
}
