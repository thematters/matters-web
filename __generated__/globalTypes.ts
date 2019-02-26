/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleState {
  active = "active",
  archived = "archived",
  banned = "banned",
}

export enum PublishState {
  error = "error",
  pending = "pending",
  published = "published",
  unpublished = "unpublished",
}

export enum UserLanguage {
  en = "en",
  zh_hans = "zh_hans",
  zh_hant = "zh_hant",
}

export enum UserState {
  active = "active",
  archived = "archived",
  banned = "banned",
  frozen = "frozen",
  onboarding = "onboarding",
}

export enum Vote {
  down = "down",
  up = "up",
}

export interface UserLoginInput {
  email: any;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
