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
  SetResponseProps,
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

import {
  EDIT_ARTICLE_SUPPORT_SETTING,
  EDIT_MODE_ARTICLE,
  EDIT_MODE_ARTICLE_ASSETS,
} from './gql'
import EditModeHeader from './Header'
import PublishState from './PublishState'
import styles from './styles.module.css'

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

const Editor = dynamic(
  () =>
    import('~/components/Editor/Article').then((mod) => mod.EditArticleEditor),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
)

const EditMode: React.FC<EditModeProps> = ({ article, onCancel, onSaved }) => {
  const [editContent, setEditContent] = useState('')
  const [showPublishState, setShowPublishState] = useState(false)
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

  // cc2.0 is replace by cc4.0 when editting article
  const initialLicense =
    article.license === ArticleLicenseType.CcByNcNd_2
      ? ArticleLicenseType.CcByNcNd_4
      : article.license
  const [license, editLicense] = useState<ArticleLicenseType>(initialLicense)

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

  const [contentSensitive, setContentSensitive] = useState<boolean>(
    article.sensitiveByAuthor
  )

  const [iscnPublish, setIscnPublish] = useState<boolean>(false) // always start false

  const [canComment, setCanComment] = useState<boolean>(article.canComment)

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

  const setCommentProps: SetResponseProps = {
    canComment,
    toggleComment: setCanComment,
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

    contentSensitive,
    toggleContentSensitive() {
      setContentSensitive(!contentSensitive)
    },
    contentSensitiveSaving: false,

    togglePublishISCN() {
      setIscnPublish(!iscnPublish)
    },
    iscnPublishSaving: false,
  }

  return (
    <>
      <Layout.Main
        aside={
          <section className={styles.sidebar}>
            <Sidebar.Tags {...tagsProps} />
            <Sidebar.Cover {...coverProps} />
            <Sidebar.Collection {...collectionProps} />
            <Sidebar.Response
              inSidebar
              disableChangeCanComment={article.canComment}
              {...setCommentProps}
            />

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
          </section>
        }
        inEditor
      >
        <Layout.Header
          mode="compact"
          right={
            <EditModeHeader
              {...coverProps}
              {...tagsProps}
              {...collectionProps}
              {...accessProps}
              {...setCommentProps}
              article={article}
              draft={draft as any}
              editContent={editContent || draft.content || ''}
              coverId={cover?.id}
              revisionCountLeft={revisionCountLeft}
              isOverRevisionLimit={isOverRevisionLimit}
              isSameHash={isSameHash}
              isEditDisabled={isEditDisabled}
              onSaved={() => {
                onSaved()
              }}
              onPublish={() => {
                setShowPublishState(true)
              }}
            />
          }
        />

        {showPublishState && (
          <PublishState article={article} cancel={onCancel} />
        )}

        <Layout.Main.Spacing>
          <Editor
            draft={draft}
            update={async (update) => {
              setEditContent(update.content || '')
            }}
            upload={async () => ({ id: '', path: '' })}
          />
        </Layout.Main.Spacing>

        <Media lessThan="lg">
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
                {...setCommentProps}
                onOpenSupportSetting={openDialog}
              />
            )}
          </SupportSettingDialog>
        </Media>
      </Layout.Main>

      {!isReviseDisabled && (
        <ReviseArticleDialog revisionCountLeft={revisionCountLeft} />
      )}
    </>
  )
}

export default EditMode
