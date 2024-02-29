import { useQuery } from '@apollo/react-hooks'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { ENTITY_TYPE, MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'
import { toGlobalId } from '~/common/utils'
import {
  EmptyLayout,
  Layout,
  Media,
  ReviseArticleDialog,
  Spinner,
  Throw404,
  useRoute,
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

import { useEditArticleDetailSupportSetting } from '../Hook'
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
  () =>
    import('~/components/Editor/Article').then((mod) => mod.EditArticleEditor),
  { ssr: false, loading: () => <Spinner /> }
)

const BaseEdit = ({ article }: { article: Article }) => {
  const [editContent, setEditContent] = useState('')
  const [showPublishState, setShowPublishState] = useState(false)

  // cover
  const assets = article.assets || []
  const [cover, editCover] = useState<AssetFragment>()
  const refetchAssets = useImperativeQuery<QueryEditArticleAssetsQuery>(
    GET_EDIT_ARTICLE_ASSETS,
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

    editCircle(addToCircle ? ownCircles[0] : null)
    editAccessType(
      paywalled ? ArticleAccessType.Paywall : ArticleAccessType.Public
    )
    editLicense(newLicense)
  }

  // update cover & collection from retrieved data
  useEffect(() => {
    if (!article) {
      return
    }

    // cover, find from `article.assets` since `article.cover` isn't a `Asset`
    const currCover = assets.find((asset) => asset.path === article.cover)
    if (currCover) {
      editCover(currCover)
    }

    // collection
    editCollection(article.collection.edges?.map(({ node }) => node) || [])
  }, [article.id])

  const { edit: editSupport, saving: supportSaving } =
    useEditArticleDetailSupportSetting(article.id)

  const [contentSensitive, setContentSensitive] = useState<boolean>(
    article.sensitiveByAuthor
  )

  // always start false
  const [iscnPublish, setIscnPublish] = useState<boolean>(false)

  const [canComment, setCanComment] = useState<boolean>(article.canComment)

  const revisionCountLeft =
    MAX_ARTICLE_REVISION_COUNT - (article?.revisionCount || 0)
  const isOverRevisionLimit = revisionCountLeft <= 0
  const isReviseDisabled = isOverRevisionLimit

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

  const onSaved = () => {} // TODO

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
            <EditHeader
              {...coverProps}
              {...tagsProps}
              {...collectionProps}
              {...accessProps}
              {...setCommentProps}
              article={article}
              lastContent={article.contents.html}
              editContent={editContent || article.contents.html || ''}
              coverId={cover?.id}
              revisionCountLeft={revisionCountLeft}
              isOverRevisionLimit={isOverRevisionLimit}
              isEditDisabled={false}
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
          <PublishState
            articleId={article.id}
            currVersionId={article.versions.edges[0]?.node.id!}
          />
        )}

        <Layout.Main.Spacing>
          <Editor
            draft={{
              __typename: 'Draft',
              id: article.id,
              title: article.title,
              publishState: 'unpublished' as any,
              content: article.contents.html,
              summary: article.summary,
              summaryCustomized: article.summaryCustomized,
            }}
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
                saving={false}
                disabled={false}
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

const Edit = () => {
  const { router } = useRoute()
  const articleId =
    (router.query.mediaHash as string)?.match(/^(\d+)/)?.[1] || ''

  const { data, loading, error } = useQuery<QueryEditArticleQuery>(
    GET_EDIT_ARTICLE,
    {
      variables: { id: toGlobalId({ type: 'Article', id: articleId }) },
      fetchPolicy: 'network-only',
    }
  )
  const article = data?.article as Article

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

  if (!article) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return <BaseEdit article={article} />
}

export default Edit
