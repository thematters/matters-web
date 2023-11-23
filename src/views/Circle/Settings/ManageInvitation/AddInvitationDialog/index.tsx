import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import { StagingNode } from '~/components/SearchSelect/StagingArea'

type Step = 'search' | 'pre-send' | 'sent'

interface Props {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicInviteeSearch = dynamic(() => import('./Search'), {
  ssr: false,
  loading: () => <Spinner />,
})

const DynamicInviteePreSend = dynamic(() => import('./PreSend'), {
  ssr: false,
  loading: () => <Spinner />,
})

const DynamicInvitationSent = dynamic(() => import('./Sent'), {
  ssr: false,
  loading: () => <Spinner />,
})

/**
 * This dialog component is for sending new invitations.
 *
 * Usage:
 *
 * ```tsx
 *   <AddCircleInvitationDialog>
 *     {({ openDialog }) => (<Component openDialog={openDialog} />)}
 *   </AddCircleInvitationDialog>
 * ```
 *
 */
const AddCircleInvitationDialog = ({ children }: Props) => {
  const defaultStep = 'search'

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)
  const { currStep, forward, reset } = useStep<Step>(defaultStep)
  const [invitees, setInvitees] = useState<StagingNode[]>([])

  const openDialog = () => {
    if (currStep !== defaultStep) {
      reset(defaultStep)
    }
    baseOpenDialog()
  }

  const save = ({ nodes }: { nodes: StagingNode[] }) => {
    setInvitees(nodes)
    forward('pre-send')
  }
  const confirm = () => forward('sent')

  const isSearch = currStep === 'search'
  const isPreSend = currStep === 'pre-send'
  const isSent = currStep === 'sent'

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isSearch && (
          <DynamicInviteeSearch closeDialog={closeDialog} save={save} />
        )}

        {isPreSend && (
          <DynamicInviteePreSend
            closeDialog={closeDialog}
            confirm={confirm}
            invitees={invitees}
          />
        )}

        {isSent && <DynamicInvitationSent closeDialog={closeDialog} />}
      </Dialog>
    </>
  )
}

export default AddCircleInvitationDialog
