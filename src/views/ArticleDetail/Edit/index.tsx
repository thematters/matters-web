import { useQuery } from '@apollo/client'
import _omit from 'lodash/omit'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import {
  ASSET_TYPE,
  ENTITY_TYPE,
  MAX_ARTICLE_CONTENT_LENGTH,
  MAX_ARTICLE_REVISION_COUNT,
} from '~/common/enums'
import {
  DrawerProvider,
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
  SetConnectionsProps,
  SetCoverProps,
  SetTagsProps,
} from '~/components/Editor'
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

const DynamicOptionDrawer = dynamic(
  () => import('./OptionDrawer').then((mod) => mod.OptionDrawer),
  {
    ssr: false,
  }
)

import { stripHtml } from '~/common/utils'
import { SidebarCanCommentProps } from '~/components/Editor/Sidebar/CanComment'
import { SidebarCollectionsProps } from '~/components/Editor/Sidebar/Collections'
import { SidebarISCNProps } from '~/components/Editor/Sidebar/ISCN'
import { SidebarLicenseProps } from '~/components/Editor/Sidebar/License'
import { SidebarSensitiveProps } from '~/components/Editor/Sidebar/Sensitive'

import { GET_EDIT_ARTICLE, GET_EDIT_ARTICLE_ASSETS } from './gql'
import { getOptionTabByType, OptionTab, useViewer } from './Hooks'
import { useCampaignState } from './Hooks/useCampaignState'
import { OptionButton } from './OptionButton'
import { OptionContent } from './OptionContent'
import OptionsPage from './OptionsPage'
import PublishButton from './PublishButton'
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
  const [isOpenOptionDrawer, setIsOpenOptionDrawer] = useState(false)
  const toggleOptionDrawer = () => {
    setIsOpenOptionDrawer((prevState) => !prevState)
  }
  const { getQuery } = useRoute()
  const [showReviseDialog, setShowReviseDialog] = useState(true)

  const isInArticleEditOptions = getQuery('page') === 'options'
  const type = getQuery('type')
  const [tab, setTab] = useState<OptionTab>(getOptionTabByType(type))

  useEffect(() => {
    setTab(getOptionTabByType(type))
  }, [type])

  const {
    viewerData,
    ownCircles,
    ownCollections,
    // appliedCampaigns,
    loadMoreCollections,
  } = useViewer()

  const [showPublishState, setShowPublishState] = useState(false)

  const [versionDescription, setVersionDescription] = useState('')

  // content-related
  const [title, setTitle] = useState(article.title)
  const [summary, setSummary] = useState(article.summary)
  const [content, setContent] = useState(article.contents.html)

  const contentLength = stripHtml(content || '').length
  const isOverLength = contentLength > MAX_ARTICLE_CONTENT_LENGTH

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

  // connections
  const [connections, setConnections] = useState<
    ArticleDigestDropdownArticleFragment[]
  >(article.connections.edges?.map(({ node }) => node) || [])

  // collections
  const [checkedCollections, setCheckedCollections] = useState<string[]>(
    article.collections.edges?.map(({ node }) => node.id) || []
  )

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

  const editAccess = (
    addToCircle: boolean,
    paywalled: boolean,
    newLicense: ArticleLicenseType
  ) => {
    setCircle(addToCircle ? ownCircles?.[0] : null)
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
  const connectionsProps: SetConnectionsProps = {
    connections,
    connectionsSaving: false,
    editConnections: async (c: ArticleDigestDropdownArticleFragment[]) =>
      setConnections(c),
    nodeExclude: article.id,
  }

  const collectionsProps: SidebarCollectionsProps = {
    collections: ownCollections || [],
    checkedCollections:
      ownCollections?.filter((c) => checkedCollections.includes(c.id)) || [],
    collectionsSaving: false,
    editCollections: async (collections: string[]) => {
      setCheckedCollections(collections)
    },
    loadMore: loadMoreCollections,
    hasNextPage: !!viewerData?.viewer?.collections?.pageInfo?.hasNextPage,
  }

  const indentProps: SidebarIndentProps = {
    indented,
    toggleIndent: setIndented,
    indentSaving: false,
  }

  const licenseProps: SidebarLicenseProps = {
    license,
    circle,
    editAccess,
    saving: false,
  }

  const canCommentProps: SidebarCanCommentProps = {
    canComment,
    editCanComment: setCanComment,
    saving: false,
  }

  const supportSettingProps = {
    requestForDonation,
    replyToDonator,
    editSupportSetting,
    supportSettingSaving: false,
  }

  const sensitiveProps: SidebarSensitiveProps = {
    sensitive: contentSensitive,
    toggleSensitive: () => setContentSensitive(!contentSensitive),
    sensitiveSaving: false,
  }

  const iscnProps: SidebarISCNProps = {
    iscnPublish,
    toggleISCN: () => setIscnPublish(!iscnPublish),
    iscnPublishSaving: false,
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
  if (isInArticleEditOptions) {
    return (
      <OptionsPage>
        <OptionContent
          tab={tab}
          setTab={setTab}
          article={article}
          ownCircles={ownCircles}
          ownCollections={ownCollections}
          campaigns={selectableCampaigns || []}
          selectedCampaign={selectedCampaign}
          selectedStage={selectedStage}
          editCampaign={setCampaign}
          {...coverProps}
          {...tagsProps}
          {...connectionsProps}
          {...collectionsProps}
          {...indentProps}
          {...licenseProps}
          {...canCommentProps}
          {...supportSettingProps}
          {...sensitiveProps}
          {...iscnProps}
        />
      </OptionsPage>
    )
  }

  return (
    <>
      <Layout
        header={
          <>
            <section className={styles.header}>
              <section className={styles.headerRight}>
                {isOverLength && (
                  <span className={styles.count}>
                    {contentLength} / {MAX_ARTICLE_CONTENT_LENGTH}
                  </span>
                )}
                <OptionButton onClick={toggleOptionDrawer} />
                <section className={styles.publishButtons}>
                  <PublishButton
                    article={article}
                    title={title}
                    summary={summary}
                    content={content}
                    tags={tags}
                    connections={connections}
                    collections={collectionsProps.checkedCollections}
                    cover={cover || null}
                    requestForDonation={requestForDonation}
                    replyToDonator={replyToDonator}
                    circle={circle || null}
                    accessType={accessType}
                    license={license}
                    canComment={canComment}
                    indentFirstLine={indented}
                    sensitiveByAuthor={contentSensitive}
                    iscnPublish={iscnPublish}
                    onPublish={() => {
                      setShowPublishState(true)
                    }}
                    isOverRevisionLimit={isOverRevisionLimit}
                    selectedCampaign={selectedCampaign}
                    selectedStage={selectedStage}
                    versionDescription={versionDescription}
                    editVersionDescription={setVersionDescription}
                  />
                </section>
              </section>
            </section>
          </>
        }
      >
        {showPublishState && article.versions.edges[0]?.node.id && (
          <PublishState
            articleId={article.id}
            currVersionId={article.versions.edges[0]?.node.id}
          />
        )}
        <Layout.Main>
          <section className={styles.editor}>
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
          </section>

          <Media greaterThan="sm">
            <DynamicOptionDrawer
              isOpen={isOpenOptionDrawer}
              toggleDrawer={toggleOptionDrawer}
              article={article}
              ownCircles={ownCircles}
              ownCollections={ownCollections}
              campaigns={selectableCampaigns || []}
              selectedCampaign={selectedCampaign}
              selectedStage={selectedStage}
              editCampaign={setCampaign}
              {...coverProps}
              {...tagsProps}
              {...connectionsProps}
              {...collectionsProps}
              {...indentProps}
              {...licenseProps}
              {...canCommentProps}
              {...supportSettingProps}
              {...sensitiveProps}
              {...iscnProps}
            />
          </Media>
        </Layout.Main>

        {showReviseDialog && (
          <ReviseArticleDialog
            revisionCountLeft={revisionCountLeft}
            onCloseDialog={() => setShowReviseDialog(false)}
          />
        )}
      </Layout>
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
  const { loading: viewerLoading } = useViewer()
  const article = data?.article
  const isAuthor = viewer.id === article?.author.id

  /**
   * Render
   */
  if (loading || viewerLoading) {
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

  return (
    <DrawerProvider>
      <BaseEdit article={article as Article} />
    </DrawerProvider>
  )
}

export default Edit
