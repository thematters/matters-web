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
  // stripPunctPrefixSuffix,
  stripAllPunct,
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

const validTagFeedTypes = ['latest', 'selected', 'community'] as const
type TagFeedType = typeof validTagFeedTypes[number]

const TagDetail = ({ tag }: { tag: TagFragment }) => {
  const { router } = useRoute()
  const viewer = useContext(ViewerContext)
  const features = useFeatures()

  // feed type
  const hasSelectedFeed = (tag?.selectedArticles.totalCount || 0) > 0
  const [feed, setFeed] = useState<TagFeedType>(
    hasSelectedFeed ? 'selected' : 'latest'
  )

  const isSelected = feed === 'selected'
  const isLatest = feed === 'latest'
  const isCommunity = feed === 'community'

  const [tab, setTab] = useState<TagFeedType | undefined>(undefined)
  const changeTab = (newTab: TagFeedType) => {
    setFeed(newTab)
    setTab(newTab)
  }

  useEffect(() => {
    if (!hasSelectedFeed && isSelected) {
      changeTab('latest')
    }
  })

  useEffect(() => {
    if (process.browser) {
      const ftype = window.location.hash.split('#')?.[1] as TagFeedType // router.asPath.split('#')?.[1]
      // console.log('in browser call:', { hash: window.location.hash, ftype })
      if (validTagFeedTypes.includes(ftype)) {
        changeTab(ftype) // override if provided
      }
    }
  }, [])

  useEffect(() => {
    if (process.browser) {
      const newPath = toPath({
        page: 'tagDetail',
        id: tag.id, // toGlobalId(tagId),
        content: tag.content,
        fragment: tab,
      })

      // console.log('in browser call:', { hash: window.location.hash, newPath, asPath: router.asPath })

      if (newPath.href !== router.asPath) {
        // console.log('replace url:', { from: router.asPath, to: newPath.href })
        router.replace(
          newPath.href, // + `#${feed}`,
          undefined,
          { shallow: true }
        )
      }
    }
  }, [tab])

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
    stripAllPunct(tag.content)
  const keywords = tag.content.split(/\s+/).filter(Boolean).map(stripAllPunct) // title.includes(tag.content) ??

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

            <ShareButton
              title={title}
              tags={title.endsWith(tag.content) ? undefined : keywords}
            />

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
        description={tag.description || stripAllPunct(tag.content)}
        keywords={keywords} // add top10 most using author names?
        image={
          tag.cover ||
          `//${process.env.NEXT_PUBLIC_SITE_DOMAIN}${IMAGE_INTRO.src}`
        }
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: stripAllPunct(tag.content),
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
            <Tabs.Tab
              selected={isSelected}
              onClick={() => changeTab('selected')}
            >
              <Translate id="featured" />
            </Tabs.Tab>
          )}

          <Tabs.Tab selected={isLatest} onClick={() => changeTab('latest')}>
            <Translate id="latest" />
          </Tabs.Tab>

          <Tabs.Tab
            selected={isCommunity}
            onClick={() => changeTab('community')}
          >
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

  const param = getQuery('tagId')
  // const ma = parm?.match(/^(\d+)/)
  // const isRawGlobalId: boolean = !ma
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
    skip: !!searchKey, // !(isRawGlobalId || numberId),
  })

  const data2 = usePublicQuery<TagDetailPublicBySearch>(TAG_DETAIL_BY_SEARCH, {
    variables: { key: searchKey },
    skip: !searchKey,
  })

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

  // fetch private data for first page
  useEffect(() => {
    const retryTagId =
      tagId || (data2?.data?.search.edges?.[0].node as TagFragment)?.id
    if (retryTagId) {
      loadPrivate(
        retryTagId
        // tagId || (data2?.data?.search.edges?.[0].node as TagFragment).id
      )
    }
  }, [tagId, data2?.data, viewer.id])

  // refetch & pull to refresh
  const refetch = async () => {
    const retryTagId =
      tagId || (data2?.data?.search.edges?.[0].node as TagFragment)?.id
    await refetchPublic({ id: retryTagId })
    loadPrivate(
      retryTagId
      // tagId || (data2?.data?.search.edges?.[0].node as TagFragment).id
    )
  }
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading || data2?.loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error || data2?.error) {
    const err = (error || data2?.error)!
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
    (searchKey &&
      (data2?.data?.search.edges?.[0].node as TagFragment)?.__typename !==
        'Tag')
  ) {
    return (
      <EmptyLayout>
        <EmptyTag />
      </EmptyLayout>
    )
  }

  return (
    <TagDetail
      tag={
        (dataByTagId?.node ||
          data2?.data?.search.edges?.[0].node) as TagFragment
      }
    />
  )
}

export default TagDetailContainer
