import { useQuery } from '@apollo/client'
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
  SpinnerBlock,
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
          id="HFVDeB"
          description="src/views/TagDetail/RelatedTags/index.tsx"
        />
      }
      is="h2"
      hasBorder={false}
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

  const { data, loading } = usePublicQuery<TagDetailRecommendedQuery>(
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

  if (!loading && (!edges || edges.length === 0)) {
    return null
  }

  const shuffle = () => {
    const random = _random(0, 49)

    lastFetchRandom && client.cache.modify({
      id: client.cache.identify(lastFetchRandom.lastFetchRandom),
      fields: { feedTags: () => random }
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
                    key={node.id}
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
            spacing={[12, 12]}
            href={PATHS.TAGS}
            iconProps={{ size: 14 }}
            textIconProps={{ size: 14, weight: 'medium', spacing: 4 }}
            textAlign="center"
          >
            <FormattedMessage defaultMessage="Back to All" id="o2Na0B" />
          </ViewMoreCard>
        </section>
      </section>
    )
  }

  return (
    <section className={relatedTagsClasses}>
      <RelatedTagsHeader hasViewAll hasShuffle onShuffle={shuffle} />

      {loading ? (
        <SpinnerBlock />
      ) : (
        <List hasBorder={false}>
          {edges && edges.map(({ node }, i) => (
            <List.Item key={node.id}>
              <TagDigest.Sidebar
                tag={node}
                onClick={() => trackRelatedTags(i, node.id)}
              />
            </List.Item>
          ))}
        </List>
      )}
    </section>
  )
}

export default RelatedTags
