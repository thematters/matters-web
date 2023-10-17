import { FormattedMessage } from 'react-intl'

import { BackToHomeButton, Dialog, Layout, Translate } from '~/components'

const Complete = ({
  purpose,
  closeDialog,
}: {
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isInPage = purpose === 'page'

  return (
    <>
      {isInPage && (
        <Layout.Header left={<Layout.Header.Title id="changeEmail" />} />
      )}

      {closeDialog && (
        <Dialog.Header title="changeEmail" closeDialog={closeDialog} />
      )}

      <Dialog.Message align="center" smUpAlign="center">
        <h3>
          <Translate id="successChangeEmail" />
        </h3>

        <br />

        {isInPage && <BackToHomeButton />}
      </Dialog.Message>

      {!isInPage && closeDialog && (
        <Dialog.Footer
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        />
      )}
    </>
  )
}

export default Complete
