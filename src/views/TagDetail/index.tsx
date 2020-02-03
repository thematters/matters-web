import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import {
  Footer,
  Head,
  PageHeader,
  Spinner,
  Tabs,
  Translate
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import { getErrorCodes, QueryError } from '~/components/GQL'
import TagArticleModal from '~/components/Modal/TagArticleModal'
import TagModal from '~/components/Modal/TagModal'
import { ModalInstance } from '~/components/ModalManager'
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

const Buttons = () => {
  const viewer = useContext(ViewerContext)

  if (!viewer.isAdmin || viewer.info.email !== 'hi@matters.news') {
    return null
  }

  return (
    <section className="buttons">
      <TagDetailButtons.AddArticleButton />
      <TagDetailButtons.EditTagButton />
      <style jsx>{styles}</style>
    </section>
  )
}

type TagFeed = 'latest' | 'selected'

const TagDetailContainer = ({ data }: { data: TagDetail }) => {
  const hasSelected = _get(data, 'node.articles.totalCount', 0)
  const [feed, setFeed] = useState<TagFeed>(hasSelected ? 'selected' : 'latest')

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
        buttons={<Buttons />}
        description={data.node.description || ''}
        hasNoBottomBorder
      />
      <Tabs spacingBottom="base">
        {hasSelected > 0 && (
          <Tabs.Tab selected={feed === 'selected'}>
            <span className="tab-button" onClick={() => setFeed('selected')}>
              <Translate zh_hant="精選" zh_hans="精選" />
            </span>
          </Tabs.Tab>
        )}
        <Tabs.Tab selected={feed === 'latest'}>
          <span className="tab-button" onClick={() => setFeed('latest')}>
            <Translate zh_hant="最新" zh_hans="最新" />
          </span>
        </Tabs.Tab>
      </Tabs>

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

  const tag = data.node
    ? {
        id: data.node.id,
        content: data.node.content,
        description: data.node.description || undefined
      }
    : undefined

  return (
    <>
      <TagDetailContainer data={data} />
      <ModalInstance modalId="addArticleTagModal" title="addArticleTag">
        {(props: ModalInstanceProps) => (
          <TagArticleModal tagId={tag ? tag.id : undefined} {...props} />
        )}
      </ModalInstance>

      <ModalInstance modalId="editTagModal" title="editTag">
        {(props: ModalInstanceProps) => <TagModal tag={tag} {...props} />}
      </ModalInstance>
    </>
  )
}

export default () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <TagDetailDataContainer />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}
