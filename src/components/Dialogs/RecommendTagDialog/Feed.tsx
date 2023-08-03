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
import { HottestTagsQuery, SelectedTagsQuery } from '~/gql/graphql'

import { HOTTEST_TAGS, SELECTED_TAGS } from './gql'
import styles from './styles.module.css'

export type FeedType = 'hottest' | 'selected'

export type FeedQuery = HottestTagsQuery | SelectedTagsQuery

export type FeedEdges =
  | NonNullable<
      NonNullable<
        HottestTagsQuery['viewer']
      >['recommendation']['hottestTags']['edges']
    >[0]
  | NonNullable<
      NonNullable<
        SelectedTagsQuery['viewer']
      >['recommendation']['selectedTags']['edges']
    >[0]

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
      variables: { random: 0 },
    },
    { publicQuery: !viewer.isAuthed }
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
      <section className={styles.feed}>
        <EmptyWarning
          description={
            <Translate
              zh_hant="還沒有可追蹤標籤"
              zh_hans="还没有可追踪标签"
              en="No tags yet."
            />
          }
        />
      </section>
    )
  }

  return (
    <section className={styles.feed}>
      <section className={styles.shuffle}>
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
                bgActiveColor="greyLighter"
                hasDesc
                hasFollow
              />
            </List.Item>
          ))}
        </List>
      )}
    </section>
  )
}

export default Feed
