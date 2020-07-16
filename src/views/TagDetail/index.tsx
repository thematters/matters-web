import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
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
  Title,
  Translate,
  ViewerContext,
} from '~/components'
import { getErrorCodes, QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { ERROR_CODES } from '~/common/enums'
import { getQuery } from '~/common/utils'

import TagDetailArticles from './Articles'
import ArticlesCount from './ArticlesCount'
import { TagDetailButtons } from './Buttons'
import DropdownActions from './DropdownActions'
import Followers from './Followers'
import styles from './styles.css'

import {
  TagDetail as TagDetailType,
  TagDetail_node_Tag,
  TagDetail_node_Tag_editors,
} from './__generated__/TagDetail'

const TAG_DETAIL = gql`
  query TagDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        creator {
          id
          ...UserDigestMiniUser
        }
        description
        editors {
          id
          ...UserDigestMiniUser
        }
        articles(input: { first: 0, selected: true }) {
          totalCount
        }
        ...FollowButtonTag
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
  ${TagDetailButtons.FollowButton.fragments.tag}
`

type TagFeedType = 'latest' | 'selected'

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)

const TagDetail = ({ tag }: { tag: TagDetail_node_Tag }) => {
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
  const filter = ({ displayName }: TagDetail_node_Tag_editors) =>
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
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="tag" />

            <DropdownActions
              id={tag.id}
              content={tag.content}
              description={tag.description || undefined}
              isMaintainer={isMaintainer}
            />
          </>
        }
      />

      <Head title={`#${tag.content}`} />

      <PullToRefresh>
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

          <Title type="tag">#{tag.content}</Title>

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
  const router = useRouter()
  const tagId = getQuery({ router, key: 'tagId' })
  const { data, loading, error } = useQuery<TagDetailType>(TAG_DETAIL, {
    variables: { id: tagId },
  })

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
