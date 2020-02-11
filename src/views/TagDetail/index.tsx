import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import {
  Button,
  Footer,
  Head,
  PageHeader,
  Spinner,
  Tabs,
  TextIcon,
  Translate
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import { getErrorCodes, QueryError } from '~/components/GQL'
import Throw404 from '~/components/Throw404'
import { ViewerContext } from '~/components/Viewer'

import { ERROR_CODES } from '~/common/enums'

import styles from './styles.css'
import { TagDetailArticles } from './TagDetailArticles'
import { TagDetailButtons } from './TagDetailButtons'

import { TagDetail } from './__generated__/TagDetail'

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

const TagDetailContainer = ({ data }: { data: TagDetail }) => {
  const viewer = useContext(ViewerContext)
  const hasSelected = _get(data, 'node.articles.totalCount', 0)
  const [feed, setFeed] = useState<TagFeed>(hasSelected ? 'selected' : 'latest')
  const canEdit = viewer.isAdmin && viewer.info.email === 'hi@matters.news'

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  if (hasSelected === 0 && feed === 'selected') {
    setFeed('latest')
  }

  return (
    <>
      <Head title={`#${data.node.content}`} />

      <PageHeader
        title={data.node.content}
        description={data.node.description || ''}
        hasNoBorder
      >
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
      </PageHeader>

      <section className="tabs">
        <Tabs spacingBottom="base">
          {hasSelected > 0 && (
            <Tabs.Tab selected={feed === 'selected'}>
              <Button onClick={() => setFeed('selected')}>
                <TextIcon size="xm">
                  <Translate zh_hant="精選" zh_hans="精选" />
                </TextIcon>
              </Button>
            </Tabs.Tab>
          )}

          <Tabs.Tab selected={feed === 'latest'}>
            <Button onClick={() => setFeed('latest')}>
              <TextIcon size="xm">
                <Translate zh_hant="最新" zh_hans="最新" />
              </TextIcon>
            </Button>
          </Tabs.Tab>
        </Tabs>
      </section>

      {feed === 'selected' ? (
        <TagDetailArticles.Selected id={data.node.id} />
      ) : (
        <TagDetailArticles.Latest id={data.node.id} />
      )}

      <style jsx>{styles}</style>
    </>
  )
}

const TagDetailDataContainer = () => {
  const router = useRouter()

  const { data, loading, error } = useQuery<TagDetail>(TAG_DETAIL, {
    variables: { id: router.query.id }
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    const errorCodes = getErrorCodes(error)

    if (errorCodes[0] === ERROR_CODES.ENTITY_NOT_FOUND) {
      return <Throw404 />
    }

    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  return <TagDetailContainer data={data} />
}

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <TagDetailDataContainer />
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>
  </main>
)
