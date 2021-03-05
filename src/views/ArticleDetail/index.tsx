import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import jump from 'jump.js'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import {
  BackToHomeButton,
  DateTime,
  EmptyLayout,
  Error,
  Head,
  Layout,
  PullToRefresh,
  QueryError,
  Spinner,
  Throw404,
  Title,
  Translate,
  useFeatures,
  usePublicQuery,
  useResponsive,
  useRoute,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { UserDigest } from '~/components/UserDigest'

import { ADD_TOAST, URL_QS } from '~/common/enums'
import { toPath } from '~/common/utils'

import Collection from './Collection'
import Content from './Content'
import CustomizedSummary from './CustomizedSummary'
import FingerprintButton from './FingerprintButton'
import {
  ARTICLE_DETAIL_PRIVATE,
  ARTICLE_DETAIL_PUBLIC,
  ARTICLE_TRANSLATION,
} from './gql'
import RelatedArticles from './RelatedArticles'
import State from './State'
import styles from './styles.css'
import SupportWidget from './SupportWidget'
import TagList from './TagList'
import Toolbar from './Toolbar'
import TranslationButton from './TranslationButton'
import CircleWall from './Wall/Circle'
import VisitorWall from './Wall/Visitor'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ArticleDetailPublic } from './__generated__/ArticleDetailPublic'
import { ArticleTranslation } from './__generated__/ArticleTranslation'

const DynamicResponse = dynamic(() => import('./Responses'), {
  ssr: false,
  loading: Spinner,
})

