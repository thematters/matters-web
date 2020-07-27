import _find from 'lodash/find'
import _some from 'lodash/some'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import {
  EmptyTag,
  Expandable,
  Head,
  Layout,
  PullToRefresh,
  Spacer,
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
import { UserDigest } from '~/components/UserDigest'

import { ERROR_CODES } from '~/common/enums'
import { getQuery } from '~/common/utils'

import TagDetailArticles from './Articles'
import ArticlesCount from './ArticlesCount'
import { TagDetailButtons } from './Buttons'
import Cover from './Cover'
import DropdownActions from './DropdownActions'
import Followers from './Followers'
import { TAG_DETAIL_PRIVATE, TAG_DETAIL_PUBLIC } from './gql'
import styles from './styles.css'

import {
  TagDetailPublic,
  TagDetailPublic_node_Tag,
  TagDetailPublic_node_Tag_editors,
} from './__generated__/TagDetailPublic'

type TagFeedType = 'latest' | 'selected'

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)

const TagDetail = ({ tag }: { tag: TagDetailPublic_node_Tag }) => {
  const isSmallUp = useResponsive('sm-up')
  const viewer = useContext(ViewerContext)

  // feed type
  const hasSelected = (tag?.articles.totalCount || 0) > 0
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
  const filter = ({ displayName }: TagDetailPublic_node_Tag_editors) =>
    (displayName || '').toLowerCase() !== 'matty'
  const editors = tag?.editors || []
  const owner = _find(editors, filter)

  const normalEditors = editors.filter(filter)
  const isEditor = _some(editors, (editor) => editor.id === viewer.id)
  const isCreator = tag?.creator?.id === viewer.id
  const isMaintainer =
    isEditor ||
    (normalEditors.length === 0 && isCreator) ||
    viewer.info.email === 'hi@matters.news'

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
            <DropdownActions
              id={tag.id}
              content={tag.content}
              cover={tag.cover || undefined}
              description={tag.description || undefined}
              isMaintainer={isMaintainer}
            />
          </>
        }
        mode={isSmallUp ? 'solid-fixed' : 'transparent-absolute'}
      />

      <Head title={`#${tag.content}`} />

      <PullToRefresh>
        <Cover content={tag.content} cover={tag.cover} />

        <Spacer />

        <section className="info">
          {owner && (
            <section className="owner">
              <UserDigest.Mini
                user={owner}
                avatarSize="xs"
                hasAvatar
                hasDisplayName
              />
              <span>
                <Translate zh_hant="主理" zh_hans="主理" />
              </span>
            </section>
          )}

          {tag.description && (
            <Expandable>
              <p className="description">{tag.description}</p>
            </Expandable>
          )}

          <section className="statistics">
            <Followers id={tag.id} />
            <ArticlesCount id={tag.id} />
          </section>

          <section className="buttons">
            <TagDetailButtons.FollowButton tag={tag} />
            <TagDetailButtons.AddButton tag={tag} isMaintainer={isMaintainer} />
          </section>
        </section>

        <Tabs>
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
    if (!viewer.id || !tagId) {
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
