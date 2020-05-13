import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import {
  Button,
  EmptyTag,
  Head,
  Layout,
  Spacer,
  Spinner,
  Tabs,
  TextIcon,
  Throw404,
  Translate,
  ViewerContext,
} from '~/components'
import { getErrorCodes, QueryError } from '~/components/GQL'

import { ERROR_CODES } from '~/common/enums'

import styles from './styles.css'
import { TagDetailArticles } from './TagDetailArticles'
import { TagDetailButtons } from './TagDetailButtons'

import { TagDetail as TagDetailType } from './__generated__/TagDetail'

const TAG_DETAIL = gql`
  query TagDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        description
        articles(input: { first: 0, selected: true }) {
          totalCount
        }
      }
    }
  }
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
  const canEdit = viewer.info.email === 'hi@matters.news'

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  if (hasSelected === 0 && feed === 'selected') {
    setFeed('latest')
  }

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title
              zh_hant={`#${data.node.content}`}
              zh_hans={`#${data.node.content}`}
            />

            {canEdit && (
              <section className="buttons">
                <TagDetailButtons.AddArticleButton id={data.node.id} />
                <TagDetailButtons.EditTagButton
                  id={data.node.id}
                  content={data.node.content}
                  description={data.node.description || undefined}
                />
              </section>
            )}
          </>
        }
      />

      <Head title={`#${data.node.content}`} />

      <Spacer />

      {data.node.description && (
        <p className="description">{data.node.description}</p>
      )}

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

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

const TagDetailContainer = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<TagDetailType>(TAG_DETAIL, {
    variables: { id: router.query.id },
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
