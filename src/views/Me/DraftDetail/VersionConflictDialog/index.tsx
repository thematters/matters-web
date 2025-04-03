import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { OPEN_DRAFT_VERSION_CONFLICT_DIALOG } from '~/common/enums'
import { Dialog, useDialogSwitch, useEventListener } from '~/components'

export const VersionConflictDialog = () => {
  const intl = useIntl()
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)

  const [onContinueEdit, setOnContinueEdit] = useState<(() => void) | null>(
    null
  )

  const openDialog = (payload: { onContinueEdit: () => void }) => {
    const callback = payload?.onContinueEdit
    if (callback && typeof callback === 'function') {
      setOnContinueEdit(() => callback)
    } else {
      setOnContinueEdit(null)
    }
    baseOpenDialog()
  }

  const handleContinueEdit = async () => {
    closeDialog()

    // overwrite remote version
    if (onContinueEdit) {
      onContinueEdit()
    }
  }

  const handleAbandonEdit = async () => {
    window.location.reload()
  }

  useEventListener(OPEN_DRAFT_VERSION_CONFLICT_DIALOG, openDialog)

  return (
    <Dialog isOpen={show} onDismiss={closeDialog}>
      <Dialog.Header
        title={intl.formatMessage({
          defaultMessage: 'Draft version is abnormal',
          id: 'BOr224',
        })}
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="The draft is already open on another device or tab, continuing to edit may result in content being overwritten and lost. Do you want to continue?"
              id="WrpdUp"
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              color="greyDarker"
              text={
                <FormattedMessage
                  defaultMessage="Discard this version"
                  id="4ptCtD"
                />
              }
              onClick={handleAbandonEdit}
            />
            <Dialog.RoundedButton
              color="red"
              text={
                <FormattedMessage
                  defaultMessage="Continue editing"
                  id="rVbKiP"
                />
              }
              onClick={handleContinueEdit}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Discard this version"
                  id="4ptCtD"
                />
              }
              color="greyDarker"
              onClick={handleAbandonEdit}
            />
            <Dialog.TextButton
              color="red"
              text={
                <FormattedMessage
                  defaultMessage="Continue editing"
                  id="rVbKiP"
                />
              }
              onClick={handleContinueEdit}
            />
          </>
        }
      />
    </Dialog>
  )
}
