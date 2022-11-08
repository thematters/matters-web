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
import {
  SetCollectionProps,
  SetCoverProps,
  // SetPublishISCNProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
import BottomBar from '~/components/Editor/BottomBar'
import Sidebar from '~/components/Editor/Sidebar'
import SupportSettingDialog from '~/components/Editor/ToggleAccess/SupportSettingDialog'
import { QueryError, useImperativeQuery, useMutation } from '~/components/GQL'

import { ENTITY_TYPE, MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'

import ConfirmExitDialog from './ConfirmExitDialog'
import {
  EDIT_ARTICLE_SUPPORT_SETTING,
  EDIT_MODE_ARTICLE,
  EDIT_MODE_ARTICLE_ASSETS,
} from './gql'
import EditModeHeader from './Header'
import PublishState from './PublishState'
import styles from './styles.css'

import {
  ArticleAccessType,
  ArticleLicenseType,
} from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article_Article } from '../__generated__/ArticleDetailPublic'
import { EditArticleSupportSetting } from './__generated__/EditArticleSupportSetting'
import { EditModeArticle } from './__generated__/EditModeArticle'
import { EditModeArticleAssets } from './__generated__/EditModeArticleAssets'

interface EditModeProps {
  article: ArticleDetailPublic_article_Article
  onCancel: () => void
  onSaved: () => void
}

export const useEditArticleDetailSupportSetting = (
  article?: ArticleDetailPublic_article_Article
) => {
  const articleId = article?.id
  const [update, { loading: saving }] = useMutation<EditArticleSupportSetting>(
    EDIT_ARTICLE_SUPPORT_SETTING
  )

  const edit = (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) =>
    update({
      variables: {
        id: articleId,
        requestForDonation,
        replyToDonator,
      },
    })
  return { edit, saving }
}

const Editor = dynamic(() => import('~/components/Editor/Article'), {
  ssr: false,
  loading: Spinner,
})

const EditMode: React.FC<EditModeProps> = ({ article, onCancel, onSaved }) => {
  const isLargeUp = useResponsive('lg-up')

  const [editData, setEditData] = useState<Record<string, any>>({})
  const { data, loading, error } = useQuery<EditModeArticle>(
    EDIT_MODE_ARTICLE,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  // cover
  const assets = data?.article?.assets || []
  const [cover, editCover] = useState<Asset>()
  const refetchAssets = useImperativeQuery<EditModeArticleAssets>(
    EDIT_MODE_ARTICLE_ASSETS,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  // tags
  const [tags, editTags] = useState<DigestTag[]>(article.tags || [])
  const [collection, editCollection] = useState<ArticleDigestDropdownArticle[]>(
    []
  )

  // access
  const [circle, editCircle] = useState<DigestRichCirclePublic | null>(
    article.access.circle
  )
  const [accessType, editAccessType] = useState<ArticleAccessType>(
    article.access.type
  )
  const [license, editLicense] = useState<ArticleLicenseType>(article.license)

  const ownCircles = data?.article?.author.ownCircles
  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const editAccess = (
    addToCircle: boolean,
    paywalled: boolean,
    newLicense: ArticleLicenseType
  ) => {
    if (!ownCircles) {
      return
    }

    editCircle(addToCircle ? ownCircles[0] : null)
    editAccessType(
      paywalled ? ArticleAccessType.paywall : ArticleAccessType.public
    )
    editLicense(newLicense)
  }

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

  const { edit: editSupport, saving: supportSaving } =
    useEditArticleDetailSupportSetting(article)

  const [iscnPublish, setIscnPublish] = useState<boolean>(false) // always start false

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

  const drafts = data?.article?.drafts
  const draft = drafts?.[0]
  const revisionCountLeft =
    MAX_ARTICLE_REVISION_COUNT - (data?.article?.revisionCount || 0)
  const isOverRevisionLimit = revisionCountLeft <= 0
  const isSameHash = draft?.mediaHash === article.mediaHash
  const isPending = draft?.publishState === 'pending'
  const isEditDisabled = !isSameHash || isPending
  const isReviseDisabled = isEditDisabled || isOverRevisionLimit

  if (!draft || !data?.article) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  const coverProps: SetCoverProps = {
    cover: cover?.path,
    assets,
    coverSaving: false,
    editCover: async (asset?: Asset) => editCover(asset),
    refetchAssets,
    entityId: article.id,
    entityType: ENTITY_TYPE.article,
  }
  const tagsProps: SetTagsProps = {
    tags,
    tagsSaving: false,
    editTags: async (t: DigestTag[]) => editTags(t),
  }
  const collectionProps: SetCollectionProps = {
    collection,
    collectionSaving: false,
    editCollection: async (c: ArticleDigestDropdownArticle[]) =>
      editCollection(c),
  }
  const accessProps: ToggleAccessProps = {
    circle,
    accessType,
    license,
    accessSaving: false,
    editAccess,
    canToggleCircle: !!hasOwnCircle && !isReviseDisabled,
    iscnPublish,

    article,
    editSupportSetting: editSupport,
    supportSettingSaving: false,
    onOpenSupportSetting: () => undefined,

    togglePublishISCN() {
      setIscnPublish(!iscnPublish)
    },
    iscnPublishSaving: false,
  }

  return (
    <>
      <ConfirmExitDialog onExit={onCancel}>
        {({ openDialog: openConfirmExitDialog }) => (
          <Layout.Main
            aside={
              <section className="sidebar">
                <Sidebar.Tags {...tagsProps} />
                <Sidebar.Cover {...coverProps} />
                <Sidebar.Collection {...collectionProps} />

                <SupportSettingDialog
                  article={article}
                  editSupportSetting={editSupport}
                  supportSettingSaving={supportSaving}
                >
                  {({ openDialog }) => (
                    <Sidebar.Management
                      {...accessProps}
                      onOpenSupportSetting={openDialog}
                    />
                  )}
                </SupportSettingDialog>
                <style jsx>{styles}</style>
              </section>
            }
            inEditor
          >
            <Layout.Header
              left={
                <Layout.Header.BackButton
                  onClick={
                    isOverRevisionLimit ? onCancel : openConfirmExitDialog
                  }
                  disabled={isEditDisabled}
                />
              }
              right={
                <EditModeHeader
                  {...coverProps}
                  {...tagsProps}
                  {...collectionProps}
                  {...accessProps}
                  article={article}
                  editData={editData}
                  coverId={cover?.id}
                  revisionCountLeft={revisionCountLeft}
                  isOverRevisionLimit={isOverRevisionLimit}
                  isSameHash={isSameHash}
                  isEditDisabled={isEditDisabled}
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
                isSummaryReadOnly
                isTitleReadOnly
                update={async (update) => setEditData(update)}
                upload={async () => ({ id: '', path: '' })}
              />
            </Layout.Spacing>

            {!isLargeUp && (
              <SupportSettingDialog
                article={article}
                editSupportSetting={editSupport}
                supportSettingSaving={supportSaving}
              >
                {({ openDialog }) => (
                  <BottomBar
                    saving={loading}
                    disabled={loading}
                    {...coverProps}
                    {...tagsProps}
                    {...collectionProps}
                    {...accessProps}
                    onOpenSupportSetting={openDialog}
                  />
                )}
              </SupportSettingDialog>
            )}
          </Layout.Main>
        )}
      </ConfirmExitDialog>

      {!isReviseDisabled && (
        <ReviseArticleDialog revisionCountLeft={revisionCountLeft} />
      )}
    </>
  )
}

export default EditMode
