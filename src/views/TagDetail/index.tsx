import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  ArticleDigest,
  Footer,
  Head,
  Icon,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Spinner,
  TextIcon,
  Translate
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import EmptyTagArticles from '~/components/Empty/EmptyTagArticles'
import { getErrorCodes, QueryError } from '~/components/GQL'
import { TagDetail } from '~/components/GQL/queries/__generated__/TagDetail'
import { TagDetailArticles } from '~/components/GQL/queries/__generated__/TagDetailArticles'
import TAG_DETAIL from '~/components/GQL/queries/tagDetail'
import TAG_DETAIL_ARTICLES from '~/components/GQL/queries/tagDetailArticles'
import { useEventListener } from '~/components/Hook'
import AddIcon from '~/components/Icon/Add'
import TagArticleModal from '~/components/Modal/TagArticleModal'
import TagModal from '~/components/Modal/TagModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import Throw404 from '~/components/Throw404'
import { ViewerContext } from '~/components/Viewer'

import {
  ANALYTICS_EVENTS,
  ERROR_CODES,
  FEED_TYPE,
  REFETCH_TAG_DETAIL_ARTICLES,
  TEXT
} from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import ICON_EDIT from '~/static/icons/tag-edit.svg?sprite'

import styles from './styles.css'

const AddArticleTagButton = () => {
  return (
    <ModalSwitch modalId="addArticleTagModal">
      {(open: any) => (
        <button type="button" onClick={e => open()}>
          <TextIcon
            icon={<AddIcon color="green" size="xsmall" />}
            spacing="xxxtight"
            size="sm"
            color="green"
          >
            <Translate
              zh_hant={TEXT.zh_hant.addArticleTag}
              zh_hans={TEXT.zh_hans.addArticleTag}
            />
          </TextIcon>
        </button>
      )}
    </ModalSwitch>
  )
}

const EditTagButton = () => {
  return (
    <ModalSwitch modalId="editTagModal">
      {(open: any) => (
        <button type="button" onClick={e => open()} className="edit-tag">
          <TextIcon
            icon={
              <Icon
                id={ICON_EDIT.id}
                viewBox={ICON_EDIT.viewBox}
                color="green"
                size="xsmall"
              />
            }
            spacing="xxxtight"
            size="sm"
            color="green"
          >
            <Translate
              zh_hant={TEXT.zh_hant.editTag}
              zh_hans={TEXT.zh_hans.editTag}
            />
          </TextIcon>
          <style jsx>{styles}</style>
        </button>
      )}
    </ModalSwitch>
  )
}

const ActionButtons = () => {
  const viewer = useContext(ViewerContext)

  if (!viewer.isAdmin || viewer.info.email !== 'hi@matters.news') {
    return null
  }

  return (
    <section className="buttons">
      <AddArticleTagButton />
      <EditTagButton />
      <style jsx>{styles}</style>
    </section>
  )
}

const TagDetailArticleList = ({ id }: { id: string }) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    TagDetailArticles
  >(TAG_DETAIL_ARTICLES, { variables: { id } })

  const sync = ({
    event,
    differences = 0
  }: {
    event: 'add' | 'delete'
    differences?: number
  }) => {
    const { edges: items } = _get(data, 'node.articles', { edges: [] })
    switch (event) {
      case 'add':
        refetch({
          variables: {
            id,
            first: items.length + differences
          }
        })
        break
      case 'delete':
        refetch({
          variables: {
            id,
            first: Math.max(items.length - 1, 0)
          }
        })
        break
    }
  }

  useEventListener(REFETCH_TAG_DETAIL_ARTICLES, sync)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTagArticles />
  }

  const connectionPath = 'node.articles'
  const { edges, pageInfo } = data.node.articles
  const hasArticles = edges && edges.length > 0 && pageInfo

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAG_DETAIL,
      location: edges ? edges.length : 0,
      entrance: id
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  return (
    <>
      <section>
        {hasArticles && (
          <InfiniteScroll
            hasNextPage={pageInfo.hasNextPage}
            loadMore={loadMore}
          >
            <ul>
              {(edges || []).map(({ node, cursor }, i) => (
                <li
                  key={cursor}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                      type: FEED_TYPE.TAG_DETAIL,
                      location: i,
                      entrance: id
                    })
                  }
                >
                  <ArticleDigest.Feed
                    article={node}
                    hasDateTime
                    hasBookmark
                    hasMoreButton
                    inTagDetail
                  />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )}
        {!hasArticles && <EmptyTagArticles />}
      </section>
    </>
  )
}

const TagDetailContainer = () => {
  const router = useRouter()

  const variables = { id: router.query.id }

  const { data, loading, error } = useQuery<TagDetail>(TAG_DETAIL, {
    variables
  })

  if (loading) {
    return <Placeholder.ArticleDigestList />
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
      <Head title={`#${data.node.content}`} />

      <PageHeader
        pageTitle={data.node.content}
        buttons={<ActionButtons />}
        description={data.node.description || ''}
      />

      <TagDetailArticleList id={data.node.id} />

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
        <TagDetailContainer />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}
