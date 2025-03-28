import { useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { ERROR_CODES } from '~/common/enums'
import { fromGlobalId, normalizeTag, toGlobalId, toPath } from '~/common/utils'
import {
  EmptyLayout,
  EmptyTag,
  Head,
  Icon,
  Layout,
  SpinnerBlock,
  SquareTabs,
  TagBookmarkButton,
  TextIcon,
  Throw404,
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
import {
  TAG_DETAIL_BY_SEARCH,
  TAG_DETAIL_PRIVATE,
  TAG_DETAIL_PUBLIC,
} from './gql'
import RecommendedAuthors from './RecommendedAuthors'
import RelatedTags from './RelatedTags'
import styles from './styles.module.css'

const validTagFeedTypes = ['hottest', 'latest'] as const
type TagFeedType = (typeof validTagFeedTypes)[number]

const TagDetail = ({ tag }: { tag: TagFragmentFragment }) => {
  const { router } = useRoute()
  const intl = useIntl()

  // feed type
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as TagFeedType

  const [feedType, setFeedType] = useState<TagFeedType>(qsType || 'latest')

  const changeFeed = (newType: TagFeedType) => {
    setQuery('type', newType)
    setFeedType(newType)
  }

  useEffect(() => {
    setFeedType(qsType || 'latest')
  }, [qsType])

  const isHottest = feedType === 'hottest'
  const isLatest = feedType === 'latest'
  const hasArticles = tag.numArticles > 0
  const hasHottestArticles = tag.hottestArticles.totalCount > 0

  useEffect(() => {
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

  const title = '#' + normalizeTag(tag.content)
  const keywords = tag.content.split(/\s+/).filter(Boolean).map(normalizeTag)
  const path = toPath({ page: 'tagDetail', tag })

  /**
   * Render
   */
  return (
    <Layout.Main
      aside={
        <>
          <RecommendedAuthors tagId={tag.id} inSidebar />
          <RelatedTags tagId={tag.id} inSidebar />
        </>
      }
    >
      <Head
        title={title}
        path={qsType ? `${path.href}?type=${qsType}` : path.href}
        keywords={keywords} // add top10 most using author names?
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList', // should follow with some recent articles under 'itemListElement'
          name: title,
          keywords,
          url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${path.href}`,
          // itemListElement: [...],
        }}
      />

      <section className={styles.title}>
        <TextIcon
          icon={<Icon icon={IconHashTag} size={28} />}
          color="black"
          size={24}
          spacing={4}
          weight="medium"
        >
          {tag.content}
        </TextIcon>
      </section>

      <section className={styles.info}>
        <section className={styles.statistics}>
          <ArticlesCount tag={tag} />
        </section>

        <TagBookmarkButton tag={tag} />
      </section>

      {hasArticles && hasHottestArticles && (
        <section className={styles.tabs}>
          <SquareTabs>
            <SquareTabs.Tab
              selected={isLatest}
              onClick={() => changeFeed('latest')}
              title={intl.formatMessage({
                defaultMessage: 'Latest',
                id: 'adThp5',
              })}
            />

            <SquareTabs.Tab
              selected={isHottest}
              onClick={() => changeFeed('hottest')}
              title={intl.formatMessage({
                defaultMessage: 'Trending',
                id: 'll/ufR',
              })}
            />
          </SquareTabs>
        </section>
      )}

      <TagDetailArticles tag={tag} feedType={feedType} />
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
  const loadPrivate = async (id: string) => {
    if (!viewer.isAuthed || !id) {
      return
    }

    try {
      await client.query({
        query: TAG_DETAIL_PRIVATE,
        fetchPolicy: 'network-only',
        variables: { id },
      })
    } catch (error) {
      console.error('Error loading private data:', error)
    }
  }
  const searchedTag = resultBySearch?.data?.search.edges?.[0]
    .node as TagFragmentFragment

  useEffect(() => {
    const retryTagId = tagId || searchedTag?.id
    if (retryTagId) {
      // FIXME: Delayed loading of private data allows private data to guarantee writing to the final result
      setTimeout(() => {
        loadPrivate(retryTagId)
      }, 100)
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
