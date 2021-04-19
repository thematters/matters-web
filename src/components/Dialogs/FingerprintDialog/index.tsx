import { gql } from '@apollo/client'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

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

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFingerprintDialog = ({
  article,
  children,
}: FingerprintDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header title="IPFSEntrance" close={close} closeTextId="close" />

        <Dialog.Content hasGrow>
          <DynamicContent dataHash={article.dataHash || ''} />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const FingerprintDialog = (props: FingerprintDialogProps) => (
  <Dialog.Lazy mounted={<BaseFingerprintDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

FingerprintDialog.fragments = fragments
