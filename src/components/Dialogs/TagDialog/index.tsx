import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import Content from './Content'

interface TagDialogProps {
  id?: string
  content?: string
  description?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const TagDialog = ({
  children,
  content,
  ...restProps
}: TagDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog
        title={
          <Translate
            zh_hant={content ? TEXT.zh_hant.editTag : TEXT.zh_hant.createTag}
            zh_hans={content ? TEXT.zh_hans.editTag : TEXT.zh_hans.createTag}
          />
        }
        isOpen={showDialog}
        onDismiss={close}
      >
        <Content close={close} content={content} {...restProps} />
      </Dialog>
    </>
  )
}
