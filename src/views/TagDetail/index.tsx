import _find from 'lodash/find'
import _some from 'lodash/some'
import { useRouter } from 'next/router'
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
  usePublicQuery,
  usePullToRefresh,
  useResponsive,
  ViewerContext,
} from '~/components'
import { getErrorCodes, QueryError } from '~/components/GQL'

import { ERROR_CODES } from '~/common/enums'
import { getQuery } from '~/common/utils'

import TagDetailArticles from './Articles'
import ArticlesCount from './ArticlesCount'
import { TagDetailButtons } from './Buttons'
import Cover from './Cover'
import DropdownActions from './DropdownActions'
import Followers from './Followers'
import { TAG_DETAIL_PRIVATE, TAG_DETAIL_PUBLIC } from './gql'
import Owner from './Owner'
import styles from './styles.css'

import {
  TagDetailPublic,
  TagDetailPublic_node_Tag,
} from './__generated__/TagDetailPublic'

type TagFeedType = 'latest' | 'selected'

const TagDetail = ({ tag }: { tag: TagDetailPublic_node_Tag }) => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)

  // feed type
  const hasSelected = (tag?.selectedArticles.totalCount || 0) > 0
  const [feed, setFeed] = useState<TagFeedType>(
    hasSelected ? 'selected' : 'latest'
  )
  const isSelected = feed === 'selected'

  useEffect(() => {
    if (!hasSelected && isSelected) {
      setFeed('latest')
    }
  })

  // define permission
  const isOwner = tag?.owner?.id === viewer.id
  const isEditor = _some(
    tag?.editors || [],
    (editor) => editor.id === viewer.id
  )
  const isMatty = viewer.info.email === 'hi@matters.news'
  const isMaintainer = isOwner || isEditor || isMatty

  /**
   * Render
   */
  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.BackButton
            mode={!isSmallUp ? 'black-solid' : undefined}
          />
        }
        right={
          <>
            {isSmallUp ? <Layout.Header.Title id="tag" /> : <span />}

            <DropdownActions {...tag} isMaintainer={isMaintainer} />
          </>
        }
        mode={isSmallUp ? 'solid-fixed' : 'transparent-absolute'}
      />

      <Head title={`#${tag.content}`} />

      <PullToRefresh>
        <Cover tag={tag} />

        <section className="info">
          <Owner tag={tag} />

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
            <TagDetailButtons.AddButton tag={tag} isMaintainer={isMaintainer} />
          </section>
        </section>

        <Tabs sticky>
          {hasSelected && (
            <Tabs.Tab selected={isSelected} onClick={() => setFeed('selected')}>
              <Translate id="featured" />
            </Tabs.Tab>
          )}

          <Tabs.Tab selected={!isSelected} onClick={() => setFeed('latest')}>
            <Translate id="latest" />
          </Tabs.Tab>
        </Tabs>

        <TagDetailArticles tagId={tag.id} selected={isSelected} />
      </PullToRefresh>

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

const TagDetailContainer = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const tagId = getQuery({ router, key: 'tagId' })

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

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return (
      <EmptyLayout>
        <EmptyTag />
      </EmptyLayout>
    )
  }

  return <TagDetail tag={data.node} />
}

export default TagDetailContainer
