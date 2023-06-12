import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import _chunk from 'lodash/chunk'
import _get from 'lodash/get'
import _random from 'lodash/random'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  List,
  PageHeader,
  ShuffleButton,
  Slides,
  TagDigest,
  usePublicQuery,
  ViewAllButton,
  ViewMoreCard,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { LastFetchRandomQuery, TagDetailRecommendedQuery } from '~/gql/graphql'

import { RELATED_TAGS } from './gql'
import styles from './styles.module.css'

interface RelatedTagsProps {
  tagId: string
  inSidebar?: boolean
}

const RelatedTagsHeader = ({
  hasViewAll,
  hasShuffle,
  onShuffle,
}: {
  hasViewAll?: boolean
  hasShuffle?: boolean
  onShuffle?: () => void
}) => {
  return (
    <PageHeader
      title={
        <FormattedMessage
          defaultMessage="Related Tags"
          description="src/views/TagDetail/RelatedTags/index.tsx"
        />
      }
      is="h2"
      hasNoBorder
    >
      <section className={styles.right}>
        {hasShuffle && <ShuffleButton onClick={onShuffle} />}
        {hasViewAll && <ViewAllButton href={PATHS.TAGS} />}
      </section>
    </PageHeader>
  )
}

const RelatedTags: React.FC<RelatedTagsProps> = ({ tagId, inSidebar }) => {
  const { data: lastFetchRandom, client } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )

  const lastRandom = lastFetchRandom?.lastFetchRandom.feedTags

  const { data, refetch } = usePublicQuery<TagDetailRecommendedQuery>(
    RELATED_TAGS,
    {
      variables: { id: tagId, random: lastRandom || 0 },
    }
  )

  const { edges } =
    (data?.node?.__typename === 'Tag' && data.node.recommended) || {}

  const trackRelatedTags = (i: number, id: string) => () =>
    analytics.trackEvent('click_feed', {
      type: 'related_tags',
      contentType: 'tag',
      location: i,
      id,
    })

  if (!edges || edges.length <= 0) {
    return null
  }

  const shuffle = () => {
    const random = _random(0, 49)
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { feedAuthors: random },
    })
  }

  const relatedTagsClasses = classNames({
    [styles.relatedTags]: true,
    [styles.inSidebar]: inSidebar,
  })

  if (!inSidebar) {
    return (
      <section className={relatedTagsClasses}>
        <Slides header={<RelatedTagsHeader hasShuffle onShuffle={shuffle} />}>
          {_chunk(edges, 5).map((chunks, edgeIndex) => (
            <Slides.Item size="md" key={edgeIndex}>
              <section>
                {chunks.map(({ node, cursor }, nodeIndex) => (
                  <TagDigest.Sidebar
                    key={cursor}
                    tag={node}
                    onClick={() =>
                      trackRelatedTags(
                        (edgeIndex + 1) * (nodeIndex + 1) - 1,
                        node.id
                      )
                    }
                  />
                ))}
              </section>
            </Slides.Item>
          ))}
        </Slides>

        <section className={styles.backToAll}>
          <ViewMoreCard
            spacing={['tight', 'tight']}
            href={PATHS.TAGS}
            iconProps={{ size: 'sm' }}
            textIconProps={{ size: 'sm', weight: 'md', spacing: 'xxtight' }}
            textAlign="center"
          >
            <FormattedMessage defaultMessage="Back to All" description="" />
          </ViewMoreCard>
        </section>
      </section>
    )
  }

  return (
    <section className={relatedTagsClasses}>
      <RelatedTagsHeader hasViewAll hasShuffle onShuffle={shuffle} />
      <List hasBorder={false}>
        {edges?.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <TagDigest.Sidebar
              tag={node}
              onClick={() => trackRelatedTags(i, node.id)}
            />
          </List.Item>
        ))}
      </List>
    </section>
  )
}

export default RelatedTags
