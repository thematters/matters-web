/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PutTagInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: PutTag
// ====================================================

export interface PutTag_putTag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Description of this tag.
   */
  description: string | null;
}

export interface PutTag {
  /**
   * Create or update tag.
   */
  putTag: PutTag_putTag;
}

export interface PutTagVariables {
  input: PutTagInput;
}
