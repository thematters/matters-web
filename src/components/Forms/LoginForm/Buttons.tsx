import _isEmpty from 'lodash/isEmpty'

import { Button, Dialog, TextIcon, Translate } from '~/components'

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
    <TextIcon color="green">
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
    <TextIcon color="green">
      <Translate
        zh_hant={TEXT.zh_hant.forgetPassword}
        zh_hans={TEXT.zh_hans.forgetPassword}
      />
      ？
    </TextIcon>
  </Button>
)

export const SignUpDialogButton = () => (
  <Dialog.Footer.Button
    onClick={() => {
      window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_DIALOG))
    }}
    bgColor="grey-lighter"
    textColor="black"
  >
    <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
  </Dialog.Footer.Button>
)

export const SignUpRedirectionButton = () => (
  <Dialog.Footer.Button
    {...appendTarget(PATHS.AUTH_SIGNUP)}
    bgColor="grey-lighter"
    textColor="black"
  >
    <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
  </Dialog.Footer.Button>
)
