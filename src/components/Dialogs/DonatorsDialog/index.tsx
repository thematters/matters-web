import gql from 'graphql-tag'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { DonatorDialogArticle } from './__generated__/DonatorDialogArticle'

interface DonatorsDialogProps {
  article: DonatorDialogArticle
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
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

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseDonatorsDialog = ({ article, children }: DonatorsDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent article={article} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const DonatorsDialog = (props: DonatorsDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonatorsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

DonatorsDialog.fragments = fragments
