import _isEmpty from 'lodash/isEmpty'

import { Dialog, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'

interface Props {
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}

export const PasswordChangeComplete: React.FC<Props> = ({
  type,
  purpose,
  closeDialog
}) => {
  const isForget = type === 'forget'

  const Title = isForget ? (
    <Translate id="resetPassword" />
  ) : (
    <Translate id="changePassword" />
  )

  const Description = isForget ? (
    <Translate id="resetPasswordSuccess" />
  ) : (
    <Translate id="changePasswordSuccess" />
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header title={Title} close={closeDialog} headerHidden />
      )}

      <Dialog.Message headline={Title} description={Description} />

      <Dialog.Footer>
        {isForget && (
          <Dialog.Footer.Button {...appendTarget(PATHS.AUTH_LOGIN)}>
            <Translate id="login" />
          </Dialog.Footer.Button>
        )}

        {!isForget && closeDialog && (
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        )}
      </Dialog.Footer>
    </>
  )
}
