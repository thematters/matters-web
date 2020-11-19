import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  Card,
  EmptyWarning,
  List,
  ShuffleButton,
  Spinner,
  Tag,
  Translate,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { toPath } from '~/common/utils'

import { RECOMMEND_TAGS } from './gql'
import styles from './styles.css'

import { RecommendTags } from './__generated__/RecommendTags'

export type FeedType = 'trendy' | 'selected'

interface Props {
  type: FeedType
}

const Feed = ({ type }: Props) => {
  const viewer = useContext(ViewerContext)

  const { data, loading, error, refetch } = usePublicQuery<RecommendTags>(
    RECOMMEND_TAGS,
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

  const edges = data?.viewer?.recommendation.tags.edges

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
              <Card
                {...toPath({
                  page: 'tagDetail',
                  id: node.id,
                })}
                spacing={['base', 'base']}
                bgColor="none"
                bgActiveColor="grey-lighter"
                borderRadius="xtight"
              >
                <Tag tag={node} type="list" />
              </Card>
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Feed
