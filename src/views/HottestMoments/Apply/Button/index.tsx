import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, TextIcon, ViewerContext } from '~/components'

import Dialog from '../Dialog'

const ApplyMomentFeedButton = () => {
  const viewer = useContext(ViewerContext)
  const [applied, setApplied] = useState(false)

  if (viewer.isMomentFeedApplied || applied) {
    return null
  }

  const openAuthDialog = () => {
    window.dispatchEvent(
      new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
        detail: { trigger: UNIVERSAL_AUTH_TRIGGER.applyMomentFeed },
      })
    )
  }

  return (
    <Dialog onApplied={() => setApplied(true)}>
      {({ openDialog }) => (
        <Button
          size={[null, '1.875rem']}
          spacing={[0, 20]}
          borderColor="green"
          borderWidth="sm"
          textColor="green"
          onClick={viewer.isAuthed ? openDialog : openAuthDialog}
        >
          <TextIcon size={14} weight="medium">
            <FormattedMessage defaultMessage="Apply to join" id="z5UXPc" />
          </TextIcon>
        </Button>
      )}
    </Dialog>
  )
}

export default ApplyMomentFeedButton
