import { useQuery } from '@apollo/react-hooks'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { ENTITY_TYPE, MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'
import {
  EmptyLayout,
  Layout,
  Media,
  ReviseArticleDialog,
  Spinner,
  Throw404,
} from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
import BottomBar from '~/components/Editor/BottomBar'
import Sidebar from '~/components/Editor/Sidebar'
import SupportSettingDialog from '~/components/Editor/ToggleAccess/SupportSettingDialog'
import { QueryError, useImperativeQuery, useMutation } from '~/components/GQL'
import {
  ArticleAccessType,
  ArticleDetailPublicQuery,
  ArticleDigestDropdownArticleFragment,
  ArticleLicenseType,
  AssetFragment,
  DigestRichCirclePublicFragment,
  DigestTagFragment,
  EditArticleSupportSettingMutation,
  EditModeArticleAssetsQuery,
  EditModeArticleQuery,
} from '~/gql/graphql'

import ConfirmExitDialog from './ConfirmExitDialog'
import {
  EDIT_ARTICLE_SUPPORT_SETTING,
  EDIT_MODE_ARTICLE,
  EDIT_MODE_ARTICLE_ASSETS,
} from './gql'
import EditModeHeader from './Header'
import PublishState from './PublishState'
import styles from './styles.css'

interface EditModeProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  onCancel: () => void
  onSaved: () => void
}

export const useEditArticleDetailSupportSetting = (
  article?: ArticleDetailPublicQuery['article']
) => {
  const articleId = article?.id
  const [update, { loading: saving }] =
    useMutation<EditArticleSupportSettingMutation>(EDIT_ARTICLE_SUPPORT_SETTING)

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
  const [editData, setEditData] = useState<Record<string, any>>({})
  const { data, loading, error } = useQuery<EditModeArticleQuery>(
    EDIT_MODE_ARTICLE,
    {
      variables: { id: article.id },
      fetchPolicy: 'network-only',
    }
  )
  const editModeArticle = data?.article as NonNullable<
    EditModeArticleQuery['article'] & {
      __typename: 'Article'
    }
  >

  // cover
  const assets = editModeArticle?.assets || []
  const [cover, editCover] = useState<AssetFragment>()
  const refetchAssets = useImperativeQuery<EditModeArticleAssetsQuery>(
    EDIT_MODE_ARTICLE_ASSETS,
    {
      variables: { id: article.id },
      fetchPolicy: 'network-only',
    }
  )

  // tags
  const [tags, editTags] = useState<DigestTagFragment[]>(article.tags || [])
  const [collection, editCollection] = useState<
    ArticleDigestDropdownArticleFragment[]
  >([])

  // access
  const [circle, editCircle] = useState<
    DigestRichCirclePublicFragment | null | undefined
  >(article.access.circle)
  const [accessType, editAccessType] = useState<ArticleAccessType>(
    article.access.type
  )
  const [license, editLicense] = useState<ArticleLicenseType>(article.license)

  const ownCircles = editModeArticle?.author.ownCircles
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
      paywalled ? ArticleAccessType.Paywall : ArticleAccessType.Public
    )
    editLicense(newLicense)
  }

  // update cover & collection from retrieved data
  useEffect(() => {
    if (!editModeArticle) {
      return
    }

    // cover, find from `article.assets` since `article.cover` isn't a `Asset`
    const currCover = assets.find(
      (asset) => asset.path === editModeArticle?.cover
    )
    if (currCover) {
      editCover(currCover)
    }

    // collection
    editCollection(
      editModeArticle?.collection.edges?.map(({ node }) => node) || []
    )
  }, [editModeArticle?.id])

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

  const drafts = editModeArticle?.drafts
  const draft = drafts?.[0]
  const revisionCountLeft =
    MAX_ARTICLE_REVISION_COUNT - (editModeArticle?.revisionCount || 0)
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
    editCover: async (asset?: AssetFragment) => editCover(asset),
    refetchAssets,
    entityId: article.id,
    entityType: ENTITY_TYPE.article,
  }
  const tagsProps: SetTagsProps = {
    tags,
    tagsSaving: false,
    editTags: async (t: DigestTagFragment[]) => editTags(t),
  }
  const collectionProps: SetCollectionProps = {
    collection,
    collectionSaving: false,
    editCollection: async (c: ArticleDigestDropdownArticleFragment[]) =>
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

            <Media lessThan="xl">
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
            </Media>
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
