import _isEmpty from 'lodash/isEmpty'

import { Dialog, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'
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
    <Translate
      zh_hant={TEXT.zh_hant.resetPassword}
      zh_hans={TEXT.zh_hans.resetPassword}
    />
  ) : (
    <Translate
      zh_hant={TEXT.zh_hant.changePassword}
      zh_hans={TEXT.zh_hans.changePassword}
    />
  )

  const Description = isForget ? (
    <Translate
      zh_hant={TEXT.zh_hant.resetPasswordSuccess}
      zh_hans={TEXT.zh_hans.resetPasswordSuccess}
    />
  ) : (
    <Translate
      zh_hant={TEXT.zh_hant.changePasswordSuccess}
      zh_hans={TEXT.zh_hans.changePasswordSuccess}
    />
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
            <Translate
              zh_hant={TEXT.zh_hant.login}
              zh_hans={TEXT.zh_hans.login}
            />
          </Dialog.Footer.Button>
        )}

        {!isForget && closeDialog && (
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate
              zh_hant={TEXT.zh_hant.close}
              zh_hans={TEXT.zh_hans.close}
            />
          </Dialog.Footer.Button>
        )}
      </Dialog.Footer>
    </>
  )
}
