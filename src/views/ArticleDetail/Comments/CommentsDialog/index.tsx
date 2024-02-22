import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

interface CommentsDialogProps {
  id: string
  lock: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode

  // FixedToolbar
  article: ToolbarArticlePublicFragment & Partial<ToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  showCommentToolbar: boolean
  openCommentsDialog?: () => void
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseCommentsDialogDialog = ({
  id,
  lock,
  children,

  // from FixedToolbar
  article,
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  showCommentToolbar,
  openCommentsDialog,
}: CommentsDialogProps) => {
  const { show, openDialog, closeDialog: closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          id={id}
          lock={lock}
          closeDialog={closeDialog}
          article={article}
          articleDetails={articleDetails}
          translated={translated}
          translatedLanguage={translatedLanguage}
          privateFetched={privateFetched}
          showCommentToolbar={showCommentToolbar}
          openCommentsDialog={openCommentsDialog}
        />
      </Dialog>
    </>
  )
}

export const CommentsDialog = (props: CommentsDialogProps) => (
  <Dialog.Lazy mounted={<BaseCommentsDialogDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
