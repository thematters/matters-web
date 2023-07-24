import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import updateUserCollectionDetail from '~/components/GQL/updates/userCollectionDetail'
import { RemoveArticleCollectionMutation } from '~/gql/graphql'

const REMOVE_ARTICLE_COLLECTION = gql`
  mutation RemoveArticleCollection($collection: ID!, $article: ID!) {
    deleteCollectionArticles(
      input: { collection: $collection, articles: [$article] }
    ) {
      id
    }
  }
`

interface RemoveArticleCollectionDialogProps {
  collectionId: string
  articleId: string
  articleTitle: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseRemoveArticleCollectionDialog = ({
  collectionId,
  articleId,
  articleTitle,
  children,
}: RemoveArticleCollectionDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [remove, { loading }] = useMutation<RemoveArticleCollectionMutation>(
    REMOVE_ARTICLE_COLLECTION,
    {
      variables: { collection: collectionId, article: articleId },
    }
  )

  if (!collectionId || !articleId || !articleTitle) {
    return <></>
  }

  const onRemove = async () => {
    await remove({
      update(cache) {
        updateUserCollectionDetail({
          cache,
          collectionId,
          articleId,
          type: 'delete',
        })
      },
    })

    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Successfully removed"
          description="src/components/Dialogs/RemoveArticleCollectionDialog/index.tsx"
        />
      ),
    })

    closeDialog()
  }

  return (
    <>
      {children({ openDialog })}
      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Remove from collection" />}
        />

        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="Are you sure you want to remove ‘{article}’ from this collection?"
              values={{
                article: <span className="u-highlight">{articleTitle}</span>,
              }}
              description="src/components/Dialogs/RemoveArticleCollectionDialog/index.tsx"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Remove"
                  description="src/components/Dialogs/RemoveArticleCollectionDialog/index.tsx"
                />
              }
              color="green"
              onClick={onRemove}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Remove"
                  description="src/components/Dialogs/RemoveArticleCollectionDialog/index.tsx"
                />
              }
              color="green"
              onClick={onRemove}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const RemoveArticleCollectionDialog = (
  props: RemoveArticleCollectionDialogProps
) => (
  <Dialog.Lazy mounted={<BaseRemoveArticleCollectionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
