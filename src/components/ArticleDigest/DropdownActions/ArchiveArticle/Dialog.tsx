import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Dialog, useDialogSwitch, useMutation } from '~/components'
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

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <FormattedMessage
              defaultMessage="Article is hidden"
              description="src/components/ArticleDigest/DropdownActions/ArchiveArticle/Dialog.tsx"
            />
          ),
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header title="archive" closeDialog={closeDialog} mode="inner" />

        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="Are you sure you want to archive the article?"
              description="src/components/ArticleDigest/DropdownActions/ArchiveArticle/Dialog.tsx"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onArchive()
              closeDialog()
            }}
          >
            <FormattedMessage defaultMessage="Archive" description="" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <FormattedMessage defaultMessage="Cancel" description="" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
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
