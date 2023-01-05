/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDraft
// ====================================================

export interface CreateDraft_putDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Slugified draft title.
   */
  slug: string;
}

export interface CreateDraft {
  /**
   * Create or update a draft.
   */
  putDraft: CreateDraft_putDraft;
}

export interface CreateDraftVariables {
  title: string;
  tags?: string[] | null;
}
