/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MigrationInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Migration
// ====================================================

export interface Migration {
  /**
   * Migrate articles from other service provider.
   */
  migration: boolean | null;
}

export interface MigrationVariables {
  input: MigrationInput;
}
