import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useStep,
} from '~/components'
import updateUserArticles from '~/components/GQL/updates/userArticles'
import updateUserProfile from '~/components/GQL/updates/userProfile'
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

type Step = 'preConfirm' | 'confirm'

const ArchiveArticleDialog = ({
  article,
  children,
}: ArchiveArticleDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { currStep, forward } = useStep<Step>('preConfirm')
  const nextStep = () => forward('confirm')
  const isPreConfirm = currStep === 'preConfirm'

  const [archiveArticle, { loading }] = useMutation<ArchiveArticleMutation>(
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
          targetId: article.id,
          userName: article.author.userName!,
          type: 'archive',
        })
        updateUserProfile({
          cache,
          userName: article.author.userName!,
          type: 'decreaseArticle',
        })
      },
    }
  )

  const onArchive = async () => {
    await archiveArticle()

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Archived"
          description="src/components/ArticleDigest/DropdownActions/ArchiveArticle/Dialog.tsx"
        />
      ),
    })
  }

  const onClickArchive = async () => {
    if (isPreConfirm) {
      nextStep()
    } else {
      await onArchive()
      closeDialog()
    }
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Archive works" />}
        />

        <Dialog.Message>
          {isPreConfirm ? (
            <p>
              <FormattedMessage
                defaultMessage="Are you sure you want to archive ‘{article}’?"
                values={{
                  article: <span className="u-highlight">{article.title}</span>,
                }}
              />
              <br />
              <FormattedMessage defaultMessage="Archived articles can only be seen by you, and this operation cannot be undone. If this article has been added to collections, it will be removed. (IPFS version will not be effected)" />
            </p>
          ) : (
            <p>
              <FormattedMessage defaultMessage="This operation cannot be undone, confirm archiving?" />
            </p>
          )}
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                isPreConfirm ? (
                  <FormattedMessage defaultMessage="Archive" />
                ) : (
                  <FormattedMessage defaultMessage="Confirm Archiving" />
                )
              }
              color={loading ? 'green' : 'red'}
              onClick={onClickArchive}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                isPreConfirm ? (
                  <FormattedMessage defaultMessage="Archive" />
                ) : (
                  <FormattedMessage defaultMessage="Confirm Archiving" />
                )
              }
              color={loading ? 'green' : 'red'}
              onClick={onClickArchive}
              loading={loading}
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
