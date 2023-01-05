/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: EditModeArticleAssets
// ====================================================

export interface EditModeArticleAssets_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface EditModeArticleAssets_article_Article_assets {
  __typename: "Asset";
  /**
   * Unique ID of this Asset.
   */
  id: string;
  /**
   * Types of this asset.
   */
  type: AssetType;
  /**
   * Link of this asset.
   */
  path: string;
}

export interface EditModeArticleAssets_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * List of assets are belonged to this article (Only the author can access currently).
   */
  assets: EditModeArticleAssets_article_Article_assets[];
}

export type EditModeArticleAssets_article = EditModeArticleAssets_article_User | EditModeArticleAssets_article_Article;

export interface EditModeArticleAssets {
  article: EditModeArticleAssets_article | null;
}

export interface EditModeArticleAssetsVariables {
  id: string;
}
