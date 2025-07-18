import { useQuery } from '@apollo/client'
import _omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_ARTICLE_REVISION_COUNT,
} from '~/common/enums'
import {
  EmptyLayout,
  Layout,
  Media,
  ReviseArticleDialog,
  SpinnerBlock,
  Throw404,
  useDirectImageUpload,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  MoreSettingsProps,
  SetCollectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
  SetVersionDescriptionProps,
} from '~/components/Editor'
import BottomBar from '~/components/Editor/BottomBar'
import SupportSettingDialog from '~/components/Editor/MoreSettings/SupportSettingDialog'
import { SelectCampaignProps } from '~/components/Editor/SelectCampaign'
import Sidebar from '~/components/Editor/Sidebar'
import { SidebarIndentProps } from '~/components/Editor/Sidebar/Indent'
import { QueryError, useImperativeQuery } from '~/components/GQL'
import {
  DIRECT_IMAGE_UPLOAD,
  DIRECT_IMAGE_UPLOAD_DONE,
  SINGLE_FILE_UPLOAD,
} from '~/components/GQL/mutations/uploadFile'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  ArticleLicenseType,
  AssetFragment,
  AssetType,
  DigestRichCirclePublicFragment,
  DigestTagFragment,
  DirectImageUploadDoneMutation,
  DirectImageUploadMutation,
  PublishState as PublishStateType,
  QueryEditArticleAssetsQuery,
  QueryEditArticleQuery,
  SingleFileUploadMutation,
} from '~/gql/graphql'

import { GET_EDIT_ARTICLE, GET_EDIT_ARTICLE_ASSETS } from './gql'
import EditHeader from './Header'
import { useCampaignState } from './Hooks/useCampaignState'
import PublishState from './PublishState'
import styles from './styles.module.css'

export type Article = NonNullable<
  QueryEditArticleQuery['article'] & {
    __typename: 'Article'
  }
>

const Editor = dynamic(
  () => import('~/components/Editor/Article').then((mod) => mod.ArticleEditor),
  { ssr: false, loading: () => <SpinnerBlock /> }
)