const DynamicEditMode = dynamic(() => import('./EditMode'), {
  ssr: false,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const ArticleDetail = () => {
  const { getQuery } = useRoute()
  const mediaHash = getQuery('mediaHash')
  const viewer = useContext(ViewerContext)

  // UI
  const features = useFeatures()
  const isLargeUp = useResponsive('lg-up')
  const isSmallUp = useResponsive('sm-up')
  const [fixedWall, setFixedWall] = useState(false)

  // wall
  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    {
      variables: { id: 'local' },
    }
  )
  const { wall } = clientPreferenceData?.clientPreference || { wall: true }
  const shouldShowWall = !viewer.isAuthed && wall

  // public data
  const {
    data,
    loading,
    error,
    client,
    refetch: refetchPublic,
  } = usePublicQuery<ArticleDetailPublic>(ARTICLE_DETAIL_PUBLIC, {
    variables: { mediaHash },
  })

  const article = data?.article
  const authorId = article?.author?.id
  const collectionCount = article?.collection?.totalCount || 0
  const isAuthor = viewer.id === authorId
  const circle = article?.circle
  const canReadFullContent = !!(
    isAuthor ||
    !circle ||
    circle.isMember ||
    article?.limitedFree
  )
  const summary = article?.summary
  const lockActions = !!(
    circle &&
    viewer.isAuthed &&
    (!isAuthor || !circle.isMember)
  )

  // fetch private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !article || !article?.mediaHash) {
      return
    }

    await client.query({
      query: ARTICLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        mediaHash: article?.mediaHash,
        includeCanSuperLike: viewer.isCivicLiker,
      },
    })

    setPrivateFetched(true)
  }

  useEffect(() => {
    setPrivateFetched(false)
  }, [mediaHash])

  useEffect(() => {
    loadPrivate()
  }, [article?.mediaHash, viewer.id])

  // translation
  const [translate, setTranslate] = useState(false)
  const language = article?.language
  const viewerLanguage = viewer.settings.language
  const shouldTranslate = language && language !== viewerLanguage

  const [
    getTranslation,
    { data: translationData, loading: translating },
  ] = useLazyQuery<ArticleTranslation>(ARTICLE_TRANSLATION)
  const titleTranslation = translationData?.article?.translation?.title
  const contentTranslation = translationData?.article?.translation?.content
  const onTranslate = (newTranslate: boolean) => {
    setTranslate(newTranslate)

    if (!newTranslate) {
      return
    }

    getTranslation({
      variables: { mediaHash, language: viewerLanguage },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="正在翻譯為繁體中文"
              zh_hans="正在翻译为简体中文"
              en="translating to English"
            />
          ),
        },
      })
    )
  }

  // edit mode
  const canEdit = isAuthor && !viewer.isInactive
  const mode = getQuery(URL_QS.MODE_EDIT.key)
  const [editMode, setEditMode] = useState(false)
  const exitEditMode = () => {
    if (!article) {
      return
    }

    const path = toPath({ page: 'articleDetail', article })
    Router.replace(path.href)
  }

  const onEditSaved = async () => {
    setEditMode(false)
    await refetchPublic()
    loadPrivate()
    exitEditMode()
  }

  useEffect(() => {
    if (!canEdit || !article) {
      return
    }

    setEditMode(mode === URL_QS.MODE_EDIT.value)
  }, [mode, article])

  // jump to comment area
  useEffect(() => {
    if (window.location.hash && article) {
      jump('#comments', { offset: -10 })
    }
  }, [mediaHash])

  /**
   * Render:Loading
   */
  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  /**
   * Render:Error
   */
  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  /**
   * Render:404
   */
  if (!article) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  /**
   * Render:Archived/Banned
   */
  if (article.state !== 'active' && !isAuthor) {
    return (
      <EmptyLayout>
        <Error
          statusCode={404}
          message={
            article.state === 'archived' ? (
              <Translate
                zh_hant="吶，作者親手掩蓋了這篇作品的痕跡，看看別的吧"
                zh_hans="呐，作者亲手掩盖了这篇作品的痕迹，看看别的吧"
                en="hmm, the author hided this work, go see something else"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制隱藏。"
                zh_hans="该作品因违反社区约章，已被站方强制隐藏。"
                en="This work is archived because of violation of community guidelines."
              />
            ) : null
          }
        >
          <BackToHomeButton />
        </Error>
      </EmptyLayout>
    )
  }

  /**
   * Render:Edit Mode
   */
  if (editMode) {
    return (
      <DynamicEditMode
        article={article}
        onCancel={exitEditMode}
        onSaved={onEditSaved}
      />
    )
  }

  /**
   * Render
   */
  const infoClasses = classNames({
    info: true,
    split: !!article.revisedAt && !isSmallUp,
  })

  return (
    <Layout.Main aside={<RelatedArticles article={article} inSidebar />}>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <UserDigest.Rich
            user={article.author}
            size="sm"
            spacing={[0, 0]}
            bgColor="none"
          />
        }
      />

      <Head
        title={`${article.title} - ${article?.author.displayName} (@${article.author.userName})`}
        noSuffix
        description={article.summary}
        keywords={(article.tags || []).map(({ content }) => content)}
        image={article.cover}
      />

      <PullToRefresh>
        <State article={article} />

        <section className="content">
          <TagList article={article} />

          <section className="title">
            <Title type="article">
              {translate && titleTranslation ? titleTranslation : article.title}
            </Title>

            <Waypoint
              topOffset={-400}
              onLeave={() => {
                if (shouldShowWall) {
                  setFixedWall(true)
                }
              }}
            />

            <section className={infoClasses}>
              <section className="left">
                <section className="timeline">
                  <section className="time">
                    <span>
                      <Translate
                        zh_hant="發布於"
                        zh_hans="發布於"
                        en="Published at"
                      />
                    </span>
                    <DateTime date={article.createdAt} color="grey" />
                  </section>

                  {article.revisedAt && (
                    <section className="time">
                      <span>
                        <Translate
                          zh_hant="修訂於"
                          zh_hans="修訂於"
                          en="Revised at"
                        />
                      </span>
                      <DateTime date={article.revisedAt} color="grey" />
                    </section>
                  )}
                </section>

                {canReadFullContent && (
                  <section className="features">
                    <FingerprintButton article={article} />

                    {shouldTranslate && (
                      <TranslationButton
                        translate={translate}
                        setTranslate={onTranslate}
                      />
                    )}
                  </section>
                )}
              </section>

              <section className="right" />
            </section>
          </section>

          {article?.summaryCustomized && (
            <CustomizedSummary summary={summary} />
          )}

          <Content
            article={article}
            translation={translate ? contentTranslation : null}
            translating={translating}
          />
          {circle && !canReadFullContent && <CircleWall circle={circle} />}

          {features.payment && canReadFullContent && (
            <SupportWidget article={article} />
          )}

          {collectionCount > 0 && (
            <section className="block">
              <Collection article={article} collectionCount={collectionCount} />
            </section>
          )}

          <section className="block">
            <DynamicResponse lock={lockActions} />
          </section>

          {!isLargeUp && <RelatedArticles article={article} />}
        </section>

        <Toolbar
          article={article}
          privateFetched={privateFetched}
          hasFingerprint={canReadFullContent}
          lock={lockActions}
        />

        {shouldShowWall && (
          <>
            <section id="comments" />
            <VisitorWall show={fixedWall} />
          </>
        )}
      </PullToRefresh>

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default ArticleDetail
