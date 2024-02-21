import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { TOOLBAR_FIXEDTOOLBAR_ID } from '~/common/enums'
import { Dialog, Spinner, useDialogSwitch } from '~/components'

interface CommentsDialogProps {
  id: string
  lock: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseCommentsDialogDialog = ({
  id,
  lock,
  children,
}: CommentsDialogProps) => {
  const { show, openDialog, closeDialog: _closeDialog } = useDialogSwitch(true)

  const showDialog = () => {
    const fixedToolbar = document.getElementById(TOOLBAR_FIXEDTOOLBAR_ID)
    if (fixedToolbar) {
      fixedToolbar.style.zIndex = 'var(--z-index-over-dialog)'
    }
  }

  useEffect(() => {
    if (show) {
      showDialog()
    }
  }, [show])

  const closeDialog = () => {
    const fixedToolbar = document.getElementById(TOOLBAR_FIXEDTOOLBAR_ID)
    if (fixedToolbar) {
      setTimeout(() => {
        fixedToolbar.style.zIndex = 'var(--z-index-bottom-bar)'
      }, 300)
    }
    _closeDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent id={id} lock={lock} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const CommentsDialog = (props: CommentsDialogProps) => (
  <Dialog.Lazy mounted={<BaseCommentsDialogDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
