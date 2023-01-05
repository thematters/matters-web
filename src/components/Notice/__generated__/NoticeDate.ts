/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NoticeDate
// ====================================================

export interface NoticeDate {
  __typename: "ArticleArticleNotice" | "ArticleNotice" | "ArticleTagNotice" | "CircleNotice" | "CommentCommentNotice" | "CommentNotice" | "CryptoNotice" | "OfficialAnnouncementNotice" | "TagNotice" | "TransactionNotice" | "UserNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
}
