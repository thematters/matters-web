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

export enum VerificationCodeType {
  email_reset = "email_reset",
  email_verify = "email_verify",
  password_reset = "password_reset",
  register = "register",
}

export enum Vote {
  down = "down",
  up = "up",
}

export interface ConfirmVerificationCodeInput {
  email: any;
  type: VerificationCodeType;
  code: string;
}

export interface ResetPasswordInput {
  password: string;
  codeId: string;
}

export interface SendVerificationCodeInput {
  email: any;
  type: VerificationCodeType;
}

export interface UserLoginInput {
  email: any;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
