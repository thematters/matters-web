import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

import { AppreciatorsArticle } from './__generated__/AppreciatorsArticle'

interface AppreciatorsDialogProps {
  article: AppreciatorsArticle
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment AppreciatorsArticle on Article {
      id
      mediaHash
      appreciationsReceived(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

const AppreciatorsDialog = ({ article, children }: AppreciatorsDialogProps) => {
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

export default AppreciatorsDialog
