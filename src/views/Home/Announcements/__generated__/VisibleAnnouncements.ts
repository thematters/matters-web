/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AnnouncementsInput, AnnouncementType, UserLanguage } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: VisibleAnnouncements
// ====================================================

export interface VisibleAnnouncements_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface VisibleAnnouncements_official_announcements_translations {
  __typename: "TranslatedAnnouncement";
  language: UserLanguage;
  title: string | null;
  cover: string | null;
  content: string | null;
  link: any | null;
}

export interface VisibleAnnouncements_official_announcements {
  __typename: "Announcement";
  id: string;
  title: string | null;
  cover: string | null;
  content: string | null;
  link: string | null;
  type: AnnouncementType;
  visible: boolean;
  createdAt: any;
  translations: VisibleAnnouncements_official_announcements_translations[] | null;
}

export interface VisibleAnnouncements_official {
  __typename: "Official";
  /**
   * Announcements
   */
  announcements: VisibleAnnouncements_official_announcements[] | null;
}

export interface VisibleAnnouncements {
  viewer: VisibleAnnouncements_viewer | null;
  official: VisibleAnnouncements_official;
}

export interface VisibleAnnouncementsVariables {
  input: AnnouncementsInput;
}
