import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

import { AppreciatorsDialogArticle } from './__generated__/AppreciatorsDialogArticle'

interface AppreciatorsDialogProps {
  article: AppreciatorsDialogArticle
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment AppreciatorsDialogArticle on Article {
      id
      mediaHash
      appreciationsReceived(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

export const AppreciatorsDialog = ({
  article,
  children
}: AppreciatorsDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        <Content mediaHash={article.mediaHash || ''} closeDialog={close} />
      </Dialog>
    </>
  )
}

AppreciatorsDialog.fragments = fragments
