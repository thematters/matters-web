import gql from 'graphql-tag'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

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

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseAppreciatorsDialog = ({
  article,
  children,
}: AppreciatorsDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <DynamicContent mediaHash={article.mediaHash} closeDialog={close} />
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
