import _isEmpty from 'lodash/isEmpty'

import { Button, Form, TextIcon, Translate } from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_RESET_PASSWORD_DIALOG,
  OPEN_SIGNUP_DIALOG,
  PATHS,
  TEXT
} from '~/common/enums'
import { appendTarget } from '~/common/utils'

export const PasswordResetDialogButton = () => (
  <Button
    spacing={['xtight', 0]}
    onClick={() => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_RESET_PASSWORD_DIALOG))
    }}
  >
    <TextIcon color="green" weight="md">
      <Translate
        zh_hant={TEXT.zh_hant.forgetPassword}
        zh_hans={TEXT.zh_hans.forgetPassword}
      />
      ？
    </TextIcon>
  </Button>
)

export const PasswordResetRedirectButton = () => (
  <Button spacing={['xtight', 0]} {...appendTarget(PATHS.AUTH_FORGET)}>
    <TextIcon color="green" weight="md">
      <Translate
        zh_hant={TEXT.zh_hant.forgetPassword}
        zh_hans={TEXT.zh_hans.forgetPassword}
      />
      ？
    </TextIcon>
  </Button>
)

export const SignUpDialogButton = () => (
  <Form.ClickableArea
    title={<Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />}
    rightText={
      <Translate
        zh_hant={TEXT.zh_hant.register}
        zh_hans={TEXT.zh_hans.register}
      />
    }
    spacing={['base', 0]}
    onClick={() => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_DIALOG))
    }}
  />
)

export const SignUpRedirectionButton = () => (
  <Form.ClickableArea
    title={<Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />}
    rightText={
      <Translate
        zh_hant={TEXT.zh_hant.register}
        zh_hans={TEXT.zh_hans.register}
      />
    }
    spacing={['base', 0]}
    {...appendTarget(PATHS.AUTH_SIGNUP)}
  />
)
