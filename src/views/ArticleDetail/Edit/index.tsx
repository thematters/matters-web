import { useQuery } from '@apollo/react-hooks'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { ENTITY_TYPE, MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'
import {
  EmptyLayout,
  Layout,
  Media,
  ReviseArticleDialog,
  SpinnerBlock,
  Throw404,
  useRoute,
  ViewerContext,
} from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
  SetVersionDescriptionProps,
  ToggleAccessProps,
} from '~/components/Editor'
import BottomBar from '~/components/Editor/BottomBar'
import Sidebar from '~/components/Editor/Sidebar'
import SupportSettingDialog from '~/components/Editor/ToggleAccess/SupportSettingDialog'
import { QueryError, useImperativeQuery } from '~/components/GQL'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  ArticleLicenseType,
  AssetFragment,
  DigestRichCirclePublicFragment,
  DigestTagFragment,
  QueryEditArticleAssetsQuery,
  QueryEditArticleQuery,
} from '~/gql/graphql'

import { GET_EDIT_ARTICLE, GET_EDIT_ARTICLE_ASSETS } from './gql'
import EditHeader from './Header'
import PublishState from './PublishState'
import styles from './styles.module.css'

type Article = NonNullable<
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
  const assets = article.assets || []
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

  const accessProps: ToggleAccessProps = {
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
              {...versionDescriptionProps}
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

        {showPublishState && (
          <PublishState
            articleId={article.id}
            currVersionId={article.versions.edges[0]?.node.id!}
          />
        )}

        <Layout.Main.Spacing>
          <Editor
            draft={{
              // mock a draft
              __typename: 'Draft',
              id: article.id,
              title: article.title,
              publishState: (showPublishState
                ? 'pending'
                : 'unpublished') as any,
              content: article.contents.html,
              summary: article.summary,
              summaryCustomized: article.summaryCustomized,
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
            upload={async () => ({ id: '', path: '' })}
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
                saving={false}
                disabled={false}
                {...coverProps}
                {...tagsProps}
                {...collectionProps}
                {...accessProps}
                {...setCommentProps}
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
