import { Dialog, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'
import { appendTarget } from '~/common/utils'

const PasswordChanged = () => (
  <>
    <Dialog.Message
      message={
        <Translate
          zh_hant={TEXT.zh_hant.resetPasswordSuccess}
          zh_hans={TEXT.zh_hans.resetPasswordSuccess}
        />
      }
      hint={
        <Translate
          zh_hant={TEXT.zh_hant.useNewPassword}
          zh_hans={TEXT.zh_hans.useNewPassword}
        />
      }
    />

    <Dialog.Footer>
      <Dialog.Footer.Button {...appendTarget(PATHS.AUTH_LOGIN)}>
        <Translate zh_hant={TEXT.zh_hant.login} zh_hans={TEXT.zh_hans.login} />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default PasswordChanged
