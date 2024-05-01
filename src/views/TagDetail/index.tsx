import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { ERROR_CODES } from '~/common/enums'
import {
  fromGlobalId,
  normalizeTag,
  stripSpaces,
  toGlobalId,
  toPath,
} from '~/common/utils'
import {
  EmptyLayout,
  EmptyTag,
  Expandable,
  Head,
  Layout,
  SegmentedTabs,
  SpinnerBlock,
  Throw404,
  useFeatures,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { getErrorCodes, QueryError } from '~/components/GQL'
import {
  TagDetailPublicBySearchQuery,
  TagDetailPublicQuery,
  TagFragmentFragment,
} from '~/gql/graphql'

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
import styles from './styles.module.css'

const DynamicCommunity = dynamic(() => import('./Community'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const validTagFeedTypes = ['hottest', 'latest', 'selected', 'creators'] as const
type TagFeedType = (typeof validTagFeedTypes)[number]

const TagDetail = ({ tag }: { tag: TagFragmentFragment }) => {
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

  useEffect(() => {
    setFeedType(
      hasSelectedFeed && qsType === 'selected'
        ? 'selected'
        : qsType || 'hottest'
    )
  }, [qsType])

  const isSelected = feedType === 'selected'
  const isHottest = feedType === 'hottest'
  const isLatest = feedType === 'latest'
  const isCreators = feedType === 'creators'

  useEffect(() => {
    // if selected feed is empty, switch to hottest feed
    if (!hasSelectedFeed && isSelected) {
      changeFeed('hottest')
    }

    // backward compatible with `/tags/:globalId:`
    const newPath = toPath({
      page: 'tagDetail',
      tag,
      feedType: isHottest ? '' : feedType,
    })
    if (newPath.href !== window.decodeURI(router.asPath)) {
      router.replace(newPath.href, undefined, { shallow: true })
    }
  }, [])

  // define permission
  const isOwner = tag?.owner?.id === viewer.id
  const isEditor = (tag?.editors || []).some((t) => t.id === viewer.id)
  const isMaintainer = isOwner || isEditor || viewer.isAdmin // Matty

  const title = '#' + normalizeTag(tag.content)
  const keywords = tag.content.split(/\s+/).filter(Boolean).map(normalizeTag)
  const description = stripSpaces(tag.description)
  const path = toPath({ page: 'tagDetail', tag })

  /**
   * Render
   */
  return (
    <Layout.Main aside={<RelatedTags tagId={tag.id} inSidebar />}>
      <Layout.Header
        right={
          <>
            <span />
            <section className={styles.buttons}>
              <Layout.Header.ShareButton
                title={title}
                tags={title.endsWith(tag.content) ? undefined : keywords}
              />
              <DropdownActions
                isOwner={isOwner}
                isEditor={isEditor}
                isMaintainer={isMaintainer}
                tag={tag}
              />
            </section>
          </>
        }
        mode="transparent"
      />

      <Head
        // title={`#${normalizeTag(tag.content)}`}
        // description={tag.description}
        title={title}
        path={qsType ? `${path.href}?type=${qsType}` : path.href}
        description={description}
        keywords={keywords} // add top10 most using author names?
        image={
          tag.cover ||
          `//${process.env.NEXT_PUBLIC_SITE_DOMAIN}${IMAGE_TAG_COVER.src}`
        }
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList', // should follow with some recent articles under 'itemListElement'
          name: title,
          description,
          keywords,
          image:
            tag.cover ||
            `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${IMAGE_TAG_COVER.src}`,
          url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${path.href}`,
          // itemListElement: [...],
        }}
      />

      <TagCover tag={tag} />

      <section className={styles.info}>
        {features.NOTICE_TAG_ADOPTION && <Owner tag={tag} />}

        <section className={styles.top}>
          <section className={styles.statistics}>
            <Followers tag={tag} />
            <ArticlesCount tag={tag} />
          </section>

          <section>
            <TagDetailButtons.FollowButton tag={tag} />
          </section>
        </section>

        {tag.description && (
          <Expandable
            content={tag.description}
            color="greyDarker"
            spacingTop="base"
            size={15}
          >
            <p>{tag.description}</p>
          </Expandable>
        )}
      </section>

      <SegmentedTabs sticky>
        <SegmentedTabs.Tab
          selected={isHottest}
          onClick={() => changeFeed('hottest')}
        >
          <FormattedMessage defaultMessage="Trending" id="ll/ufR" />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          selected={isLatest}
          onClick={() => changeFeed('latest')}
        >
          <FormattedMessage defaultMessage="Latest" id="adThp5" />
        </SegmentedTabs.Tab>

        {hasSelectedFeed && (
          <SegmentedTabs.Tab
            selected={isSelected}
            onClick={() => changeFeed('selected')}
          >
            <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
          </SegmentedTabs.Tab>
        )}

        <SegmentedTabs.Tab
          selected={isCreators}
          onClick={() => changeFeed('creators')}
        >
          <FormattedMessage defaultMessage="Creators" id="TzhzIH" />
        </SegmentedTabs.Tab>
      </SegmentedTabs>

      {(isHottest || isLatest || isSelected) && (
        <TagDetailArticles tag={tag} feedType={feedType} />
      )}

      {isCreators && <DynamicCommunity id={tag.id} isOwner={isOwner} />}
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
    client,
  } = usePublicQuery<TagDetailPublicQuery>(TAG_DETAIL_PUBLIC, {
    variables: { id: tagId },
    skip: !!searchKey,
  })

  const resultBySearch = usePublicQuery<TagDetailPublicBySearchQuery>(
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
    .node as TagFragmentFragment

  // fetch private data for first page
  useEffect(() => {
    const retryTagId = tagId || searchedTag?.id
    if (retryTagId) {
      loadPrivate(retryTagId)
    }
  }, [tagId, resultBySearch?.data, viewer.id])

  /**
   * Render
   */
  if (loading || resultBySearch?.loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
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

  return (
    <TagDetail
      tag={(dataByTagId?.node as TagFragmentFragment) || searchedTag}
    />
  )
}

export default TagDetailContainer
