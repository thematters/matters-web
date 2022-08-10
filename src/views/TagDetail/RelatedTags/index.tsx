import classNames from 'classnames'
import _chunk from 'lodash/chunk'
import _get from 'lodash/get'

import {
  List,
  PageHeader,
  ShuffleButton,
  Slides,
  TagDigest,
  Translate,
  usePublicQuery,
  ViewAllButton,
  ViewMoreCard,
} from '~/components'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { RELATED_TAGS } from './gql'
import styles from './styles.css'

import { TagDetailRecommended } from './__generated__/TagDetailRecommended'

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
}) => (
  <PageHeader
    title={
      <Translate zh_hant="相關標籤" zh_hans="相关标签" en="Related Tags" />
    }
    is="h2"
    hasNoBorder
  >
    <section className="right">
      {hasShuffle && <ShuffleButton onClick={onShuffle} />}
    </section>
    {hasViewAll && (
      <section className="right">
        <ViewAllButton
          href={PATHS.TAGS}
          bgColor={undefined}
          bgActiveColor="grey-lighter"
        />
      </section>
    )}
  </PageHeader>
)

const RelatedTags: React.FC<RelatedTagsProps> = ({ tagId, inSidebar }) => {
  const { data } = usePublicQuery<TagDetailRecommended>(RELATED_TAGS, {
    variables: { id: tagId },
  })

  const { edges } =
    (data?.node?.__typename === 'Tag' && data.node.recommended) || {}

  const trackRelatedTags = (i: number, id: string) =>
    analytics.trackEvent('click_feed', {
      type: 'related_tags',
      contentType: 'tag',
      location: i,
      id,
    })

  if (!edges || edges.length <= 0) {
    return null
  }

  const relatedTagsClasses = classNames({
    relatedTags: true,
    inSidebar,
  })

  // const onShuffle = () => { console.log('RelatedTagsHeader::onShuffle') }

  if (!inSidebar) {
    return (
      <section className={relatedTagsClasses}>
        <Slides header={<RelatedTagsHeader />}>
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

        <section className="backToAll">
          <ViewMoreCard
            spacing={['tight', 'tight']}
            href={PATHS.TAGS}
            iconProps={{ size: 'sm' }}
            textIconProps={{ size: 'sm', weight: 'md', spacing: 'xxtight' }}
            textAlign="center"
          >
            <Translate id="backToAll" />
          </ViewMoreCard>
        </section>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className={relatedTagsClasses}>
      <RelatedTagsHeader hasViewAll />

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

      <style jsx>{styles}</style>
    </section>
  )
}

export default RelatedTags
