import { useQuery } from '@apollo/react-hooks'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import {
  EmptyLayout,
  Layout,
  ReviseArticleDialog,
  Spinner,
  Throw404,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'

import ConfirmExitDialog from './ConfirmExitDialog'
import { EDIT_MODE_ARTICLE } from './gql'
import EditModeHeader from './Header'
import PublishState from './PublishState'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import { EditModeArticle } from './__generated__/EditModeArticle'

interface EditModeProps {
  article: ArticleDetailPublic_article
  onCancel: () => void
  onSaved: () => void
}

const Editor = dynamic(() => import('~/components/Editor/Article'), {
  ssr: false,
  loading: Spinner,
})

const EditMode: React.FC<EditModeProps> = ({ article, onCancel, onSaved }) => {
  const [editData, setEditData] = useState<Record<string, any>>({})
  const { data, loading, error } = useQuery<EditModeArticle>(
    EDIT_MODE_ARTICLE,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  /**
   * Render
   */
  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  const editModeArticle = data?.article
  const drafts = data?.article?.drafts
  const draft = drafts && drafts[0]
  const countLeft =
    MAX_ARTICLE_REVISION_COUNT - (data?.article?.revisionCount || 0)
  const isSameHash = draft?.mediaHash === article.mediaHash
  const isPending = draft?.publishState === 'pending'
  const isEditDisabled = !isSameHash || isPending
  const isOverLimit = countLeft <= 0
  const isReviseDisabled = isEditDisabled || isOverLimit

  if (!draft || !editModeArticle) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <>
      <ConfirmExitDialog onExit={onCancel}>
        {({ open: openConfirmExitDialog }) => (
          <Layout.Main>
            <Layout.Header
              left={
                <Layout.Header.BackButton
                  onClick={isOverLimit ? onCancel : openConfirmExitDialog}
                  disabled={isEditDisabled}
                />
              }
              right={
                <EditModeHeader
                  article={editModeArticle}
                  editData={editData}
                  countLeft={countLeft}
                  isSameHash={isSameHash}
                  isReviseDisabled={isReviseDisabled}
                  onSaved={onSaved}
                  disabled={isEditDisabled}
                />
              }
            />

            <PublishState
              article={article}
              draft={draft}
              isSameHash={isSameHash}
              cancel={onCancel}
            />

            <Layout.Spacing>
              <Editor
                draft={draft}
                isReviseMode={!isReviseDisabled}
                isSummaryReadOnly
                isTitleReadOnly
                update={async (update) => setEditData(update)}
                upload={async () => ({ id: '', path: '' })}
              />
            </Layout.Spacing>
          </Layout.Main>
        )}
      </ConfirmExitDialog>

      {!isReviseDisabled && <ReviseArticleDialog countLeft={countLeft} />}
    </>
  )
}

export default EditMode
