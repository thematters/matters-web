/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OfficialAnnouncementNotice
// ====================================================

export interface OfficialAnnouncementNotice {
  __typename: "OfficialAnnouncementNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * The link to a specific page if provided.
   */
  link: string | null;
  /**
   * The message content.
   */
  message: string;
}
