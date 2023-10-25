import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Spinner,
  Translate,
  useDialogSwitch,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  ArticleAccessType,
  ArticleFingerprintPublicQuery,
  FingerprintArticleFragment,
} from '~/gql/graphql'

interface FingerprintDialogProps {
  article: FingerprintArticleFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

type ArticleFingerprintPublicArticle = NonNullable<
  ArticleFingerprintPublicQuery['article'] & { __typename: 'Article' }
>

const fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      mediaHash
      dataHash
      iscnId
      createdAt
      revisedAt
      author {
        id
      }
      access {
        type
      }
      drafts {
        iscnPublish
      }
    }
  `,
}

const ArticleFingerprintGQL = gql`
  query ArticleFingerprintPublic($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        ...FingerprintArticle
      }
    }
  }
  ${fragments.article}
`

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFingerprintDialog = ({
  article,
  children,
}: FingerprintDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const viewer = useContext(ViewerContext)

  const { data, loading, refetch } =
    usePublicQuery<ArticleFingerprintPublicQuery>(ArticleFingerprintGQL, {
      variables: { id: article.id },
      skip: true, // skip first call
    })

  // only show secret when viewer is author and access type is paywall
  const showSecret =
    viewer.id === article.author.id &&
    article?.access.type === ArticleAccessType.Paywall

  useEffect(() => {
    if (show) {
      refetch()
    }
  }, [show])

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        smBgColor="greyLighter"
        smUpBgColor="greyLighter"
      >
        <Dialog.Header
          title="IPFSEntrance"
          leftBtn={
            <Dialog.TextButton
              text={<Translate id="cancel" />}
              onClick={closeDialog}
            />
          }
        />

        <DynamicContent
          dataHash={article.dataHash || ''}
          iscnId={
            article?.iscnId ||
            (data?.article as ArticleFingerprintPublicArticle)?.iscnId ||
            ''
          }
          iscnPublish={!!article.drafts?.[0]?.iscnPublish}
          showSecret={showSecret}
          isAuthor={viewer.id === article.author.id}
          articleId={article.id}
          articleLastModified={article.revisedAt || article.createdAt}
          pending={loading}
          refetch={refetch}
        />

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const FingerprintDialog = (props: FingerprintDialogProps) => (
  <Dialog.Lazy mounted={<BaseFingerprintDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

FingerprintDialog.fragments = fragments
