import _find from 'lodash/find'
import _some from 'lodash/some'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import {
  EmptyLayout,
  EmptyTag,
  Expandable,
  Head,
  Layout,
  PullToRefresh,
  Spinner,
  Tabs,
  Throw404,
  Translate,
  useFeatures,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'
import { getErrorCodes, QueryError } from '~/components/GQL'
import ShareButton from '~/components/Layout/Header/ShareButton'

import { ERROR_CODES } from '~/common/enums'
import {
  makeTitle,
  stripPunctPrefixSuffix,
  toGlobalId,
  toPath,
} from '~/common/utils'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'

import TagDetailArticles from './Articles'
import ArticlesCount from './ArticlesCount'
import { TagDetailButtons } from './Buttons'
import TagCover from './Cover'
import DropdownActions from './DropdownActions'
import Followers from './Followers'
import { TAG_DETAIL_PRIVATE, TAG_DETAIL_PUBLIC } from './gql'
import Owner from './Owner'
import RelatedTags from './RelatedTags'
import styles from './styles.css'

import {
  TagDetailPublic,
  TagDetailPublic_node_Tag,
} from './__generated__/TagDetailPublic'

const DynamicCommunity = dynamic(() => import('./Community'), {
  ssr: false,
  loading: Spinner,
})

type TagFeedType = 'latest' | 'selected' | 'community'

const TagDetail = ({ tag }: { tag: TagDetailPublic_node_Tag }) => {
  const { router } = useRoute()
  const viewer = useContext(ViewerContext)
  const features = useFeatures()

  // feed type
  const hasSelectedFeed = (tag?.selectedArticles.totalCount || 0) > 0
  const [feed, setFeed] = useState<TagFeedType>(
    hasSelectedFeed ? 'selected' : 'latest'
  )

  // const initialFeed = feed
  const isSelected = feed === 'selected'
  const isLatest = feed === 'latest'
  const isCommunity = feed === 'community'

  useEffect(() => {
    const onHashChangeStart = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      console.log(`HashPath changing to "${url}"`, { shallow })
    }

    router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [router.events])

  useEffect(() => {
    if (!hasSelectedFeed && isSelected) {
      setFeed('latest')
    }
  })

  useEffect(() => {
    const newPath = toPath({
      page: 'tagDetail',
      id: tag.id, // toGlobalId(tagId),
      content: tag.content,
    })

    if (newPath.href !== router.asPath) {
      router.push(
        { pathname: newPath.href, hash: feed }, // + `#${feed}`,
        undefined,
        { shallow: true }
      )
    }
  }, [feed])

  // define permission
  const isOwner = tag?.owner?.id === viewer.id
  const isEditor = _some(tag?.editors || [], ['id', viewer.id])
  const isMatty = viewer.info.email === 'hi@matters.news'
  const isMaintainer = isOwner || isEditor || isMatty
  const isOfficial = !!tag?.isOfficial
  const canAdd = !isOfficial || (isOfficial && isMatty)

  const title =
    (tag.description ? `${makeTitle(tag.description, 80)} ` : '') +
    '#' +
    stripPunctPrefixSuffix(tag.content)
  const keywords = tag.content
    .split(/\s+/)
    .filter(Boolean)
    .map(stripPunctPrefixSuffix)

  /**
   * Render
   */
  return (
    <Layout.Main aside={<RelatedTags tagId={tag.id} />}>
      <Layout.Header
        left={<Layout.Header.BackButton mode="black-solid" />}
        right={
          <>
            <span />

            <ShareButton title={title} tags={keywords} />

            <DropdownActions
              isOwner={isOwner}
              isEditor={isEditor}
              isMaintainer={isMaintainer}
              tag={tag}
            />
          </>
        }
        mode="transparent-absolute"
      />

      <Head
        title={title}
        description={tag.description || stripPunctPrefixSuffix(tag.content)}
        keywords={keywords} // add top10 most using author names?
        image={
          tag.cover ||
          `//${process.env.NEXT_PUBLIC_SITE_DOMAIN}${IMAGE_INTRO.src}`
        }
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: stripPunctPrefixSuffix(tag.content),
          description: tag.description,
          image:
            tag.cover ||
            `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${IMAGE_INTRO.src}`,
          url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/tags/${tag.id}`,
        }}
      />

      <PullToRefresh>
        <TagCover tag={tag} />

        <section className="info">
          {features.tag_adoption && <Owner tag={tag} />}

          <section className="statistics">
            <Followers tag={tag} />
            <ArticlesCount tag={tag} />
          </section>

          {tag.description && (
            <Expandable>
              <p className="description">{tag.description}</p>
            </Expandable>
          )}

          <section className="buttons">
            <TagDetailButtons.FollowButton tag={tag} />
            {canAdd && <TagDetailButtons.AddButton tag={tag} />}
          </section>
        </section>

        <Tabs sticky>
          {hasSelectedFeed && (
            <Tabs.Tab selected={isSelected} onClick={() => setFeed('selected')}>
              <Translate id="featured" />
            </Tabs.Tab>
          )}

          <Tabs.Tab selected={isLatest} onClick={() => setFeed('latest')}>
            <Translate id="latest" />
          </Tabs.Tab>

          <Tabs.Tab selected={isCommunity} onClick={() => setFeed('community')}>
            <Translate zh_hant="社群" zh_hans="社群" en="Community" />
          </Tabs.Tab>
        </Tabs>

        {(isSelected || isLatest) && (
          <TagDetailArticles tagId={tag.id} selected={isSelected} />
        )}
        {isCommunity && <DynamicCommunity id={tag.id} isOwner={isOwner} />}
      </PullToRefresh>
      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

const TagDetailContainer = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()

  const parm = getQuery('tagId')
  // const ma = parm?.match(/^(\d+)/)
  // const isRawGlobalId: boolean = !ma
  const numberId = parm?.match(/^(\d+)/)?.[1]
  const tagId = numberId ? toGlobalId({ type: 'Tag', id: numberId }) : parm

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<TagDetailPublic>(TAG_DETAIL_PUBLIC, {
    variables: { id: tagId },
  })

  // private data
  const loadPrivate = () => {
    if (!viewer.isAuthed || !tagId) {
      return
    }

    client.query({
      query: TAG_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { id: tagId },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate()
  }, [tagId, viewer.id])

  // refetch & pull to refresh
  const refetch = async () => {
    await refetchPublic()
    loadPrivate()
  }
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

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
    const errorCodes = getErrorCodes(error)

    if (errorCodes[0] === ERROR_CODES.ENTITY_NOT_FOUND) {
      return (
        <EmptyLayout>
          <Throw404 />
        </EmptyLayout>
      )
    }

    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (data?.node?.__typename !== 'Tag') {
    return (
      <EmptyLayout>
        <EmptyTag />
      </EmptyLayout>
    )
  }

  return <TagDetail tag={data.node} />
}

export default TagDetailContainer
