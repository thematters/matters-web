import { useQuery } from '@apollo/react-hooks'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import {
  EmptyLayout,
  Layout,
  ReviseArticleDialog,
  Spinner,
  Throw404,
  useFeatures,
  useResponsive,
} from '~/components'
import BottomBar from '~/components/Editor/BottomBar'
import Sidebar from '~/components/Editor/Sidebar'
import { QueryError, useImperativeQuery } from '~/components/GQL'

import { ENTITY_TYPE } from '~/common/enums'

import styles from '../styles.css'
import { EDIT_MODE_ARTICLE, EDIT_MODE_ARTICLE_ASSETS } from './gql'
import EditModeHeader from './Header'
import PublishState from './PublishState'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import { EditModeArticle } from './__generated__/EditModeArticle'
import { EditModeArticleAssets } from './__generated__/EditModeArticleAssets'

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
  const isLargeUp = useResponsive('lg-up')
  const features = useFeatures()

  // staging editing data
  const [editData, setEditData] = useState<Record<string, any>>({})
  const [cover, editCover] = useState<Asset>()
  const [tags, editTags] = useState<DigestTag[]>(article.tags || [])
  const [collection, editCollection] = useState<ArticleDigestDropdownArticle[]>(
    []
  )
  const [circle, editCircle] = useState<DigestRichCirclePublic | null>(
    article.circle
  )

  // fetch and refetch latest metadata
  const { data, loading, error } = useQuery<EditModeArticle>(
    EDIT_MODE_ARTICLE,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  // Cover
  const assets = data?.article?.assets || []
  const refetchAssets = useImperativeQuery<EditModeArticleAssets>(
    EDIT_MODE_ARTICLE_ASSETS,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  // Circle
  // Note: the author can only have one circle now
  const isAttachedCircle = !!article.circle
  const ownCircles = data?.article?.author.ownCircles
  const hasCircles = ownCircles && ownCircles.length >= 1
  const toggleCircle = hasCircles
    ? () => {
        if (!ownCircles) {
          return
        }

        editCircle(circle ? null : ownCircles[0])
      }
    : undefined

  // update cover & collection from retrieved data
  useEffect(() => {
    if (!data?.article) {
      return
    }

    // cover, find from `article.assets` since `article.cover` isn't a `Asset`
    const currCover = assets.find((asset) => asset.path === data.article?.cover)
    if (currCover) {
      editCover(currCover)
    }

    // collection
    editCollection(data.article.collection.edges?.map(({ node }) => node) || [])
  }, [data?.article?.id])

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

  const drafts = data?.article?.drafts || []
  const draft = drafts[0]
  const count = 3 - (drafts.length || 0)
  const isSameHash = draft.mediaHash === article.mediaHash
  const isPending = draft.publishState === 'pending'
  const isEditDisabled = !isSameHash || isPending
  const isReviseDisabled = isEditDisabled || count <= 0

  if (!draft) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Cover
            cover={cover?.path}
            assets={assets}
            entityId={article.id}
            entityType={ENTITY_TYPE.article}
            onEdit={editCover}
            refetchAssets={refetchAssets}
            disabled={isEditDisabled}
          />

          <Sidebar.Tags
            tags={tags}
            onEdit={editTags}
            disabled={isEditDisabled}
          />

          <Sidebar.Collection
            articles={collection}
            onEdit={editCollection}
            disabled={isEditDisabled}
          />

          {toggleCircle && features.circle_management && (
            <Sidebar.Management
              circle={circle}
              onEdit={toggleCircle}
              disabled={isAttachedCircle}
            />
          )}
        </>
      }
      inEditor
    >
      <Layout.Header
        left={
          <Layout.Header.BackButton onClick={onCancel} disabled={isPending} />
        }
        right={
          <EditModeHeader
            article={article}
            cover={cover}
            editData={editData}
            tags={tags}
            collection={collection}
            circle={circle}
            count={count}
            isSameHash={isSameHash}
            onSaved={onSaved}
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
          isTitleReadOnly
          update={async (update) => setEditData(update)}
          upload={async () => ({ id: '', path: '' })}
        />
      </Layout.Spacing>

      {!isLargeUp && (
        <BottomBar
          disabled={isEditDisabled}
          // cover
          cover={cover?.path}
          assets={assets}
          editCover={editCover}
          refetchAssets={refetchAssets}
          entityId={article.id}
          entityType={ENTITY_TYPE.article}
          // tags
          tags={tags}
          editTags={editTags}
          // collection
          collection={collection}
          editCollection={editCollection}
          // circle
          circle={circle}
          toggleCircle={toggleCircle}
          canToggleCircle={!isAttachedCircle}
        />
      )}

      {!isReviseDisabled && <ReviseArticleDialog count={count} />}

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default EditMode
