import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useQuery } from 'react-apollo'

import {
  ArticleDigest,
  Footer,
  Head,
  Icon,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  TextIcon,
  Translate
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import { QueryError } from '~/components/GQL'
import AddIcon from '~/components/Icon/Add'
import TagModal from '~/components/Modal/TagModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import ICON_EDIT from '~/static/icons/tag-edit.svg?sprite'

import { TagDetailArticles } from './__generated__/TagDetailArticles'
import styles from './styles.css'

const TAG_DETAIL = gql`
  query TagDetailArticles(
    $id: ID!
    $after: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        description
        articles(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

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
    <div>
      <AddArticleTagButton />
      <EditTagButton />
    </div>
  )
}

const TagDetail = () => {
  const router = useRouter()

  const { data, loading, error, fetchMore } = useQuery<TagDetailArticles>(
    TAG_DETAIL,
    {
      variables: { id: router.query.id }
    }
  )

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  const id = data.node.id
  const connectionPath = 'node.articles'
  const { edges, pageInfo } = data.node.articles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const tag = data.node
    ? {
        id: data.node.id,
        content: data.node.content,
        description: data.node.description || undefined
      }
    : undefined

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAG_DETAIL,
      location: edges.length,
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
      <Head title={`#${data.node.content}`} />

      <PageHeader pageTitle={data.node.content}>
        <ActionButtons />
      </PageHeader>

      <section>
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <ul>
            {edges.map(({ node, cursor }, i) => (
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
                <ArticleDigest.Feed article={node} hasDateTime hasBookmark />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </section>

      {/*
      <ModalInstance modalId="addArticleTagModal" title="addArticleTag">
        {(props: ModalInstanceProps) => <TagAdddModal {...props} />}
      </ModalInstance>
      */}

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
        <TagDetail />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}
