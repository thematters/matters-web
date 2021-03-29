import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import { StagingNode } from '~/components/SearchSelect/StagingArea'

type Step = 'search' | 'pre-send' | 'sent'

interface Props {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicInviteeSearch = dynamic(() => import('./Search'), {
  ssr: false,
  loading: Spinner,
})

const DynamicInviteePreSend = dynamic(() => import('./PreSend'), {
  ssr: false,
  loading: Spinner,
})

const DynamicInvitationSent = dynamic(() => import('./Sent'), {
  ssr: false,
  loading: Spinner,
})

/**
 * This dialog component is for sending new invitations.
 *
 * Usage:
 *
 * ```tsx
 *   <AddCircleInvitationDialog>
 *     {({ open }) => (<Component open={open} />)}
 *   </AddCircleInvitationDialog>
 * ```
 *
 */
const AddCircleInvitationDialog = ({ children }: Props) => {
  const defaultStep = 'search'

  const { show, open: baseOpen, close: baseClose } = useDialogSwitch(false)
  const { currStep, forward, reset } = useStep<Step>(defaultStep)
  const [invitees, setInvitees] = useState<StagingNode[]>([])

  const open = () => {
    if (currStep !== defaultStep) {
      reset(defaultStep)
    }
    baseOpen()
  }

  const close = () => {
    // prevent click outside
    const node = document.getElementById('period-option')
    if (node) {
      return
    }
    baseClose()
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
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm" fixedHeight>
        {isSearch && <DynamicInviteeSearch close={close} save={save} />}

        {isPreSend && (
          <DynamicInviteePreSend
            close={close}
            confirm={confirm}
            invitees={invitees}
          />
        )}

        {isSent && <DynamicInvitationSent close={close} />}
      </Dialog>
    </>
  )
}

export default AddCircleInvitationDialog
