import _chunk from 'lodash/chunk'

import {
  List,
  PageHeader,
  TagDigest,
  Translate,
  usePublicQuery,
  ViewAllButton,
} from '~/components'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { RELATED_TAGS } from './gql'
import styles from './styles.css'

import { TagDetailRecommended } from './__generated__/TagDetailRecommended'

interface RelatedTagsProps {
  tagId: string
}

const RelatedTags = ({ tagId }: RelatedTagsProps) => {
  const { data } = usePublicQuery<TagDetailRecommended>(RELATED_TAGS, {
    variables: { id: tagId },
  })

  const { edges } =
    (data?.node?.__typename === 'Tag' && data.node.recommended) || {}

  const onClick = (i: number, id: string) => () =>
    analytics.trackEvent('click_feed', {
      type: 'related_tags',
      contentType: 'tag',
      location: i,
      id,
    })

  return (
    <section className="tags">
      <PageHeader
        title={
          <Translate zh_hant="相關標籤" zh_hans="相关标签" en="Related Tags" />
        }
        is="h2"
        hasNoBorder
      >
        <section className="right">
          <ViewAllButton
            href={PATHS.TAGS}
            bgColor={undefined}
            bgActiveColor="grey-lighter"
          />
        </section>
      </PageHeader>

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

export default RelatedTags
