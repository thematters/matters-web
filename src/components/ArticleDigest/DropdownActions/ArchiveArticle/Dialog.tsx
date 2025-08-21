import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  toast,
  useDialogSwitch,
  useMutation,
  useStep,
} from '~/components'
import {
  ArchiveArticleArticleFragment,
  ArchiveArticleMutation,
  ArticleState,
} from '~/gql/graphql'

const ARCHIVE_ARTICLE = gql`
  mutation ArchiveArticle($id: ID!) {
    editArticle(input: { id: $id, state: archived }) {
      id
      articleState: state
    }
  }
`

export interface ArchiveArticleDialogProps {
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
          articleState: ArticleState.Archived,
          __typename: 'Article',
        },
      },
      update: (cache) => {
        cache.evict({
          id: cache.identify(article.author),
          fieldName: 'pinnedWorks',
        })
        cache.evict({
          id: cache.identify(article.author),
          fieldName: 'articles',
        })
        cache.evict({
          id: cache.identify(article.author),
          fieldName: 'status',
        })
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    }
  )

  const onArchive = async () => {
    await archiveArticle()

    toast.info({
      message: (
        <FormattedMessage
          defaultMessage="Archived"
          id="a/YQ1Z"
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
          title={
            <FormattedMessage defaultMessage="Archive works" id="KQi/UZ" />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            {isPreConfirm ? (
              <p>
                <FormattedMessage
                  defaultMessage="Are you sure you want to archive ‘{article}’?"
                  id="mWcca9"
                  values={{
                    article: (
                      <span className="u-highlight">{article.title}</span>
                    ),
                  }}
                />
                <br />
                <FormattedMessage
                  defaultMessage="Archived articles can only be seen by you, and this operation cannot be undone. If this article has been added to collections, it will be removed. (IPFS version will not be effected)"
                  id="A3g33H"
                />
              </p>
            ) : (
              <p>
                <FormattedMessage
                  defaultMessage="This operation cannot be undone, confirm archiving?"
                  id="yBUiiy"
                />
              </p>
            )}
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                isPreConfirm ? (
                  <FormattedMessage defaultMessage="Archive" id="hrgo+E" />
                ) : (
                  <FormattedMessage
                    defaultMessage="Confirm Archiving"
                    id="HJ0iZJ"
                  />
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
                  <FormattedMessage defaultMessage="Archive" id="hrgo+E" />
                ) : (
                  <FormattedMessage
                    defaultMessage="Confirm Archiving"
                    id="HJ0iZJ"
                  />
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
