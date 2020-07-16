import { gql } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner } from '~/components'

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
  `,
}

const DynamicConetnt = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseAppreciatorsDialog = ({
  article,
  children,
}: AppreciatorsDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <DynamicConetnt
          mediaHash={article.mediaHash || ''}
          closeDialog={close}
        />
      </Dialog>
    </>
  )
}

export const AppreciatorsDialog = (props: AppreciatorsDialogProps) => (
  <Dialog.Lazy mounted={<BaseAppreciatorsDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

AppreciatorsDialog.fragments = fragments
