import { Dialog, Layout, Translate } from '~/components'

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
  const titleId = isForget ? 'resetPassword' : 'changePassword'
  const descriptionId = isForget
    ? 'successResetPassword'
    : 'successChangePassword'

  return (
    <>
      <Layout.Header left={<Layout.Header.Title id={titleId} />} />

      {closeDialog && (
        <Dialog.Header title={titleId} close={closeDialog} headerHidden />
      )}

      <Dialog.Message headline={titleId} description={descriptionId} />

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
