import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner } from '~/components'

import { DonatorDialogArticle } from './__generated__/DonatorDialogArticle'

interface DonatorsDialogProps {
  article: DonatorDialogArticle
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment DonatorDialogArticle on Article {
      id
      mediaHash
      donationsDialog: transactionsReceivedBy(
        input: { first: 0, purpose: donation }
      ) {
        totalCount
      }
    }
  `,
}

const DynamicConetnt = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseDonatorsDialog = ({ article, children }: DonatorsDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <DynamicConetnt article={article} closeDialog={close} />
      </Dialog>
    </>
  )
}

export const DonatorsDialog = (props: DonatorsDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonatorsDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

DonatorsDialog.fragments = fragments
