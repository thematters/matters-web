/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditArticleSupportSetting
// ====================================================

export interface EditArticleSupportSetting_editArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * creator message asking for support
   */
  requestForDonation: string | null;
  /**
   * creator message after support
   */
  replyToDonator: string | null;
}

export interface EditArticleSupportSetting {
  /**
   * Edit an article.
   */
  editArticle: EditArticleSupportSetting_editArticle;
}

export interface EditArticleSupportSettingVariables {
  id: string;
  requestForDonation?: any | null;
  replyToDonator?: any | null;
}
