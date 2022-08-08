// import _find from 'lodash/find'
// import _some from 'lodash/some'
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
  fromGlobalId,
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
import {
  TAG_DETAIL_BY_SEARCH,
  TAG_DETAIL_PRIVATE,
  TAG_DETAIL_PUBLIC,
} from './gql'
import Owner from './Owner'
import RelatedTags from './RelatedTags'
import styles from './styles.css'

import {
  TagDetailPublic,
  // TagDetailPublic_node_Tag,
} from './__generated__/TagDetailPublic'
import { TagDetailPublicBySearch } from './__generated__/TagDetailPublicBySearch'
import { TagFragment } from './__generated__/TagFragment'

const DynamicCommunity = dynamic(() => import('./Community'), {
  ssr: false,
  loading: Spinner,
})

const validTagFeedTypes = ['hottest', 'latest', 'selected', 'creators'] as const
type TagFeedType = typeof validTagFeedTypes[number]

const TagDetail = ({ tag }: { tag: TagFragment }) => {
  const { router } = useRoute()
  const viewer = useContext(ViewerContext)
  const features = useFeatures()

  // feed type
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as TagFeedType
  const hasSelectedFeed = (tag?.selectedArticles.totalCount || 0) > 0

  const [feedType, setFeedType] = useState<TagFeedType>(
    hasSelectedFeed && qsType === 'selected' ? 'selected' : qsType || 'hottest'
  )

  const changeFeed = (newType: TagFeedType) => {
    setQuery('type', newType)
    setFeedType(newType)
  }

  const isSelected = feedType === 'selected'
  const isHottest = feedType === 'hottest'
  const isLatest = feedType === 'latest'
  const isCreators = feedType === 'creators'

  useEffect(() => {
    // if selected feed is empty, switch to latest feed
    if (!hasSelectedFeed && isSelected) {
      changeFeed('latest')
    }

    // backward compatible with `/tags/:globalId:`
    const newPath = toPath({
      page: 'tagDetail',
      id: tag.id,
      content: tag.content,
      feedType: isLatest ? '' : feedType,
    })

    if (newPath.href !== window.decodeURI(router.asPath)) {
      router.replace(newPath.href, undefined, { shallow: true })
    }
  }, [])

  // define permission
  const isOwner = tag?.owner?.id === viewer.id
  const isEditor = (tag?.editors || []).some((t) => t.id === viewer.id)
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
    <Layout.Main aside={<RelatedTags tagId={tag.id} inSidebar />}>
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
            {canAdd && <TagDetailButtons.AddButton tag={tag} />}
            <TagDetailButtons.FollowButton tag={tag} />
          </section>
        </section>

        <Tabs sticky>
          <Tabs.Tab selected={isHottest} onClick={() => changeFeed('hottest')}>
            <Translate id="hottest" />
          </Tabs.Tab>

          <Tabs.Tab selected={isLatest} onClick={() => changeFeed('latest')}>
            <Translate id="latest" />
          </Tabs.Tab>

          {hasSelectedFeed && (
            <Tabs.Tab
              selected={isSelected}
              onClick={() => changeFeed('selected')}
            >
              <Translate id="featured" />
            </Tabs.Tab>
          )}

          <Tabs.Tab
            selected={isCreators}
            onClick={() => changeFeed('creators')}
          >
            <Translate zh_hant="創作者" zh_hans="创作者" en="Creators" />
          </Tabs.Tab>
        </Tabs>

        {(isHottest || isLatest || isSelected) && (
          <TagDetailArticles tagId={tag.id} feedType={feedType} />
        )}

        {isCreators && <DynamicCommunity id={tag.id} isOwner={isOwner} />}
      </PullToRefresh>

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

const TagDetailContainer = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()

  // backward compatible with:
  // - `/tags/:globalId:`
  // - `/tags/:numberId:-:content:`
  // - `/tags/:content:`
  const param = getQuery('tagId')
  let isRawGlobalId = false
  try {
    const { type, id } = fromGlobalId(param)
    if (type === 'Tag' && id?.match(/^\d+$/)) {
      isRawGlobalId = true
    }
  } catch (err) {
    // ignore
  }
  const numberId = param?.match(/^(\d+)/)?.[1]
  const searchKey = !(isRawGlobalId || numberId) ? param : ''
  const tagId = isRawGlobalId
    ? param
    : numberId
    ? toGlobalId({ type: 'Tag', id: numberId })
    : '' // undefined

  /**
   * Data Fetching
   */
  // public data
  const {
    data: dataByTagId,
    loading,
    error,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<TagDetailPublic>(TAG_DETAIL_PUBLIC, {
    variables: { id: tagId },
    skip: !!searchKey,
  })

  const resultBySearch = usePublicQuery<TagDetailPublicBySearch>(
    TAG_DETAIL_BY_SEARCH,
    {
      variables: { key: searchKey },
      skip: !searchKey,
    }
  )

  // private data
  const loadPrivate = (id: string) => {
    if (!viewer.isAuthed || !id) {
      return
    }

    client.query({
      query: TAG_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { id },
    })
  }
  const searchedTag = resultBySearch?.data?.search.edges?.[0]
    .node as TagFragment

  // fetch private data for first page
  useEffect(() => {
    const retryTagId = tagId || searchedTag?.id
    if (retryTagId) {
      loadPrivate(retryTagId)
    }
  }, [tagId, resultBySearch?.data, viewer.id])

  // refetch & pull to refresh
  const refetch = async () => {
    const retryTagId = tagId || searchedTag?.id
    await refetchPublic({ id: retryTagId })
    loadPrivate(retryTagId)
  }
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading || resultBySearch?.loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error || resultBySearch?.error) {
    const err = (error || resultBySearch?.error)!
    const errorCodes = getErrorCodes(err)

    if (errorCodes[0] === ERROR_CODES.ENTITY_NOT_FOUND) {
      return (
        <EmptyLayout>
          <Throw404 />
        </EmptyLayout>
      )
    }

    return (
      <EmptyLayout>
        <QueryError error={err} />
      </EmptyLayout>
    )
  }

  if (
    (!searchKey && dataByTagId?.node?.__typename !== 'Tag') ||
    (searchKey && searchedTag?.__typename !== 'Tag')
  ) {
    return (
      <EmptyLayout>
        <EmptyTag />
      </EmptyLayout>
    )
  }

  return <TagDetail tag={(dataByTagId?.node as TagFragment) || searchedTag} />
}

export default TagDetailContainer
