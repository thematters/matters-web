import gql from 'graphql-tag'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { FingerprintArticle } from './__generated__/FingerprintArticle'

interface FingerprintDialogProps {
  article: FingerprintArticle
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      dataHash
    }
  `,
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFingerprintDialog = ({
  article,
  children,
}: FingerprintDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title="IPFSEntrance"
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <Dialog.Content hasGrow>
          <DynamicContent dataHash={article.dataHash || ''} />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const FingerprintDialog = (props: FingerprintDialogProps) => (
  <Dialog.Lazy mounted={<BaseFingerprintDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

FingerprintDialog.fragments = fragments
