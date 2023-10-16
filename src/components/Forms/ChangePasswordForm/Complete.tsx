import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'
import { BackToHomeButton, Dialog, Layout, Translate } from '~/components'

interface Props {
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}

const Complete: React.FC<Props> = ({ type, purpose, closeDialog }) => {
  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const titleId = isForget ? 'resetPassword' : 'changePassword'
  const descriptionId = isForget
    ? 'successResetPassword'
    : 'successChangePassword'

  return (
    <>
      <Layout.Header left={<Layout.Header.Title id={titleId} />} />

      {closeDialog && (
        <Dialog.Header title={titleId} closeDialog={closeDialog} />
      )}

      <Dialog.Message>
        <p>
          <Translate id={descriptionId} />
        </p>
        <br />
        {isInPage && <BackToHomeButton />}
      </Dialog.Message>

      {!isInPage && (
        <Dialog.Footer
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" />}
          btns={
            isForget ? (
              <Dialog.RoundedButton
                text={<Translate id="login" />}
                {...appendTarget(PATHS.LOGIN)}
              />
            ) : null
          }
          smUpBtns={
            isForget ? (
              <Dialog.TextButton
                text={<Translate id="login" />}
                {...appendTarget(PATHS.LOGIN)}
              />
            ) : null
          }
        />
      )}
    </>
  )
}

export default Complete
