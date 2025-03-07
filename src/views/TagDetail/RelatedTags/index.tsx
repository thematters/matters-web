import classNames from 'classnames'
import _chunk from 'lodash/chunk'
import _get from 'lodash/get'
import _random from 'lodash/random'
import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import { ArticleTag, usePublicQuery } from '~/components'
import { TagDetailRecommendedQuery } from '~/gql/graphql'

import { RELATED_TAGS } from './gql'
import styles from './styles.module.css'

interface RelatedTagsProps {
  tagId: string
  inSidebar?: boolean
}

const RelatedTagsHeader = () => {
  return (
    <section className={styles.header}>
      <FormattedMessage
        defaultMessage="Related Tags"
        id="HFVDeB"
        description="src/views/TagDetail/RelatedTags/index.tsx"
      />
    </section>
  )
}

const RelatedTags: React.FC<RelatedTagsProps> = ({ tagId, inSidebar }) => {
  const { data, loading } = usePublicQuery<TagDetailRecommendedQuery>(
    RELATED_TAGS,
    { variables: { id: tagId } }
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

  const relatedTagsClasses = classNames({
    [styles.relatedTags]: true,
    [styles.inSidebar]: inSidebar,
  })

  return (
    <section className={relatedTagsClasses}>
      <RelatedTagsHeader />
      <section className={styles.tags}>
        {edges &&
          edges?.map(({ node, cursor }, i) => (
            <ArticleTag
              key={node.id}
              tag={node}
              onClick={() => trackRelatedTags(i, node.id)}
            />
          ))}
      </section>
    </section>
  )
}

export default RelatedTags
