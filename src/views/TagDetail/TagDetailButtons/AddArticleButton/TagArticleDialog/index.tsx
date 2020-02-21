import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import Content from './Content'

interface TagArticleDialogProps {
  id?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const TagArticleDialog = ({ id, children }: TagArticleDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog
        title={
          <Translate
            zh_hant={TEXT.zh_hant.addArticleTag}
            zh_hans={TEXT.zh_hans.addArticleTag}
          />
        }
        isOpen={showDialog}
        onDismiss={close}
      >
        <Content close={close} id={id} />
      </Dialog>
    </>
  )
}

export default TagArticleDialog
