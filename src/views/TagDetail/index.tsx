import { gql, useQuery } from '@apollo/client'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _some from 'lodash/some'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

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

import { TagDetailArticles } from './Articles'
import ArticlesCount from './ArticlesCount'
import { TagDetailButtons } from './Buttons'
import DropdownActions from './DropdownActions'
import Followers from './Followers'
import styles from './styles.css'

import { TagDetail as TagDetailType } from './__generated__/TagDetail'

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

type TagFeed = 'latest' | 'selected'

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
)

const TagDetail = ({ data }: { data: TagDetailType }) => {
  const viewer = useContext(ViewerContext)
  const hasSelected = _get(data, 'node.articles.totalCount', 0)
  const [feed, setFeed] = useState<TagFeed>(hasSelected ? 'selected' : 'latest')

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  if (hasSelected === 0 && feed === 'selected') {
    setFeed('latest')
  }

  const filter = ({ displayName }: any) =>
    (displayName || '').toLowerCase() !== 'matty'
  const editors = data.node.editors || []
  const owner = _find(editors, filter)

  // define permission
  const normalEditors = editors.filter(filter)
  const isEditor = _some(editors, (editor) => editor.id === viewer.id)
  const isCreator = data.node.creator?.id === viewer.id
  const isMaintainer =
    isEditor ||
    (normalEditors.length === 0 && isCreator) ||
    viewer.info.email === 'hi@matters.news'

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="tag" />

            <DropdownActions
              id={data.node.id}
              content={data.node.content}
              description={data.node.description || undefined}
              isMaintainer={isMaintainer}
            />
          </>
        }
      />

      <Head title={`#${data.node.content}`} />

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

          <Title type="tag">#{data.node.content}</Title>

          {data.node.description && (
            <Expandable>
              <p className="description">{data.node.description}</p>
            </Expandable>
          )}

          <section className="statistics">
            <Followers id={data.node.id} />
            <ArticlesCount id={data.node.id} />
          </section>

          <section className="buttons">
            <TagDetailButtons.FollowButton tag={data.node} />
            <TagDetailButtons.AddButton
              tag={data.node}
              isMaintainer={isMaintainer}
            />
          </section>
        </section>

        <Tabs>
          {hasSelected > 0 && (
            <Tabs.Tab
              selected={feed === 'selected'}
              onClick={() => setFeed('selected')}
            >
              <Translate id="featured" />
            </Tabs.Tab>
          )}

          <Tabs.Tab
            selected={feed === 'latest'}
            onClick={() => setFeed('latest')}
          >
            <Translate id="latest" />
          </Tabs.Tab>
        </Tabs>

        {feed === 'selected' ? (
          <TagDetailArticles.Selected id={data.node.id} />
        ) : (
          <TagDetailArticles.Latest id={data.node.id} />
        )}
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

  return <TagDetail data={data} />
}

export default TagDetailContainer
