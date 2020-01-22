import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Footer,
  Head,
  Icon,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Tag,
  TextIcon,
  Translate
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import { QueryError } from '~/components/GQL'
import TagModal from '~/components/Modal/TagModal'
import { ModalInstance, ModalSwitch } from '~/components/ModalManager'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { AllTags } from './__generated__/AllTags'

const ALL_TAGSS = gql`
  query AllTags($after: String) {
    viewer {
      id
      recommendation {
        tags(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestTag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const CreateTagButton = () => {
  const viewer = useContext(ViewerContext)
  // temporarily safety check
  if (!viewer.isAdmin || viewer.info.email !== 'hi@matters.news') {
    return null
  }

  return (
    <ModalSwitch modalId="createTagModal">
      {(open: any) => (
        <button type="button" onClick={e => open()}>
          <TextIcon
            icon={<Icon.Add color="green" size="xs" />}
            spacing="xxxtight"
            color="green"
          >
            <Translate
              zh_hant={TEXT.zh_hant.createTag}
              zh_hans={TEXT.zh_hans.createTag}
            />
          </TextIcon>
        </button>
      )}
    </ModalSwitch>
  )
}

const Tags = () => {
  const { data, loading, error, fetchMore } = useQuery<AllTags>(ALL_TAGSS)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.tags'
  const { edges, pageInfo } = data?.viewer?.recommendation.tags || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAGS,
      location: edges.length
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true
        })
    })
  }
  const leftEdges = edges.filter((_: any, i: number) => i % 2 === 0)
  const rightEdges = edges.filter((_: any, i: number) => i % 2 === 1)

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <section className="l-row">
        <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
          {leftEdges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_TAGS,
                  location: i * 2
                })
              }
            >
              <Tag tag={node} type="count-fixed" />
            </li>
          ))}
        </ul>
        <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
          {rightEdges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_TAGS,
                  location: i * 2 + 1
                })
              }
            >
              <Tag tag={node} type="count-fixed" />
            </li>
          ))}
        </ul>

        <style jsx>{styles}</style>
      </section>
    </InfiniteScroll>
  )
}

export default () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.allTags,
            zh_hans: TEXT.zh_hans.allTags
          }}
        />

        <PageHeader
          buttons={<CreateTagButton />}
          title={
            <Translate
              zh_hant={TEXT.zh_hant.allTags}
              zh_hans={TEXT.zh_hans.allTags}
            />
          }
        />

        <section className="container">
          <Tags />
        </section>
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>

      <ModalInstance modalId="createTagModal" title="createTag">
        {(props: ModalInstanceProps) => <TagModal {...props} />}
      </ModalInstance>

      <style jsx>{styles}</style>
    </main>
  )
}
