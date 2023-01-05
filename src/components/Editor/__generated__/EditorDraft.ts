/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: EditorDraft
// ====================================================

export interface EditorDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Draft title.
   */
  title: string | null;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * Content of this draft.
   */
  content: string | null;
  /**
   * Summary of this draft.
   */
  summary: string | null;
  /**
   * This value determines if the summary is customized or not.
   */
  summaryCustomized: boolean;
}