const BaseEdit = ({ article }: { article: Article }) => {
  const [showPublishState, setShowPublishState] = useState(false)

  const [versionDescription, setVersionDescription] = useState('')

  // content-related
  const [title, setTitle] = useState(article.title)
  const [summary, setSummary] = useState(article.summary)
  const [content, setContent] = useState(article.contents.html)

  // cover
  const [assets, setAssets] = useState(article.assets || [])

  useEffect(() => {
    setAssets(article.assets || [])
  }, [article.assets])
  const [cover, setCover] = useState<AssetFragment | undefined>(
    assets.find((asset) => asset.path === article.cover)
  )
  const refetchAssets = useImperativeQuery<QueryEditArticleAssetsQuery>(
    GET_EDIT_ARTICLE_ASSETS,
    {
      variables: { id: article.id },
      fetchPolicy: 'network-only',
    }
  )

  // tags
  const [tags, setTags] = useState<DigestTagFragment[]>(article.tags || [])
  const [collection, setCollection] = useState<
    ArticleDigestDropdownArticleFragment[]
  >(article.collection.edges?.map(({ node }) => node) || [])

  // access
  const [circle, setCircle] = useState<
    DigestRichCirclePublicFragment | null | undefined
  >(article.access.circle)
  const [accessType, setAccessType] = useState<ArticleAccessType>(
    article.access.type
  )

  // cc2.0 is replace by cc4.0 when editing article
  const [license, setLicense] = useState<ArticleLicenseType>(
    article.license === ArticleLicenseType.CcByNcNd_2
      ? ArticleLicenseType.CcByNcNd_4
      : article.license
  )

  const ownCircles = article.author.ownCircles
  const hasOwnCircle = ownCircles && ownCircles.length >= 1
  const editAccess = (
    addToCircle: boolean,
    paywalled: boolean,
    newLicense: ArticleLicenseType
  ) => {
    if (!ownCircles) {
      return
    }

    setCircle(addToCircle ? ownCircles[0] : null)
    setAccessType(
      paywalled ? ArticleAccessType.Paywall : ArticleAccessType.Public
    )
    setLicense(newLicense)
  }

  const { setCampaign, selectedCampaign, selectedStage, selectableCampaigns } =
    useCampaignState(article)

  const [requestForDonation, setRequestForDonation] = useState(
    article.requestForDonation
  )
  const [replyToDonator, setReplyToDonator] = useState(article.replyToDonator)
  const editSupportSetting = (request: string | null, reply: string | null) => {
    setRequestForDonation(request)
    setReplyToDonator(reply)
  }

  const [contentSensitive, setContentSensitive] = useState<boolean>(
    article.sensitiveByAuthor
  )

  // always start false
  const [iscnPublish, setIscnPublish] = useState<boolean>(false)

  const [canComment, setCanComment] = useState<boolean>(article.canComment)

  const [indented, setIndented] = useState<boolean>(article.indentFirstLine)

  const revisionCountLeft =
    MAX_ARTICLE_REVISION_COUNT - (article?.revisionCount || 0)
  const isOverRevisionLimit = revisionCountLeft <= 0

  const coverProps: SetCoverProps = {
    cover: cover?.path,
    assets,
    coverSaving: false,
    editCover: async (asset?: AssetFragment) => setCover(asset),
    refetchAssets,
    entityId: article.id,
    entityType: ENTITY_TYPE.article,
  }
  const tagsProps: SetTagsProps = {
    tags,
    tagsSaving: false,
    editTags: async (t: DigestTagFragment[]) => setTags(t),
  }
  const collectionProps: SetCollectionProps = {
    collection,
    collectionSaving: false,
    editCollection: async (c: ArticleDigestDropdownArticleFragment[]) =>
      setCollection(c),
    nodeExclude: article.id,
  }
  const setCommentProps: SetResponseProps = {
    canComment,
    toggleComment: setCanComment,
  }
  const setIndentProps: SidebarIndentProps = {
    indented,
    toggleIndent: setIndented,
    indentSaving: false,
  }
  const campaignProps: Partial<SelectCampaignProps> = {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
    editCampaign: setCampaign,
  }

  const indentProps: SidebarIndentProps = {
    indented,
    toggleIndent: setIndented,
    indentSaving: false,
  }

  const accessProps: MoreSettingsProps = {
    circle,
    accessType,
    license,
    accessSaving: false,
    editAccess,
    canToggleCircle: !!hasOwnCircle && !isOverRevisionLimit,
    iscnPublish,

    article: { ...article, replyToDonator, requestForDonation },
    editSupportSetting,
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

  const versionDescriptionProps: SetVersionDescriptionProps = {
    versionDescription: versionDescription,
    editVersionDescription: setVersionDescription,
  }

  const [singleFileUpload] =
    useMutation<SingleFileUploadMutation>(SINGLE_FILE_UPLOAD)
  const [directImageUpload] =
    useMutation<DirectImageUploadMutation>(DIRECT_IMAGE_UPLOAD)
  const [directImageUploadDone] = useMutation<DirectImageUploadDoneMutation>(
    DIRECT_IMAGE_UPLOAD_DONE,
    undefined,
    { showToast: false }
  )
  const { upload: uploadImage } = useDirectImageUpload()

  const upload = async (input: {
    [key: string]: string | File
  }): Promise<{ id: string; path: string }> => {
    const isImage = input.type !== ASSET_TYPE.embedaudio

    const variables = {
      input: {
        type: ASSET_TYPE.embed,
        entityType: ENTITY_TYPE.article,
        entityId: article.id,
        ...input,
      },
    }

    const trySingleUpload = async () => {
      const result = await singleFileUpload({
        variables: _omit(variables, ['input.mime']),
      })
      const { id: assetId, path } = result?.data?.singleFileUpload || {}

      if (assetId && path) {
        return { id: assetId, path }
      } else {
        throw new Error('upload not successful')
      }
    }

    const tryDirectUpload = async () => {
      const result = await directImageUpload({
        variables: _omit(variables, ['input.file']),
      })
      const {
        id: assetId,
        path,
        uploadURL,
      } = result?.data?.directImageUpload || {}

      if (assetId && path && uploadURL && input.file instanceof File) {
        try {
          await uploadImage({ uploadURL, file: input.file })
        } catch (error) {
          console.error(error)
          throw new Error('upload not successful')
        }

        // (async) mark asset draft as false
        directImageUploadDone({
          variables: {
            ..._omit(variables.input, ['file']),
            draft: false,
            url: path,
          },
        }).catch(console.error)

        setAssets((assets) => [
          ...assets,
          { id: assetId, path, type: AssetType.Embed },
        ])

        return { id: assetId, path }
      } else {
        throw new Error('upload not successful')
      }
    }

    // upload via directImageUpload
    if (isImage) {
      try {
        return await tryDirectUpload()
      } catch {
        return await trySingleUpload()
      }
    }
    // upload via singleFileUpload
    else {
      return trySingleUpload()
    }
  }

  return (
    <>
      <Layout.Main
        aside={
          <section className={styles.sidebar}>
            <Sidebar.Campaign {...campaignProps} />
            <Sidebar.Cover {...coverProps} />
            <Sidebar.Indent {...indentProps} />
            <Sidebar.Tags {...tagsProps} />
            <Sidebar.Collection {...collectionProps} />
            <Sidebar.Response
              inSidebar
              disableChangeCanComment={article.canComment}
              {...setCommentProps}
            />

            <SupportSettingDialog
              article={{ ...article, replyToDonator, requestForDonation }}
              editSupportSetting={editSupportSetting}
              supportSettingSaving={false}
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
      >
        <Layout.Header
          mode="compact"
          right={
            <EditHeader
              {...coverProps}
              {...tagsProps}
              {...collectionProps}
              {...accessProps}
              {...setCommentProps}
              {...setIndentProps}
              {...versionDescriptionProps}
              {...campaignProps}
              article={article}
              revision={{
                versionDescription,
                title,
                summary,
                content,
                cover,
                replyToDonator,
                requestForDonation,
              }}
              isOverRevisionLimit={isOverRevisionLimit}
              onPublish={() => {
                setShowPublishState(true)
              }}
            />
          }
        />

        {showPublishState && article.versions.edges[0]?.node.id && (
          <PublishState
            articleId={article.id}
            currVersionId={article.versions.edges[0]?.node.id}
          />
        )}

        <Layout.Main.Spacing>
          <Editor
            draft={{
              // mock a draft
              __typename: 'Draft',
              id: article.id,
              title: article.title,
              publishState: showPublishState
                ? PublishStateType.Pending
                : PublishStateType.Unpublished,
              content: article.contents.html,
              summary: article.summary,
              summaryCustomized: article.summaryCustomized,
              indentFirstLine: indented,
            }}
            update={async (update) => {
              if (update.title !== undefined) {
                setTitle(update.title || '')
              }

              if (update.summary !== undefined) {
                setSummary(update.summary || '')
              }

              if (update.content !== undefined) {
                setContent(update.content || '')
              }
            }}
            upload={upload}
          />
        </Layout.Main.Spacing>

        {/* BottomBar */}
        <Media lessThan="lg">
          <SupportSettingDialog
            article={{ ...article, replyToDonator, requestForDonation }}
            editSupportSetting={editSupportSetting}
            supportSettingSaving={false}
          >
            {({ openDialog: openSupportSettingDialog }) => (
              <BottomBar
                disabled={false}
                {...coverProps}
                {...tagsProps}
                {...collectionProps}
                {...accessProps}
                {...setCommentProps}
                {...campaignProps}
                {...indentProps}
                onOpenSupportSetting={openSupportSettingDialog}
              />
            )}
          </SupportSettingDialog>
        </Media>
      </Layout.Main>

      <ReviseArticleDialog revisionCountLeft={revisionCountLeft} />
    </>
  )
}

const Edit = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const { data, loading, error } = useQuery<QueryEditArticleQuery>(
    GET_EDIT_ARTICLE,
    { variables: { shortHash }, fetchPolicy: 'network-only' }
  )
  const article = data?.article
  const isAuthor = viewer.id === article?.author.id

  /**
   * Render
   */
  if (loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
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

  if (!article || !isAuthor) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return <BaseEdit article={article as Article} />
}

export default Edit
