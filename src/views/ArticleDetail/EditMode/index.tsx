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
  useResponsive,
} from '~/components'
import { QueryError, useImperativeQuery } from '~/components/GQL'

import styles from '../styles.css'
import EditModeBottomBar from './BottomBar'
import { EDIT_MODE_ARTICLE, EDIT_MODE_ARTICLE_ASSETS } from './gql'
import EditModeHeader from './Header'
import PublishState from './PublishState'
import EditModeSidebar from './Sidebar'

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

  // staging editing data
  const [content, editContent] = useState<string | null>(null)
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
  const refetchAssets = useImperativeQuery<EditModeArticleAssets>(
    EDIT_MODE_ARTICLE_ASSETS,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  // Add first circle to article
  // Note: the author can only have one circle now
  const isAttachedCircle = !!article.circle
  const ownCircles = data?.article?.author.ownCircles
  const hasCircles = ownCircles && ownCircles.length >= 1
  const toggleCircle = () => {
    if (!ownCircles) {
      return
    }

    editCircle(circle ? null : ownCircles[0])
  }

  useEffect(() => {
    if (!data?.article) {
      return
    }

    // cover, find from `article.assets` since `article.cover` isn't a `Asset`
    const assets = data.article.assets
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

  if (!draft) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  const isSameHash = draft.mediaHash === article.mediaHash
  const isPending = draft.publishState === 'pending'
  const isEditDisabled = !isSameHash || isPending
  const isReviseDisabled = isEditDisabled || count <= 0

  return (
    <Layout.Main
      aside={
        <EditModeSidebar
          article={article}
          cover={cover}
          assets={data?.article?.assets || []}
          tags={tags}
          collection={collection}
          circle={circle}
          editCover={editCover}
          editTags={editTags}
          editCollection={editCollection}
          toggleCircle={hasCircles ? toggleCircle : undefined}
          canToggleCircle={!isAttachedCircle}
          refetchAssets={refetchAssets}
          disabled={isEditDisabled}
        />
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
            content={content}
            cover={cover}
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
          update={async (update) => editContent(update.content || '')}
          upload={async () => ({ id: '', path: '' })}
        />
      </Layout.Spacing>

      {!isLargeUp && (
        <EditModeBottomBar
          article={article}
          cover={cover}
          assets={data?.article?.assets || []}
          tags={tags}
          collection={collection}
          circle={circle}
          editCover={editCover}
          editTags={editTags}
          editCollection={editCollection}
          toggleCircle={hasCircles ? toggleCircle : undefined}
          canToggleCircle={!isAttachedCircle}
          refetchAssets={refetchAssets}
          disabled={isEditDisabled}
        />
      )}

      {!isReviseDisabled && <ReviseArticleDialog count={count} />}

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default EditMode
