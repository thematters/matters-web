import classNames from 'classnames'
import _chunk from 'lodash/chunk'
import _get from 'lodash/get'

import { analytics } from '~/common/utils'
import {
  List,
  PageHeader,
  Slides,
  TagDigest,
  Translate,
  usePublicQuery,
} from '~/components'

import {
  AllTagsRecommendedSidebar,
  AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_edges,
} from './__generated__/AllTagsRecommendedSidebar'
import { ALL_TAGS_RECOMMENDED_SIDEBAR } from './gql'
import styles from './styles.css'

interface TagsSidebarProps {
  inSidebar?: boolean
}

type FeedEdges =
  AllTagsRecommendedSidebar_viewer_recommendation_tags_edges_node_recommended_edges

const TagsSidebarHeader = () => (
  <PageHeader title={<Translate id="hottest" />} is="h2" hasNoBorder />
)

const TagsSidebar: React.FC<TagsSidebarProps> = ({ inSidebar }) => {
  const { data } = usePublicQuery<AllTagsRecommendedSidebar>(
    ALL_TAGS_RECOMMENDED_SIDEBAR
  )

  const tag =
    data?.viewer?.recommendation.tags.edges &&
    data?.viewer?.recommendation.tags.edges[0]
  const edges = _get(tag, 'node.recommended.edges', []) as FeedEdges[]

  const onClick = (i: number, id: string) => () =>
    analytics.trackEvent('click_feed', {
      type: 'all_tags_sidebar',
      contentType: 'tag',
      location: i,
      id,
    })

  if (!edges || edges.length <= 0) {
    return null
  }

  const tagsSidebarClasses = classNames({
    tagsSidebar: true,
    inSidebar,
  })

  if (!inSidebar) {
    return (
      <section className={tagsSidebarClasses}>
        <Slides header={<TagsSidebarHeader />}>
          {_chunk(edges, 5).map((chunks, edgeIndex) => (
            <Slides.Item size="md" key={edgeIndex}>
              <section>
                {chunks.map(({ node, cursor }, nodeIndex) => (
                  <TagDigest.Sidebar
                    key={cursor}
                    tag={node}
                    onClick={() =>
                      onClick((edgeIndex + 1) * (nodeIndex + 1) - 1, node.id)
                    }
                  />
                ))}
              </section>
            </Slides.Item>
          ))}
        </Slides>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className={tagsSidebarClasses}>
      <TagsSidebarHeader />

      <List hasBorder={false}>
        {edges?.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <TagDigest.Sidebar tag={node} onClick={() => onClick(i, node.id)} />
          </List.Item>
        ))}
      </List>

      <style jsx>{styles}</style>
    </section>
  )
}

export default TagsSidebar
