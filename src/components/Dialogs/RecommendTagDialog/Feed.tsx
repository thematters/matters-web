import _get from 'lodash/get'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  EmptyWarning,
  List,
  QueryError,
  ShuffleButton,
  Spinner,
  TagDigest,
  Translate,
  usePublicQuery,
  ViewerContext,
} from '~/components'

import { HOTTEST_TAGS, SELECTED_TAGS } from './gql'
import styles from './styles.css'

import {
  HottestTags,
  HottestTags_viewer_recommendation_hottestTags_edges,
} from './__generated__/HottestTags'
import {
  SelectedTags,
  SelectedTags_viewer_recommendation_selectedTags_edges,
} from './__generated__/SelectedTags'

export type FeedType = 'hottest' | 'selected'

export type FeedQuery = HottestTags | SelectedTags

export type FeedEdges =
  | HottestTags_viewer_recommendation_hottestTags_edges
  | SelectedTags_viewer_recommendation_selectedTags_edges

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const viewer = useContext(ViewerContext)
  const isHottest = type === 'hottest'

  const query = isHottest ? HOTTEST_TAGS : SELECTED_TAGS
  const { data, loading, error, refetch } = usePublicQuery<FeedQuery>(
    query,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        random: 0,
      },
    },
    {
      publicQuery: !viewer.isAuthed,
    }
  )

  const edges = _get(
    data?.viewer?.recommendation,
    isHottest ? 'hottestTags.edges' : 'selectedTags.edges',
    []
  ) as FeedEdges[]

  const shuffle = () => refetch({ random: _random(0, 12) })

  useEffect(() => {
    if (viewer.isAuthed) {
      shuffle()
    }
  }, [viewer.isAuthed])

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return (
      <section className="feed">
        <EmptyWarning
          description={
            <Translate zh_hant="還沒有可追蹤標籤" zh_hans="还没有可追踪标签" />
          }
        />
      </section>
    )
  }

  return (
    <section className="feed">
      <section className="shuffle">
        <ShuffleButton onClick={shuffle} />
      </section>

      {loading && <Spinner />}

      {!loading && (
        <List>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <TagDigest.Rich
                tag={node}
                spacing={['base', 'base']}
                bgColor="none"
                bgActiveColor="grey-lighter"
                hasDesc
                hasFollow
              />
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Feed
