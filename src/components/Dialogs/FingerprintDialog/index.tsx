import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

import { FingerprintArticle } from './__generated__/FingerprintArticle'

interface FingerprintDialogProps {
  article: FingerprintArticle
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      dataHash
    }
  `,
}

const BaseFingerprintDialog = ({
  article,
  children,
}: FingerprintDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header title="IPFSEntrance" close={close} closeTextId="close" />

        <Dialog.Content hasGrow>
          <Content dataHash={article.dataHash || ''} />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const FingerprintDialog = (props: FingerprintDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseFingerprintDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

FingerprintDialog.fragments = fragments
