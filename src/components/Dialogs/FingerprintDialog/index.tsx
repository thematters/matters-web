import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext } from 'react'

import { Dialog, Spinner, useDialogSwitch, ViewerContext } from '~/components'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { FingerprintArticle } from './__generated__/FingerprintArticle'

interface FingerprintDialogProps {
  article: FingerprintArticle
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      dataHash
      iscnId
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

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFingerprintDialog = ({
  article,
  children,
}: FingerprintDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const viewer = useContext(ViewerContext)

  // only show secret when viewer is author and access type is paywall
  const showSecret =
    viewer.id === article.author.id &&
    article?.access.type === ArticleAccessType.paywall

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title="IPFSEntrance"
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <Dialog.Content hasGrow>
          <DynamicContent
            dataHash={article.dataHash || ''}
            iscnId={article.iscnId || ''}
            iscnPublish={!!article.drafts?.[0]?.iscnPublish}
            showSecret={showSecret}
            showRetry={viewer.id === article.author.id}
            articleId={article.id}
          />
        </Dialog.Content>
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
