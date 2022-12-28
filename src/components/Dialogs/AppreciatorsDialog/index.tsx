import gql from 'graphql-tag'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { AppreciatorsDialogArticle } from './__generated__/AppreciatorsDialogArticle'

interface AppreciatorsDialogProps {
  article: AppreciatorsDialogArticle
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment AppreciatorsDialogArticle on Article {
      id
      id
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
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent id={article.id} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const AppreciatorsDialog = (props: AppreciatorsDialogProps) => (
  <Dialog.Lazy mounted={<BaseAppreciatorsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

AppreciatorsDialog.fragments = fragments
