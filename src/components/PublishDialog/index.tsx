import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import PublishContent from './PublishContent'
import styles from './styles.css'

interface PublishDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const PublishDialog = ({ children }: PublishDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog
        title={
          <Translate
            zh_hant={TEXT.zh_hant.publish}
            zh_hans={TEXT.zh_hans.publish}
          />
        }
        isOpen={showDialog}
        onDismiss={close}
      >
        <PublishContent close={close} />
      </Dialog>

      <style jsx>{styles}</style>
    </>
  )
}

export default PublishDialog
