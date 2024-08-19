import gql from 'graphql-tag'
import dynamic from 'next/dynamic'

import { TEST_ID } from '~/common/enums'
import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'
import { SupportsDialogArticleFragment } from '~/gql/graphql'

export interface SupportersDialogProps {
  article: SupportsDialogArticleFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment SupportsDialogArticle on Article {
      id
      shortHash
      donationsDialog: donations(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseSupportersDialog = ({ article, children }: SupportersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_SUPPORTERS}
      >
        <DynamicContent article={article} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const SupportersDialog = (props: SupportersDialogProps) => (
  <Dialog.Lazy mounted={<BaseSupportersDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

SupportersDialog.fragments = fragments
