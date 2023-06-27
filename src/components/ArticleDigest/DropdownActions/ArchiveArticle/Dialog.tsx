import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import updateUserArticles from '~/components/GQL/updates/userArticles'
import {
  ArchiveArticleArticleFragment,
  ArchiveArticleMutation,
} from '~/gql/graphql'

const ARCHIVE_ARTICLE = gql`
  mutation ArchiveArticle($id: ID!) {
    editArticle(input: { id: $id, state: archived }) {
      id
      articleState: state
      sticky
    }
  }
`

interface ArchiveArticleDialogProps {
  article: ArchiveArticleArticleFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ArchiveArticleDialog = ({
  article,
  children,
}: ArchiveArticleDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [archiveArticle] = useMutation<ArchiveArticleMutation>(
    ARCHIVE_ARTICLE,
    {
      variables: { id: article.id },
      optimisticResponse: {
        editArticle: {
          id: article.id,
          articleState: 'archived' as any,
          sticky: false,
          __typename: 'Article',
        },
      },
      update: (cache) => {
        updateUserArticles({
          cache,
          articleId: article.id,
          userName: article.author.userName,
          type: 'archive',
        })
      },
    }
  )

  const onArchive = async () => {
    await archiveArticle()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Article is hidden"
          description="src/components/ArticleDigest/DropdownActions/ArchiveArticle/Dialog.tsx"
        />
      ),
    })
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="archive" />

        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="Are you sure you want to archive the article?"
              description="src/components/ArticleDigest/DropdownActions/ArchiveArticle/Dialog.tsx"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <FormattedMessage defaultMessage="Archive" description="" />
              }
              color="red"
              onClick={() => {
                onArchive()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage defaultMessage="Archive" description="" />
              }
              color="red"
              onClick={() => {
                onArchive()
                closeDialog()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyArchiveArticleDialog = (props: ArchiveArticleDialogProps) => (
  <Dialog.Lazy mounted={<ArchiveArticleDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyArchiveArticleDialog
